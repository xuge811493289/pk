import waves from './waves/waves.js';
import download from './download-element-table.js';
import dragDrop from './dragDrop.js';

export default (Vue) => {
    Vue.directive('focus', { //输入框自动获得焦点
        inserted: (el) => {
            el.focus()
        }
    });
    Vue.directive("back", { //返回上个history页面
        bind: (el, binding, vnode) => {
            el.addEventListener('click', () => {
                window.history.go(-1);
                // window.history.back();
            })
        }
    });
    Vue.directive("waves", waves);
    Vue.directive("download", download);
    Vue.directive("dragged", dragDrop);
}