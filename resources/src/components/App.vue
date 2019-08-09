<template>
    <div>
        <CpSettings v-if="page === 'settings'"/>
        <SyncPreview v-if="page === 'preview'"/>
        <SyncOutput v-if="page === 'sync'"/>
    </div>
</template>

<script>
import { Component, Vue } from 'vue-property-decorator';
import CpSettings from './CpSettings.vue';
import SyncPreview from './SyncPreview.vue';
import SyncOutput from './SyncOutput.vue';

@Component({
    name: 'app',
    components: {
        CpSettings,
        SyncPreview,
        SyncOutput,
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