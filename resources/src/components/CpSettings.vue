<template>
  <div>
    Settings
    <Autocomplete
      :options="dbTables"
      label="Skip Tables"
      instructions="Tables to skip during sync"
      :selected="settings.skipTables"
      selected-label="Selected"
      @option-selected="addSkipTable"
      @option-removed="removeSkipTable"
    ></Autocomplete>
  </div>
</template>

<script>
import { Component, Vue } from "vue-property-decorator";
import Autocomplete from "./Autocomplete.vue";

@Component({
  props: {
    settingsJson: String,
    dbTablesJson: String
  },
  components: {
    Autocomplete
  }
})
export default class CpSettings extends Vue {
  settings = {};
  dbTables = [];
  mounted() {
    console.log("mounted");
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
}
</script>

<style>
</style>
