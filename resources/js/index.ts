import 'highlight.js/styles/default.css';
class Form {
    public node: HTMLFormElement;
    public submitButton: HTMLButtonElement;

    constructor(node: HTMLFormElement) {
        this.node = node;
        this.submitButton = node.querySelector('button[type="submit"]');
        this.startSync = this.startSync.bind(this);
        this.node.addEventListener('submit', this.startSync);
    }

    startSync(e: Event) {
        this.submitButton.classList.add('disabled');
        this.submitButton.disabled = true;
    }
}

interface IPollResponse {
    output: string;
    result: number;
}

class Poll {
    public timeoutInMs: number;
    public continue: boolean = true;
    public formData: FormData;
    public root: HTMLDivElement;
    public outputContainer: HTMLElement;
    public output: string;
    public statusText: HTMLDivElement;
    public spinner: HTMLDivElement;
    public redirectUrl: string;

    constructor(root: HTMLDivElement) {
        this.formData = new FormData(document.querySelector('#poll-form'));
        this.root = root;
        this.timeoutInMs = 500;
        this.spinner = document.querySelector('#spinner');
        this.statusText = document.querySelector('#status');
        this.outputContainer = document.querySelector('[data-output]');
        this.redirectUrl = this.root.dataset.redirectUrl;
        this.makeRequest = this.makeRequest.bind(this);
        this.redirect = this.redirect.bind(this);
        this.makeRequest();
    }

    makeRequest(initial: boolean = true) {
        if (initial) {
            this.spinner.classList.remove('hidden');
            this.statusText.innerText = 'Running sync...';
            fetch('/admin/sync-db/sync/start', {
                method: 'POST',
                credentials: 'same-origin',
                body: this.formData
            })
            .then((resp: Response) => resp.json())
            .then((json: IPollResponse) => {
                this.spinner.classList.add('hidden');
                if (json.output) {
                    const output = Poll.formatOutput(json.output);
                    this.output = output;
                    this.outputContainer.innerHTML = output;
                }
            });
        }

        fetch('/admin/sync-db/sync/status', {
            method: 'POST',
            credentials: 'same-origin',
            body: this.formData
        })
            .then((resp: Response) => resp.json())
            .then((json: IPollResponse) => {
                if (initial || json.result == 2) {
                    setTimeout(() => this.makeRequest(false), this.timeoutInMs);
                }
                if (json.output) {
                    const output = Poll.formatOutput(json.output);
                    if (output.length > this.output.length) {
                        this.output = output;
                    }
                    this.outputContainer.innerHTML = this.output;
                }
            })
            .catch(err => {
                this.outputContainer.innerHTML += 'Sync Complete - Page will reload and you will need to sign in again';
                this.redirect(this.redirectUrl, 5);
            });
    }

    redirect(url: string, secondsRemaining: number) {
        if (secondsRemaining < 1) {
            window.location.href = url;
        }
        this.statusText.innerText = `Redirecting in ${secondsRemaining} seconds`;
        setTimeout(() => this.redirect(url, secondsRemaining - 1), 1000);
    }

    static formatOutput(rawOutput: string): string {
        return rawOutput.trimLeft();
    }
}

const form: HTMLFormElement = document.querySelector('form[data-sync-db]');
if (form) {
    new Form(form);
}

const pollRoot: HTMLDivElement = document.querySelector('#vue-sync-root');
if (pollRoot) {
    new Poll(pollRoot);
}