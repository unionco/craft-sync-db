<template>
<div class="field">
    <div v-if="$props.label || $props.instructions" class="heading">
        <label v-if="$props.label" v-html="$props.label"/>
        <div class="instructions" v-if="$props.instructions">
            <p>{{ $props.instructions }}</p>
        </div>
    </div>
    <div class="input ltr">
        <input type="text" class="text fullwidth" v-model="input">
    </div>
</div>
</template>

<script>
import { Component, Vue, Watch, Emit } from 'vue-property-decorator';

@Component({
    props: {
        label: String,
        value: [String, Number,],
        instructions: String
    }
})
export default class CraftTextField extends Vue {
    data() {
        return {
            input: this.$props.value,
        };
    }

    @Emit('input')
    @Watch('input')
    onInputChanged(val, oldVal) {
        return val;
    }
}
</script>
<style>
</style>