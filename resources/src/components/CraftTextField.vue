<template>
<div class="field">
    <div v-if="$props.label" class="heading">
        <label v-html="$props.label"/>
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