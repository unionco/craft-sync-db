import Vue from 'vue';

interface IPollResponse {
    output: string;
    result: number;
}

const vm = new Vue({
    data: {
        statusText: 'Initializing',
        showSpinner: false,
        logOutput: '',
        cpTrigger: 'admin',
        formData: undefined,
        secondsBeforeRedirect: 10,
        redirectUrl: ''
    },
    el: '#vue-sync-root',
    created: function () {
        const root: HTMLDivElement = document.querySelector('#vue-sync-root');
        if (root) {
            this.cpTrigger = root.dataset.cpTrigger as string;
            this.redirectUrl = root.dataset.redirectUrl as string; 
        }
        const form: HTMLFormElement = document.querySelector('#poll-form');
        if (form) {
            this.formData = new FormData(form);
        }
    },
    mounted: function () {
        this.makeRequest(true);
    },
    methods: {
        makeRequest: function (initial: boolean = true) {
            if (initial) {
                this.showSpinner = true;
                this.statusText = 'Running Sync';
                
                fetch(`/${this.cpTrigger}/sync-db/sync/start`, {
                    method: 'POST',
                    credentials: 'same-origin',
                    body: this.formData
                })
                .then((resp: Response) => resp.json())
                .then((json: IPollResponse) => {
                    this.showSpinner = false;
                    if (json.output) {
                        // const output = Poll.formatOutput(json.output);
                        this.logOutput = json.output;
                    }
                });
            }
    
            fetch(`/${this.cpTrigger}/sync-db/sync/status`, {
                method: 'POST',
                credentials: 'same-origin',
                body: this.formData
            })
                .then((resp: Response) => resp.json())
                .then((json: IPollResponse) => {
                    if (initial || json.result == 2) {
                        setTimeout(() => this.makeRequest(false), 500);
                    }
                    if (json.output) {
                        const output = json.output;
                        if (output.length > this.logOutput.length) {
                            this.logOutput = output;
                        }
                    }
                })
                .catch(err => {
                    this.logOutput += '\n\nSync Complete - Page will reload and you will need to sign in again';
                    this.redirect();
                });
        },
        redirect: function () {
            if (this.secondsBeforeRedirect < 1) {
                window.location.href = this.redirectUrl;
            }
            this.statusText = `Redirecting in ${this.secondsBeforeRedirect} seconds`;
            setTimeout(() => {
                this.secondsBeforeRedirect--;
                this.redirect();
            }, 1000);
        }
    }
});
