import SyncOutput from './components/SyncOutput';
import SyncSettings from './components/SyncSettings';
// import EnvironmentConfig from './components/EnvironmentConfig';

const VueSimpleMapPlugin = {
    install(Vue) {
        Vue.component('sync-output', SyncOutput);
        Vue.component('sync-settings', SyncSettings);
        // Vue.component('environment-config', EnvironmentConfig);
    }
};

if (typeof window !== 'undefined' && window.Vue) {
    window.Vue.use(VueSimpleMapPlugin);
}
