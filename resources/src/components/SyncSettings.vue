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
                v-for="option in sources"
                v-bind:key="option.value"
                v-bind:value="option.value"
              >{{ option.label }}</option>
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
    <!-- <div class="col">
      <div id="source-field" class="field">
        <div class="heading">
          <label>Configuration</label>
        </div>
      </div>
        <ul>
            <li v-for="env in environments" v-bind:key="env.name" v-show="selectedSource == env.name">
                <environment-config :env="env" :cp-trigger="cpTrigger"></environment-config>
            </li>
        </ul>
    </div>-->
  </div>
</template>
<script>
import { Component, Vue } from "vue-property-decorator";

@Component({
  props: {
    sourcesJson: String,
    timestamp: String,
    storagePath: String,
    environmentsJson: String
  }
})
export default class SyncSettings extends Vue {
  data() {
    return {
      sources: JSON.parse(this.$props.sourcesJson),
      selectedSource: JSON.parse(this.$props.sourcesJson)[0].value,
      environments: JSON.parse(this.$props.environmentsJson)
    };
  }
  created() {
    if (window.Craft === undefined) {
      return;
    }
    this.cpUrl = window.Craft.getCpUrl();
  }

  get logFileName() {
    return `syncdb_${this.selectedSource}_${this.$props.timestamp}.log`;
  }

  sourceChanged(event) {
    const target = event.target;
    this.selectedSource = target.value;
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
