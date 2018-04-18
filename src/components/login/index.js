import SyLogin from './src/index';

/* istanbul ignore next */
SyLogin.install = function(Vue) {
    Vue.component(SyLogin.name, SyLogin);
};

export default SyLogin;