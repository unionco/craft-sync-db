<template>
  <div class="Autocomplete">
    <div class="field">
      <div class="heading">
        <label>{{ $props.label }}</label>
        <div class="instructions">
          <p>{{ $props.instructions }}</p>
        </div>
      </div>
      <div class="row">
        <div class="column search">
          <div class="input ltr">
            <div class="autosuggest-container">
              <div class="flex-grow texticon search icon clearable">
                <input
                  type="text"
                  class="text"
                  v-model="search"
                  autocomplete="on"
                  @input="onChange"
                  @blur="onBlur"
                />
              </div>
              <div v-show="isOpen" class="autosuggest__results-container">
                <div class="autosuggest__results">
                  <ul class="autosuggest-results" role="listbox">
                    <li
                      v-for="(result, i) in results"
                      :key="i"
                      class="autosuggest__results_item"
                      role="option"
                      @click="() => setSelected(result)"
                    >{{ result }}</li>
                    <li v-if="noResults" class="autosuggest__results_item" role="option">No results</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="column results">
          <div class="heading">
            <label class="selected-label">{{ $props.selectedLabel }}</label>
            <SelectedItems :items="selected" @item-removed="removeSelected" />
          </div>
        </div>
      </div>
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
    selectedLabel: String
  },
  components: {
    SelectedItems
  }
})
export default class Autocomplete extends Vue {
  search = "";
  availableOptions = [];
  results = [];
  noResults = false;
  isOpen = false;

  onChange() {
    this.isOpen = true;
    this.updateAvailableOptions();
    this.updateResults();
  }

  onBlur(e) {
    if (e.explicitOriginalTarget.getAttribute("role") === "option") {
      console.log("return");
      return;
    }
    this.isOpen = false;
  }

  @Emit("item-selected")
  setSelected(selectedItem) {
    console.log("item selected");
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
    this.noResults = this.results.length < 1;
  }
}
</script>

<style lang="scss">
.Autocomplete {
  .row {
    display: flex;
    flex-direction: row;
  }

  .column {
    flex: 1 1 50%;
  }

  .selected-label {
    font-weight: bold;
    color: #b9bfc6;
  }
}
// .autocomplete {
//   position: relative;
//   width: 130px;
// }

// .autocomplete-results {
//   padding: 0;
//   margin: 0;
//   border: 1px solid #eeeeee;
//   height: 120px;
//   overflow: auto;
// }

// .autocomplete-result {
//   list-style: none;
//   text-align: left;
//   padding: 4px 2px;
//   cursor: pointer;
// }

// .autocomplete-result:hover {
//   background-color: #4aae9b;
//   color: white;
// }
</style>
