<template>
  <div class="field">
    <div class="heading">
      <label>Environments</label>
    </div>
    <div class="input ltr">
      <Environment
        v-for="environment in $store.environments"
        :key="environment.uid"
        :uid="environment.uid"
        
      />
      <div class="buttons last">
        <div class="btngroup">
          <div class="btn add icon" @click="addEnvironment">Add Environment</div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { toJS } from "mobx";
import { Component, Vue, Watch } from "vue-property-decorator";
import { Observer } from "mobx-vue";
import Environment from "./Environment.vue";

@Observer
@Component({
  components: {
    Environment
  }
})
export default class Environments extends Vue {
  addEnvironment(e) {
    e.preventDefault();
    this.$store.addEnvironment();
  }
}
</script>
<style>
.environment {
  padding: 20px;
  border-bottom: 1px solid black;
}
</style>
