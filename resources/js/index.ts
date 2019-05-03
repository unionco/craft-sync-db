class Form {
    public longPollTimeoutInMs: number = 1000;
    public node: HTMLFormElement;
    public submitButton: HTMLButtonElement;
    public poll: Poll;

    constructor(node: HTMLFormElement) {
        this.node = node;
        this.submitButton = node.querySelector('button[type="submit"]');
        this.startSync = this.startSync.bind(this);
        this.node.addEventListener('submit', this.startSync);
    }

    startSync(e: Event) {
        e.preventDefault();
        this.submitButton.classList.add('disabled');
        this.submitButton.disabled = true;
        
        this.poll = new Poll(this.node);
        console.log('poll started');
    }
}

interface IPollResponse {
    errors: string[];
    success: boolean;
    complete: boolean;
    logOutput: string;
}

class Poll {
    public timeoutInMs: number;
    public continue: boolean = true;
    public formData: FormData;

    constructor(form: HTMLFormElement) {
        this.formData = new FormData(form);
        this.timeoutInMs = parseInt(<string> this.formData.get('timeoutInMs'));

        this.makeRequest = this.makeRequest.bind(this);
        this.makeRequest();
    }

    makeRequest() {
        console.log(this.formData.get('CRAFT_CSRF_TOKEN'));
        fetch('/admin/sync-db/status', {
            method: 'POST',
            credentials: 'same-origin',
            body: this.formData
        })
            .then((resp: Response) => resp.json())
            .then((json: IPollResponse) => {
                if (json.success && !json.complete) {
                    setTimeout(this.makeRequest, this.timeoutInMs);
                }
            });
    }
}

const form: HTMLFormElement = document.querySelector('form[data-sync-db]');
if (form) {
    new Form(form);
}
