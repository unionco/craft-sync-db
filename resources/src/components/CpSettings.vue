<template>
  <div @submit="save">
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
  </div>
</template>

<script>
import { Component, Vue } from "vue-property-decorator";
import Autocomplete from "./Autocomplete.vue";
import Environments from "./Environments.vue";
import { Observer } from "mobx-vue";
import { toJS } from "mobx";

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

    // Override the default Craft CP Save button
    document.querySelectorAll(".btn.submit").forEach(btn => {
      btn.addEventListener('click', e => {
          e.preventDefault();
        this.save(e);
      });
    });
  }

  save(event) {
    event.preventDefault();

    const settings = {
      skipTables: toJS(this.$store.skipTables),
      environments: toJS(this.$store.environments)
    };
    const data = {
      pluginHandle: "sync-db",
      settings
    };
    const callback = (arg1, textStatus, jqXhr) => {
      if (jqXhr.status === 200) {
        window.Craft.cp.displayNotice("Settings saved");
        setTimeout(() => window.Craft.redirectTo("/admin/settings"), 1000);
      }
    };
    window.Craft.postActionRequest("sync-db/config/save", data, callback);
  }
}
</script>

<style>
</style>
