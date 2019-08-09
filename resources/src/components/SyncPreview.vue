<template>
  <div class="container">
    <div class="col">
      <input name="timeoutInMs" type="hidden" value="1000" />
      <div id="source-field" class="field">
        <div class="heading">
          <label id="source-label" for="source">Source</label>
        </div>
        <div class="input ltr">
          <div class="select">
            <select id="source" name="env" @change="sourceChanged" v-model="selectedSource">
              <option
                v-for="environment in $store.environments"
                v-bind:key="environment.name"
                v-bind:value="environment.uid"
              >{{ environment.name }} [{{ environment.environment }}]</option>
            </select>
          </div>
        </div>
      </div>

      <div id="logFile-field" class="field">
        <div class="heading">
          <label id="logFile-label" for="logFile">Log File</label>
          <div class="instructions">
            <p>Log files are stored in {{ storagePath }}</p>
          </div>
        </div>
        <div class="input ltr">
          <input
            type="text"
            id="logFile"
            name="logFile"
            v-model="logFileName"
            autocomplete="off"
            class="text fullwidth"
          />
        </div>
      </div>
      <button class="btn submit" type="submit">Start</button>
    </div>
  </div>
</template>
<script>
import { Component, Vue } from "vue-property-decorator";
import { Observer } from "mobx-vue";

@Observer
@Component({})
export default class SyncPreview extends Vue {
  timestamp = "";
  cpUrl = "";
  selectedSource = "";
  storagePath = "";
  created() {
    if (window.Craft === undefined) {
      return;
    }
    this.cpUrl = window.Craft.getCpUrl();
  }

  get logFileName() {
    let environment = this.$store.environments.find(
      env => env.uid === this.selectedSource
    );
    if (!environment) {
      environment = "";
    }
    return `syncdb_${environment.name}_${this.timestamp}.log`;
  }

  sourceChanged(event) {
    const target = event.target;
    this.selectedSource = target.value;
  }

  mounted() {
    const vueRoot = document.querySelector("[data-vue]");
    const settingsJson = vueRoot.dataset.settingsJson;
    const settings = JSON.parse(settingsJson);
    this.timestamp = vueRoot.dataset.timestamp;
    this.$store.setEnvironments(settings.environments);
    if (settings.environments.length) {
      this.selectedSource = settings.environments[0].uid;
    }
    this.storagePath = vueRoot.dataset.storagePath;
  }
}
</script>

<style lang="css" scoped>
.container {
  display: flex;
  flex-direction: row;
}
.col {
  flex: 1 1 50%;
  margin: 10px;
}
.settings-name {
  font-weight: bold;
  padding-right: 10px;
}
.settings-value {
  font-family: monospace;
}
</style>
