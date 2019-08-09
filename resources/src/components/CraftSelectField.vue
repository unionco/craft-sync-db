<template>
  <div class="field">
    <div class="heading">
      <label v-html="$props.label" />
    </div>
    <div class="input ltr">
      <div class="select">
        <select v-model="input" class="fieldtoggle">
          <option v-for="item in $props.items" :key="item.value" :value="item.value">{{item.label}}</option>
          <!-- <option value="staging">Staging</option>
          <option value="development">Development</option>-->
        </select>
      </div>
    </div>
  </div>
</template>

<script>
import { Component, Vue, Emit, Watch } from "vue-property-decorator";

@Component({
  name: "craft-select-field",
  props: {
    label: String,
    value: [String, Number],
    items: Array
  }
})
export default class CraftSelectField extends Vue {
  data() {
    return {
      input: this.$props.value
    };
  }
}
</script>