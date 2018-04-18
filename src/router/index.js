import Vue from 'vue'
import Router from 'vue-router'
import request from '../api';
// 加载注册路由
import login from '../commonPage/login/router.js';
import routers from './routers.js';

Vue.use(Router);

let routes = [
    ...login,
    ...routers
];

let router = new Router({
    mode: 'history',
    history: true,
    hashbang: false, //将路径格式化为#!开头
    transitionOnLoad: true, //初次加载是否启用场景切换
    saveScrollPosition: false, //在启用html5 history模式的时候生效，用于后退操作的时候记住之前的滚动条位置
    routes,
    scrollBehavior(to, from, savedPosition) { //这个功能只在 HTML5 history 模式下可用
        if (savedPosition) {
            // return savedPosition
            return {
                x: 0,
                y: 0
            }
        } else {
            return {
                x: 0,
                y: 0
            }
        }
    }
});

// 路由导航钩子
router.beforeEach((to, from, next) => {
    //alert(to);
    // Cookies.set('name', 'value');
    // alert(Cookies.get('name'))
    // console.log('cookie 测试',Cookies.get('name'));
    let user = sessionStorage.getItem('user');
    if ((!user && to.path == '/login') ||
        (to.meta && to.meta.noLoginRequired) ||
        to.fullPath.indexOf('/rc') !== -1) {
        next();
        return false;
    };
    if (user) {

        // 登录，再进login自动跳走
        if (to.path == '/login') {
            router.push('/');
            return false;
        }

        next();
        return false;
    } else {
        if (!user) {
            sessionStorage.removeItem('user');
            let res = $.ajax({
                url: ShiYue.base + '/api/uaa/oauth/me',
                type: 'get',
                async: false
            }).responseJSON;
            if (res && res.status == 200) {
                sessionStorage.setItem('user', JSON.stringify(res));
                location.reload();
                return false;
            }
        }
        router.push({
            name: 'login',
            params: {
                redirect: to.fullPath
            }
        });
        return false;
    }
    // to 和 from 都是 路由信息对象
    // to Route: 即将要进入的目标 路由对象
    // from: Route: 当前导航正要离开的路由
    // next: Function: 一定要调用该方法来 resolve 这个钩子。
    // next(): 进行管道中的下一个钩子。如果全部钩子执行完了，则导航的状态就是 confirmed （确认的）。
    // next(false): 中断当前的导航。如果浏览器的 URL 改变了（可能是用户手动或者浏览器后退按钮），那么 URL 地址会重置到 from 路由对应的地址。
    // next('/') 或者 next({ path: '/' }): 跳转到一个不同的地址。当前的导航被中断，然后进行一个新的导航。
})

export default router