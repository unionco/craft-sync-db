<template>
  <div class="matrix matrix-field">
    <div class="blocks">
      <div :class="{matrixblock: true, collapsed: $store.environmentAccordionHide[$props.uid]}">
        <div class="titlebar" v-html="environment.name"></div>
        <div class="actions">
          <a class="settings icon menubtn" @click="toggleEnvironment"></a>
          <a class="delete icon" @click="removeEnvironment"></a>
        </div>
        <div class="fields" v-if="!$store.environmentAccordionHide[$props.uid]">
          <div class="content">
            <CraftTextField label="Name" v-model="environment.name" />
            <CraftSelectField
              label="Environment"
              :items="environmentItems"
              v-model="environment.environment"
            />
            <CraftSelectField
              label="Verbosity"
              :items="verbosityItems"
              v-model="environment.verbosity"
            />
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
      </div>
    </div>
  </div>
</template>

<script>
import { Component, Vue, Emit } from "vue-property-decorator";
import CraftTextField from "./CraftTextField.vue";
import CraftLightswitch from "./CraftLightswitch.vue";
import CraftSelectField from "./CraftSelectField.vue";
import { Observer } from "mobx-vue";

@Observer
@Component({
  name: "environment",
  props: {
    uid: String
    // name: String
  },
  components: {
    CraftTextField,
    CraftLightswitch,
    CraftSelectField
  }
})
export default class Environment extends Vue {
  data() {
    return {
      environment: this.$store.environments.find(env => env.uid === this.$props.uid),
    };
  }
  
//   @Emit('toggle-environment')
  toggleEnvironment() {
      this.$store.toggleEnvironmentAccordion(this.$props.uid);
    //   this.$props.uid;
  }

//   @Emit('remove-environment')
  removeEnvironment() {
      this.$store.removeEnvironment(this.$props.uid);
    //   return this.$props.uid;
  }
//   removeEnvironment(e) {
//     e.preventDefault();
//     console.log(i);
//     this.$store.removeEnvironment(i);
//   }

//   toggleEnvironment(e, i) {
//     e.preventDefault();
//     this.$store.toggleEnvironmentAccordion(i);
//   }

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
}
</script>
<style>
.matrixblock.collapsed {
    height: 16px;
}
</style>