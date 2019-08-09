// import SyncOutput from './components/SyncOutput';
// import SyncSettings from './components/SyncSettings';
// import CpSettings from './components/CpSettings.vue';
import App from './components/App';
import CpState from './store/CpState';

// const VueSimpleMapPlugin = {
//     install(Vue) {
//         Vue.component('sync-output', SyncOutput);
//         Vue.component('sync-settings', SyncSettings);
//         Vue.component('cp-settings', CpSettings);
//     }
// };

if (typeof window !== 'undefined' && window.Vue) {
    window.Vue.prototype.$store = new CpState();
    // window.Vue.use(VueSimpleMapPlugin);
    const vueRoot = document.querySelector('[data-app]');
    // debugger;
    console.log('Vue is defined');
    if (vueRoot) {
        console.log('vueRoot exists');
        new window.Vue({
            render: h => h(App),
        }).$mount(vueRoot);
    }
}

