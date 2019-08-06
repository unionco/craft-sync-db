import SyncOutput from './components/SyncOutput';
import SyncSettings from './components/SyncSettings';
import CpSettings from './components/CpSettings.vue';

const VueSimpleMapPlugin = {
    install(Vue) {
        Vue.component('sync-output', SyncOutput);
        Vue.component('sync-settings', SyncSettings);
        Vue.component('cp-settings', CpSettings);
    }
};

if (typeof window !== 'undefined' && window.Vue) {
    window.Vue.use(VueSimpleMapPlugin);
}
