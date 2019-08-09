<template>
    <div>
        {{ page }}
        <CpSettings v-if="page === 'settings'"/>
    </div>
</template>

<script>
import { Component, Vue } from 'vue-property-decorator';
import CpSettings from './CpSettings.vue';

@Component({
    name: 'app',
    components: {
        CpSettings,
    }
})
export default class App extends Vue {
    data() {
        return {
            page: document.querySelector('[data-vue').dataset.vue,
        };
    }
};
</script>