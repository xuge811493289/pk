/**
 * http配置
 */
// 引入axios
import axios from 'axios';
import router from '../router';
import DialogLogin from '../commonPage/login/src/DialogLogin.vue';
import { MessageBox, Notification } from 'element-ui';
import Vue from 'vue';
import store from '@/vuex/store.js'

// 配置地址
axios.defaults.baseURL = window.ShiYue.base;
// 超时时间 20min
axios.defaults.timeout = 20 * 60 * 1000;
// http请求拦截器
axios.interceptors.request.use(config => {
    /*var start = new Date().getTime();
    while (true) {
        if (new Date().getTime() - start > 1) {
            console.log(111111111);
            break;
        }
    };*/
    return config
}, error => {
    // console.log('--------------', error);
    Message.error({
        message: '加载超时'
    })
    return Promise.reject(error)
});

// dialog登录窗口
let showLoginDialog = (() => {
    if (router.currentRoute && ((router.currentRoute.meta && router.currentRoute.meta.noLoginRequired) || (router.currentRoute.fullPath.indexOf('/login') != -1 && router.currentRoute.name == 'login'))) {
        return false;
    }
    let h = new Vue().$createElement;
    $('.v-modal').show();
    MessageBox({
        message: h(DialogLogin),
        beforeClose: (action, instance, done) => {
            done();
            MessageBox.close();
            if (instance.$el) {
                $(instance.$el).prev('.v-modal').hide().end().next('.v-modal').hide();
            }
        },
        title: '  ',
        customClass: 'sy-login-box',
        showConfirmButton: false,
        showCancelButton: false,
        closeOnPressEscape: false,
        closeOnClickModal: false
    }).then(action => {
        console.log(action);
    });
});

// http响应拦截器
axios.interceptors.response.use(data => {

    if (!data || !data.data) {
        console.log('error：', data);
        /*Notification.info({
            title: '提示',
            message: '此条路不通哦，请联系攻城狮。~~~///(^v^)\\\~~~'
        });*/
        return data.data;
    }

    // URL包含/nologin/的不需要登录
    if (data.status == 200 && 　data.config.url && data.config.url.indexOf('/nologin/') != -1) {
        return data.data;
    }

    let _data = data.data,
        _user = sessionStorage.getItem('user');
    // 成功
    if (_data.status === 200) {
        return data.data;
    }
    // 登录
    if (_data.status === 400) {
        console.log('400：', data.config.url, data.data.message);
        sessionStorage.removeItem('user');
        router.push('/login');
        return data.data;
    }

    // 程序错误
    if (_data.status === 500) {
        console.error('500：', data.config.url, data.data.message);
        return data.data;
    }

    // 登录
    if (_data.status === 404 || _data.status === 405) {
        console.log('404：', data.config.url, data.data.message);
        Notification.info({
            title: '提示',
            message: '此条路不通哦，请联系攻城狮。~~~///(^v^)\\\~~~'
        });
        return data.data;
    }

    // 无权限
    if (_data.status === 403) {
        console.error('403：', data.config.url, data.data.message);
        Notification.error({
            title: '错误',
            message: '您没有权限进行此操作！'
        });
        return data.data;
    }

    // URL不包含/nologin/、token失效、用户不存在的需要登录
    if ((data.config.url && data.config.url.indexOf('/nologin/') == -1 && ((!_user) || _data.status == 401))) {
        let _result = undefined;
        $.ajax({
            url: (window.ShiYue.base + '/api/uaa/oauth/refresh'),
            async: false,
            success: (res) => {
                if (res.status == 200 && res.code == 'ok') {
                    sessionStorage.setItem('user', JSON.stringify(res));
                    store.mutations.getUserInfo(store.state);
                    let _c = data.config;
                    _result = $.ajax({
                        url: _c.url,
                        headers: (_c.method == 'get' ? undefined : _c.headers),
                        type: _c.method,
                        data: (_c.method == 'get' ? _c.params : _c.data),
                        async: false
                    }).responseJSON;

                } else {
                    showLoginDialog();
                }
            },
            error: (res) => {
                showLoginDialog();
            }
        });
        return _result || 'error';
    }

    // 异常信息统一处理
    if ((_data.status * 1) >= 1000 && (_data.status * 1) <= 50000) {
        let msg = '';
        if (_data.fieldErrors && _data.fieldErrors.length > 0) {
            for (let i = 0; i < _data.fieldErrors.length; i++) {
                msg += _data.fieldErrors[i].message + ' '
            }
        } else {
            msg = _data.message
        }
        Notification.info({ title: '信息', message: msg });
        return _data;
    }

    return _data;
}, error => {
    if ($('.el-notification__content').filter(function() {
            return $(this).text() == ('错误信息：' + error);
        }).length == 0) {
        Notification.error({ title: '响应失败', message: '错误信息：' + error });
    }
    // router.push('/codeError');
    return error;
});

export default axios;