<template>
  <div class="field lightswitch-field">
    <div class="heading">
      <label v-html="$props.label" />
    </div>
    <div class="input ltr">
      <div :class="{lightswitch: true, fieldtoggle: true, on: input}" role="checkbox">
        <div :class="{'lightswitch-container': true, off: !input}" @click="() => input = !input">
          <div class="label on"></div>
          <div class="handle"></div>
          <div class="label off"></div>
        </div>
        <input type="hidden" name="enabled" v-model="input"/>
      </div>
    </div>
  </div>
</template>

<script>
import { Component, Vue, Emit, Watch } from 'vue-property-decorator';


@Component({
    props: {
        label: String,
        value: Boolean,
    }
})
export default class CraftLightswitch extends Vue {
    data() {
        return {
            input: this.$props.value,
        };
    }

    @Emit('input')
    @Watch('input')
    onInput(val, oldVal) {
        return val;
    }
}
</script>
<style>
.lightswitch-container.off {
    margin-left: -11px;
}
</style>