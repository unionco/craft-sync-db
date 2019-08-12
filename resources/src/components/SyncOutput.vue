<template>
  <div>
    <div class="field" data-status>
      <div class="heading">
        <label for="status">Status</label>
      </div>
      <div id="status" v-html="statusText"></div>
    </div>
    <div class="field">
      <div class="heading">
        <label>Output</label>
      </div>
      <div class="spinner" id="spinner" v-if="showSpinner"></div>
      <pre v-if="logOutput"><code v-html="logOutput"></code></pre>
    </div>
  </div>
</template>
<script>
import { Component, Vue } from "vue-property-decorator";

@Component
export default class SyncOutput extends Vue {
    logFile = '';
    env = '';
  statusText = "Initializing";
  showSpinner = false;
  logOutput = "";
  secondsBeforeRedirect = 4;
  cpUrl = undefined;
  redirectUrl = undefined;

  created() {
    if (window.Craft === undefined) {
      return;
    }
    this.cpUrl = window.Craft.getCpUrl();
    this.redirectUrl = `${this.cpUrl}/sync-db/preview`;
  }

mounted() {
    console.log("mounted");
    const vueRoot = document.querySelector("[data-vue]");
    this.env = vueRoot.dataset.env;
    this.logFile = vueRoot.dataset.logFile;
    this.makeRequest(true);
  }

  makeRequest(initial = true) {
    const data = {
      env: this.env,
      logFile: this.logFile
    };
    if (initial) {
      this.showSpinner = true;
      this.statusText = "Running Sync";

      window.Craft.postActionRequest(
        `${this.cpUrl}/sync-db/sync/start`,
        data,
        ((response, textStatus) => {
          this.showSpinner = false;
          if (response.output) {
            this.setLogOutput(response.output);
            window.Craft.cp.displayNotice("Success! Page will reload");
            this.redirect();
          }
        }).bind(this)
      );
    }
  }

  setLogOutput(text) {
      let formatted = '';
      text.split(/\n/).forEach((line) => {
          if (line.indexOf('NOTICE') !== -1) {
              formatted += '<span class="log-notice">' + line + '</span><br/>';
          } else if (line.indexOf('INFO') !== -1) {
              formatted += '<span class="log-info">' + line + '</span><br/>';
          } else if (line.indexOf('DEBUG') !== -1) {
              formatted += '<span class="log-debug">' + line + '</span><br/>';
          } else if (line.indexOf('ERROR') !== -1)  {
              formatted += '<span class="log-error">' + line + '</span><br/>';
          }
        //   formatted += 
      });
    // debugger;

      this.logOutput = formatted;
  }

  redirect() {
    if (this.secondsBeforeRedirect < 1) {
      window.location.href = this.redirectUrl;
    }
    this.statusText = `Redirecting in ${this.secondsBeforeRedirect} seconds`;
    setTimeout(() => {
      this.secondsBeforeRedirect -= 1;
      this.redirect();
    }, 1000);
  }
}
</script>

<style>
pre {
    background-color: #27303a;
    padding: 20px;
    white-space: pre-wrap;
    word-wrap: break-word;
}
code {
    background-color: #27303a;
}
.log-notice {
    color: #CCD1D6;
}
.log-info {
    color: #CCD1D6;
}
.log-debug {
    color: #F1C40E;
}
.log-error {
    color: #D0021B;
}
</style>
