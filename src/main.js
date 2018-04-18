import Vue from 'vue';
import App from './App';
import router from './router';
import store from "./vuex/index.js"; // vuex
import i18n from './config/index.js'; // 18n

// 全局配置
import config_g from "./tools/config.js";
Vue.use(config_g);

Vue.config.productionTip = false;

new Vue({
    el: '#app',
    i18n,
    router,
    store,
    template: '<App/>',
    components: { App }
})