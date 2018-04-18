<template>
    <sy-login :action="loginUrl" :callback="callback"></sy-login>
</template>

<script>
import config from '../config.js';
import router from '@/router';
import {getDesktopSelfprops} from '@/service/index.js';
export default {
    name: 'DialogLogin',
    props: {
        redirect: {
            type: String,
            default: ''
        }
    },
    data() {
        return {
            loginUrl: (window.ShiYue.base + config.loginUrl)  
        }
    },
    created() {
        window.sessionStorage.removeItem('user');
    },
    methods: {
        callback(res, e) {
            if (res && res.status === 200) {
                if (this.redirect) {
                    router.push(this.redirect);
                    location.reload();
                } else {
                    location.reload();
                }
            }
        }
    }
}
</script>

<style>
.sy-login-box {
    position: relative;
}

.sy-login-box .el-message-box__content {
    padding-top: 10px;
    padding-bottom: 20px;
}

.sy-login-box .el-message-box__btns {
    padding: 0px;
    height: 0px;
    margin: 0px;
}

.sy-login-box .el-message-box__message .sy-login-panel {
    box-shadow: none;
    padding: 0px;
}
</style>