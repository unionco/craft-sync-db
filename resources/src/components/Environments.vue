<template>
  <div>
    <div>Environments</div>
    <div>
      <button @click="addEnvironment">Add</button>
    </div>
    <div v-for="(environment, i) in state.environments" :key="i" class="environment">
      <button @click="e => removeEnvironment(e, i)">Remove</button>
      <CraftTextField label="Name" v-model="environment.name" />
      <CraftSelectField
        label="Environment"
        :items="environmentItems"
        v-model="environment.environment"
      />
      <CraftSelectField label="Verbosity" :items="verbosityItems" v-model="environment.verbosity" />
      <CraftTextField label="SSH Host" v-model="environment.host" />
      <CraftTextField label="SSH Port" v-model="environment.port" />
      <CraftTextField label="SSH Username" v-model="environment.username" />
      <CraftTextField label="PHP Path" v-model="environment.phpPath" />
      <CraftLightswitch label="Use MySQL" v-model="environment.mysqlDefault" />
      <CraftTextField
        v-if="environment.mysqlDefault"
        label="mysqldump Path"
        :default-value="environment.mysqlDumpPath"
      />
      <CraftTextField
        v-if="!environment.mysqlDefault"
        label="pg_dump Path"
        :default-value="environment.pgDumpPath"
      />
    </div>
  </div>
</template>
<script>
import { toJS } from "mobx";
import { Component, Vue, Watch } from "vue-property-decorator";
import { Observer } from "mobx-vue";
import EnvironmentsModel from "./EnvironmentsModel";
import CraftTextField from "./CraftTextField.vue";
import CraftLightswitch from "./CraftLightswitch.vue";
import CraftSelectField from "./CraftSelectField.vue";

@Observer
@Component({
  props: {
    environments: Object
  },
  components: {
    CraftTextField,
    CraftLightswitch,
    CraftSelectField
  }
})
export default class Environments extends Vue {
  state = new EnvironmentsModel();

  get environmentItems() {
    return [
      { label: "Production", value: "production" },
      { label: "Staging", value: "staging" },
      { label: "Development", value: "development" }
    ];
  }

  get verbosityItems() {
    return [
      { label: "Quiet", value: 16 },
      { label: "Info", value: 32 },
      { label: "Debug", value: 64 },
      { label: "Verbose", value: 128 },
      { label: "Very Verbose", value: 256 }
    ];
  }

  @Watch("environments")
  parseEnvironments(val, oldVal) {
    this.state.setEnvironments(val);
  }

  getSettings() {
    return toJS(this.state.environments);
  }

  addEnvironment(e) {
    e.preventDefault();
    this.state.addEnvironment();
  }

  removeEnvironment(e, i) {
    e.preventDefault();
    this.state.removeEnvironment(i);
  }
}
</script>
<style>
.environment {
  padding: 20px;
  border: 1px solid black;
}
</style>
