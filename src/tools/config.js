
import extend from './extend/index.js';
import directive from './extend/directive.js';
import request from '@/api'; 
import * as filters from './filters/index.js'; // 全局filter
import Dragging from './extend/dragging.js';
const install = function (Vue, opts = {}) {
    if (Vue.prototype.$isServer) return; 
    // register global utility filters.
    Object.keys(filters).forEach(key => {
        Vue.filter(key, filters[key])
    });
    // 自定义指令
    directive(Vue);
    // 引入配置内置请求方法
    Vue.prototype.$http = request;
    // 工具扩展
    for (let key in extend) {
        Vue.prototype['$' + key] = extend[key];
    }
    // 拖动排序
    Vue.use(Dragging);
    Vue.options.components.ElPagination.options.props.layout.default = 'prev, pager, next, total';
    Vue.options.components.ElPagination.options.props.pageSize.default = 30;
    Vue.options.components.ElButton.options.props.size.default = 'small';
    Vue.options.components.ElSelect.options.props.size.default = 'small';
    Vue.options.components.ElInput.options.props.size.default = 'small';
    Vue.options.components.ElDatePicker.options.props.size.default = 'small';
    Vue.options.components.ElUpload.options.props.withCredentials.default = true;
    Vue.options.components.ElTable.options.props.stripe.default = true;
    Vue.options.components.ElTable.options.props.highlightCurrentRow.default = true;
    Vue.options.components.SyDialog.options.props.closeOnClickModal.default = false;
    Vue.options.components.ElTree.options.props.accordion.default = true;
    Vue.options.components.ElUpload.options.components.Upload.methods.upload = function (rawFile, file) {
        this.$refs.input.value = null;
        if (!this.beforeUpload) {
            return this.post(rawFile);
        }
        const before = this.beforeUpload(rawFile);
        let allowUpload = true,
            notAllowUpload = window.ShiYue.notAllowUpload;
        if (rawFile && rawFile.name) {
            allowUpload = (notAllowUpload.indexOf(rawFile.name.substring(rawFile.name.lastIndexOf('.') + 1).toLocaleLowerCase()) == -1);
        }
        if (before && before.then && allowUpload) {
            before.then(processedFile => {
                if (Object.prototype.toString.call(processedFile) === '[object File]') {
                    this.post(processedFile);
                } else {
                    this.post(rawFile);
                }
            }, () => {
                this.onRemove(null, rawFile);
            });
        } else if (before !== false && allowUpload) {
            this.post(rawFile);
        } else {
            if (!allowUpload) {
                this.$notify({
                    title: '警告',
                    message: '不允许上传此类文件！',
                    type: 'warning'
                });
            }
            this.onRemove(null, rawFile);
        }
    };
    // 修改通知的默认时长
    Vue.prototype.$notify_ = Vue.prototype.$notify;
    Vue.prototype.$notify = (options) => {
        if (!options) {
            options = {};
        }
        if (!options.duration) {
            options.duration = 1500;
        }
        Vue.prototype.$notify_(options);
    }
    ['success', 'warning', 'info', 'error'].forEach(type => {
        Vue.prototype.$notify[type] = (options) => {
            Vue.prototype.$notify(Object.assign(options, {
                type: type
            }));
        };
    });

};

export default {
    version: '1.0.0',
    install,
};