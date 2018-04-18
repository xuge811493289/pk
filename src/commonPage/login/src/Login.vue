<template>
    <div class="sy-login-zhanshi" :style="{'background-image': `url(${loginConfigMsg.backdrop && loginConfigMsg.backdrop.indexOf('http')==-1 ? showBg+loginConfigMsg.backdrop : (loginConfigMsg.backdrop ? loginConfigMsg.backdrop : '/common/images/login/img.png')})`, 'background-size': `${loginConfigMsg.backdrop ? '50%' : '40%'}`}">
        <div class="sy-login-top">
            <div class="sy-login-container">
                <a :href="loginConfigMsg.link"
                    target="_blank"
                    :style="{'background-image': `url(${loginConfigMsg.logo && loginConfigMsg.logo.indexOf('http')==-1 ? showBg+loginConfigMsg.logo : (loginConfigMsg.logo ? loginConfigMsg.logo : mrImg)})`}">
                    <!-- <img :src="loginConfigMsg.logo" /> -->
                </a>
            </div>
        </div>
        <div class="sy-login-main">
            <div class="sy-img-bg">
                <!-- <img :src="loginConfigMsg.backdrop" alt="" /> -->
            </div>
            <img class="sy-img-bg-footer" src="/common/images/login/foot.png" alt="" />
            <sy-login :action="loginUrl" :callback="callback"></sy-login>
        </div>
        <div class="sy-login-foot">
            <div class="sy-login-container">版权所有：<a :href="loginConfigMsg.link" target="_blank">{{loginConfigMsg.footer}}</a></div>
        </div>
    </div>
</template>

<script>
import config from '../config.js';
import {getLoginConfig} from '../request.js';
import changeTheme from '@/theme/index.js';
import {getDesktopSelfprops} from '@/service/index.js';
export default {
    name: 'Login',
    data() {
        return {
            loginUrl: (window.ShiYue.base + config.loginUrl),
            logout: (window.ShiYue.base + config.logout),
            meUrl: (window.ShiYue.base + config.meUrl),
            loginConfigMsg: {
            	link: this.$t('login.link'),
            	footer: this.$t('login.name')
            },
            showLogo: window.ShiYue.base +'/api/storage/show/thumbnail/',
            showBg: window.ShiYue.base +'/api/storage/show/',
            mrImg: '/common/images/login/logo.jpg',
            bgImg: '/common/images/login/img.png'
        }
    },
    created() {
        window.sessionStorage.removeItem('user');
        getLoginConfig().then((data)=>{
            this.loginConfigMsg = data.data;
        });
    },
    methods: {
        getQuery(name) {
            var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)', 'i'),
                r = window.location.search.substr(1).match(reg);
            if (r) {
                return r[2];
            }
            return null;
        },
        callback(res, e) {
            if (res && res.status === 200) {
                getDesktopSelfprops().then((data)=>{
                    if (data && data.data) {
                        if (data.data.backgroundColor) {
                            let saveTheme = window.localStorage.getItem('themeColor');
                            if (!saveTheme && saveTheme != data.data.backgroundColor) {
                                window.localStorage.setItem('themeColor', data.data.backgroundColor);
                                changeTheme(data.data.backgroundColor);
                            }
                        }
                    }
                });
                let redirect = null;
                if (redirect = this.$route.params.redirect) {
                    this.$router.push(redirect);
                    location.reload();
                } else if (redirect = this.getQuery('redirect')) {
                    window.location.href = decodeURIComponent(redirect);
                } else {
                    this.$router.push('/');
                    location.reload();
                }
            }
        }
    }
}
</script>

<style scoped>
input[checked] {
    vertical-align: middle;
}
.sy-login-main {
    background-color: #00A0E9;
}
.sy-login-panel-cont .fogPass .el-button--text {
	color: #1f2d3d;
}
.sy-login-panel .sy-login-panel-header {
	color: #00A0E9;
}
.sy-login-zhanshi{
    position: relative;
    height: 100%;
    background-color: #00A0E9;
    box-sizing: border-box;
    border-top: 1px solid #d3dce6;
    background-repeat: no-repeat;
    background-size: cover;
    background-position: 15% 50%;
    background-size: 52%;
    overflow: hidden;
}
.sy-login-top {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    min-width: 720px;
    height: 89px;
    background: #F6F7FB;
}

.sy-login-main {
    position: absolute;
    top: 88px;
    left: 0;
    bottom: 0;
    width: 100%;
    min-width: 720px;
    background-size: 100% 100%;
    background-repeat: no-repeat;
    background-size: cover;
    background-position: center center;
    overflow: hidden;
    /* background: url("./img/foot.png") left bottom repeat-x; */
    /* background-color: #4489FE; */
    background-color: transparent;
}

.sy-img-bg {
    position: absolute;
    padding-left: 233px;
    top: 96px;
    width: 100%;
    box-sizing: border-box;
    bottom: 200px;
}

.sy-img-bg img {
    height: 100%;
    min-height: 400px;
}

img.sy-img-bg-footer{
    position: absolute;
    bottom: 0;
    left: 0;
    height: 200px;
}

.sy-login-foot {
    position: absolute;
    left: 0;
    bottom: 0;
    width: 100%;
    min-width: 720px;
    height: 50px;
    line-height: 50px;
    text-align: center
}

.sy-login-container {
    width: 80%;
    margin: 0 auto;
    height: 100%;
    padding: 10px 0px;
    box-sizing: border-box;
}

.sy-login-top a,
.sy-login-top a:hover,
.sy-login-top a:active {
    color: transparent;
    display: inline-block;
    height: 100%;
    width: 20%;
    box-sizing: border-box;
    background-repeat: no-repeat;
    background-size: contain;
    background-position: left center;
    overflow: hidden;
}
.sy-login-top a img{
    height: 100%;
}
.sy-login-foot a,
.sy-login-foot a:hover,
.sy-login-foot a:active {
    color: #666;
    text-decoration: none;
}

.sy-login-panel {
    width: 310px;
    position: absolute;
    right: 8%;
    top: 20%;
    background: #FCFCFC;
    z-index: 1000;
}
/* .sy-login-top {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    min-width: 720px;
    height: 89px;
    background: #F6F7FB;
}

.sy-login-main {
    position: absolute;
    top: 88px;
    left: 0;
    bottom: 0;
    width: 100%;
    min-width: 720px;
    background-size: 100% 100%;
    background: url("/common/images/login/foot.png") left bottom repeat-x #4489FE;
}

.sy-img-bg {
    position: absolute;
    left: 224px;
    top: 96px;
    bottom: 233px;
}

.sy-img-bg img {
    height: 100%;
    min-height: 400px;
}

.sy-login-foot {
    position: absolute;
    left: 0;
    bottom: 0;
    width: 100%;
    min-width: 720px;
    height: 50px;
    line-height: 50px;
    text-align: center
}

.sy-login-container {
    width: 80%;
    margin: 0 auto;
}

.sy-login-top a,
.sy-login-top a:hover,
.sy-login-top a:active {
    color: transparent;
}

.sy-login-foot a,
.sy-login-foot a:hover,
.sy-login-foot a:active {
    color: #000;
    text-decoration: none;
}

.sy-login-panel {
    width: 310px;
    position: absolute;
    right: 8%;
    top: 20%;
    background: #FCFCFC;
    z-index: 1000;
} */
</style>