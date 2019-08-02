<template>
  <div>
    <button class="btn" @click="toggleConfig">{{ toggleText }}</button>
    <div v-if="showConfig">
      <div class="field">
        <div class="heading">
          <label>Name</label>
        </div>
        <div class="input ltr">
          <input class="text fullwidth" disabled v-model="modifiedEnv.name" />
        </div>
      </div>

      <div class="field">
        <div class="heading">
          <label>Environment</label>
        </div>
        <div class="input ltr">
          <div class="select">
            <select v-model="modifiedEnv.environment" class="select">
              <option value="production">Production</option>
              <option value="staging">Staging</option>
              <option value="development">Development</option>
            </select>
          </div>
        </div>
      </div>

      <div class="field">
        <div class="heading">
          <label>Project Root</label>
        </div>
        <div class="input ltr">
          <input class="text fullwidth" v-model="modifiedEnv.root" />
        </div>
      </div>

      <div class="field">
        <div class="heading">
          <label>Backup Directory</label>
        </div>
        <div class="input ltr">
          <input class="text fullwidth" v-model="modifiedEnv.backupDirectory" />
        </div>
      </div>

      <div class="field">
        <div class="heading">
          <label>PHP Path</label>
        </div>
        <div class="input ltr">
          <input class="text fullwidth" v-model="modifiedEnv.phpPath" />
        </div>
      </div>

      <div class="field">
        <div class="heading">
          <label>Host</label>
        </div>
        <div class="input ltr">
          <input class="text fullwidth" v-model="modifiedEnv.host" />
        </div>
      </div>

      <div class="field">
        <div class="heading">
          <label>Username</label>
        </div>
        <div class="input ltr">
          <input class="text fullwidth" v-model="modifiedEnv.username" />
        </div>
      </div>

      <div class="field">
        <div class="heading">
          <label>Port</label>
        </div>
        <div class="input ltr">
          <input class="text fullwidth" v-model="modifiedEnv.port" />
        </div>
      </div>

      <div class="field">
        <div class="heading">
          <label>Verbosity</label>
        </div>
        <div class="input ltr">
          <div class="select">
            <!-- <input class="text fullwidth" v-model="modifiedEnv.verbosity"/> -->
            <select class="select" v-model="modifiedEnv.verbosity">
              <option value="64">Debug</option>
              <option value="32">Verbose</option>
              <option value="16">Info</option>
            </select>
          </div>
        </div>
      </div>
      <button class="btn" @click="save">Save Configuration</button>
    </div>
  </div>
</template>

<script>
import { Component, Vue } from "vue-property-decorator";

@Component({
  props: {
    env: Object,
    cpTrigger: String
  }
})
export default class EnvironmentConfig extends Vue {
  modifiedEnv = {};
toggleText = 'Edit configuration';
showConfig = false;

  mounted() {
    console.log(this.$props.env);
    this.modifiedEnv = this.$props.env;
  }

  save(e) {
    e.preventDefault();

    const csrf = document.querySelector('[name="CRAFT_CSRF_TOKEN"]').value;
    console.log(this.modifiedEnv);

    const data = new FormData();
    data.append('CRAFT_CSRF_TOKEN', csrf);
    data.append('config', JSON.stringify(this.modifiedEnv));
        
    fetch(`/${this.$props.cpTrigger}/sync-db/config/save`, {
        method: 'POST',
        body: data
    })
        .then(resp => resp.json())
        .then(resp => console.log(resp))
        .catch(err => console.error(err));
  }

  toggleConfig(e) {
      e.preventDefault();
      this.showConfig = !this.showConfig;
      if (this.showConfig) {
          this.toggleText = 'Hide configuration';
      } else {
          this.toggleText = 'Edit configuration';
      }
  }
}
</script>

<style>
</style>
