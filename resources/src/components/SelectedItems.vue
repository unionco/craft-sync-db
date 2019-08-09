<template>
  <div class="elementselect">
    <div class="elements">
      <div
        class="element small removable"
        v-for="(option, i) in $props.items"
        :key="i"
      >
        <a class="delete icon" @click="() => removeSelected(option)"></a>
        <div class="label">
          <span class="title">{{ option }}</span>
        </div>
      </div>
    </div>
  </div>
</template>
      <script>
import { Component, Vue, Emit } from "vue-property-decorator";
@Component({
  props: {
    items: Array
  }
})
export default class SelectedItems extends Vue {
    @Emit('item-removed')
    removeSelected(index) {
        console.log(index);
    }
}
</script>