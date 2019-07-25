import SyncOutput from './components/SyncOutput';
import SyncSettings from './components/SyncSettings';

const VueSimpleMapPlugin = {
    install(Vue) {
        Vue.component('sync-output', SyncOutput);
        Vue.component('sync-settings', SyncSettings);
    }
};

if (typeof window !== 'undefined' && window.Vue) {
    window.Vue.use(VueSimpleMapPlugin);
}
