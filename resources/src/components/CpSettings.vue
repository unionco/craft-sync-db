<template>
  <div>
    <Autocomplete
      :options="dbTables"
      label="Skip Tables"
      instructions="Tables to skip during sync"
      :selected="settings.skipTables"
      selected-label="Selected"
      @option-selected="addSkipTable"
      @option-removed="removeSkipTable"
      ref="skipTables"
    ></Autocomplete>
    <Environments
      :environments="settings.environments"
      ref="environments"
    ></Environments>
    <button class="button primary" @click="save">Save</button>
  </div>
</template>

<script>
import { Component, Vue } from "vue-property-decorator";
import Autocomplete from "./Autocomplete.vue";
import Environments from './Environments.vue';

@Component({
  props: {
    settingsJson: String,
    dbTablesJson: String
  },
  components: {
    Autocomplete,
    Environments
  }
})
export default class CpSettings extends Vue {
  settings = {
      skipTables: [],
      environments: {}
  };
  dbTables = [];
  mounted() {
    this.settings = JSON.parse(this.$props.settingsJson);
    this.dbTables = JSON.parse(this.$props.dbTablesJson);
  }

  addSkipTable(event) {
      this.settings.skipTables = [...this.settings.skipTables, event.target.innerText];
  }

  removeSkipTable(event) {
      this.settings.skipTables = this.settings.skipTables
      .filter((table) => table != event.target.innerText);
  }

  save(event) {
      event.preventDefault();
      const environmentSettings = this.$refs.environments.getSettings();
      const settings = {
          skipTables: this.settings.skipTables,
          environments: environmentSettings,
      };
      console.log(settings);
  }
}
</script>

<style>
</style>
