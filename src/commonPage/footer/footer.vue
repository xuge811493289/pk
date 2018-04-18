<template>
    <div class="sy-footer">
        <div>
            版权所有：<a :href="loginConfigMsg.link" target="_blank">{{loginConfigMsg.footer}}</a>
        </div>
    </div>
</template>

<script>
import { getLoginConfig } from './request.js';
export default {
    name: 'footer',
    props: {
    },
    data() {
        return {
            loginConfigMsg: {
                footer: '上海师悦信息科技有限公司',
                link: 'http://www.shiyuesoft.com'
            }
        }
    },
    created() {
        getLoginConfig().then((data) => {
            if (data && data.data) {
                this.loginConfigMsg.footer = data.data.footer;
                this.loginConfigMsg.link = data.data.link;
            }
        });
    },
    methods: {
    }
}
</script>

<style scoped>
.sy-footer {
    height: 100%;
    width: 100%;
    line-height: 40px;
    text-align: center;
    color: #fff;
}

.sy-footer a {
    color: #fff;
    text-decoration: none;
}
</style>