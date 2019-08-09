<template>
  <div>
    <Autocomplete
      :options="$store.dbTables"
      label="Skip Tables"
      instructions="Tables to skip during sync"
      :selected="$store.skipTables"
      selected-label="Selected"
      @item-selected="$store.addSkipTable"
      @item-removed="$store.removeSkipTable"
      ref="skipTables"
    ></Autocomplete>
    <Environments :environments="$store.environments" ref="environments" />
    <button class="btn submit" @click="save">Save</button>
  </div>
</template>

<script>
import { Component, Vue } from "vue-property-decorator";
import Autocomplete from "./Autocomplete.vue";
import Environments from "./Environments.vue";
import { Observer } from "mobx-vue";

@Observer
@Component({
  props: {},
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
    const vueRoot = document.querySelector("[data-vue]");
    const settingsJson = vueRoot.dataset.settingsJson;
    const settings = JSON.parse(settingsJson);

    const dbTablesJson = vueRoot.dataset.dbTablesJson;
    const dbTables = JSON.parse(dbTablesJson);

    this.$store.setEnvironments(settings.environments);
    this.$store.setDbTables(dbTables);
    this.$store.setSkipTables(settings.skipTables);
  }

  save(event) {
    event.preventDefault();
    const environmentSettings = this.$refs.environments.getSettings();
    const settings = {
      skipTables: this.settings.skipTables,
      environments: environmentSettings
    };
    console.log(settings);
  }
}
</script>

<style>
</style>
