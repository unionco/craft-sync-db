<template>
  <div class="field">
    <div class="heading">
      <label>{{ $props.label }}</label>
      <div class="instructions">
        <p>{{ $props.instructions }}</p>
      </div>
    </div>
    <div class="heading">
      <label>{{ $props.selectedLabel }}</label>
      <SelectedItems :items="selected" @item-removed="removeSelected" />
    </div>
    <div class="input ltr">
      <div class="flex-grow texticon search icon clearable">
        <input type="text" class="text" v-model="search" autocomplete="on" @input="onChange" />
      </div>
      <ul v-show="isOpen" class="autocomplete-results">
        <li
          v-for="(result, i) in results"
          :key="i"
          class="autocomplete-result"
          @click="() => setSelected(result)"
        >{{ result }}</li>
      </ul>
    </div>
  </div>
</template>

<script>
import { Component, Vue, Emit } from "vue-property-decorator";
import includes from "lodash/includes";
import SelectedItems from "./SelectedItems.vue";

@Component({
  name: "Autocomplete",
  props: {
    options: Array,
    selected: Array,
    label: String,
    instructions: String,
    selectedLabel: String,
  },
  components: {
    SelectedItems
  }
})
export default class Autocomplete extends Vue {
  search = "";
  availableOptions = [];
  results = [];
  isOpen = false;

  onChange() {
    this.isOpen = true;
    this.updateAvailableOptions();
    this.updateResults();
  }

  @Emit("item-selected")
  setSelected(selectedItem) {
    this.availableOptions = this.availableOptions.filter(
      option => option != selectedItem
    );
    this.updateResults();
    return selectedItem;
  }

  @Emit("item-removed")
  removeSelected(removedItem) {
    this.availableOptions = [...this.availableOptions, removedItem];
    this.updateResults();
    return removedItem;
  }

  updateAvailableOptions() {
    this.availableOptions = this.$props.options.filter(
      option => !this.$props.selected.includes(option)
    );
  }

  updateResults() {
    this.results = this.availableOptions.filter(
      option => option.toLowerCase().indexOf(this.search.toLowerCase()) > -1
    );
  }
}
</script>

<style>
.autocomplete {
  position: relative;
  width: 130px;
}

.autocomplete-results {
  padding: 0;
  margin: 0;
  border: 1px solid #eeeeee;
  height: 120px;
  overflow: auto;
}

.autocomplete-result {
  list-style: none;
  text-align: left;
  padding: 4px 2px;
  cursor: pointer;
}

.autocomplete-result:hover {
  background-color: #4aae9b;
  color: white;
}
</style>
