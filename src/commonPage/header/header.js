import screenfull from 'screenfull';
import changeTheme from '@/theme/index.js';
import store from '@/vuex/store.js';
import {
    updataPassword,
    getDesktopSelfprops,
    updataThemeColor,
    validataEmail,
    validataMobile,
    imgUrl,
    showImgUrl,
    getUsrMsg,
    getPortalletList,
    getUnitLogo,
    updataUsrMsg,
    updataPortalletStatus,
    editgPortallet
} from './request.js';
export default {
    name: 'MyDesktop',
    data() {
        return {
            getUnitLogo: getUnitLogo + this.$store.state.unitId,
            imgUrl: imgUrl,
            showImgUrl: '',
            deskImgUrl: '',
            isHaveImg: true,
            isDeskHaveImg: true,
            loading: false,
            isfullscreen: false,
            bgColor: {
                background: "rgb(73, 193, 219)"
            },
            tableData: [],
            activeName: 'first',
            selfMsgDialog: false,
            menuModelDialog: false,
            themeModelDialog: false,
            editable: true,
            imgloading: false,
            isDragging: false,
            delayedDragging: false,
            isOpen: false,
            value: 3,
            oldPassWord: '',
            
            menuList: [],

            oldloginMobile: '',
            oldloginEmail: '',
            photoModel: {},
            mottoModel: {},
            msgModel: {},
            toolsModel: {},
            unitId: '',
            isEditDialog: false,
            editData: [],
            editDialog: false,
            currentColor: window.localStorage.getItem('themeColor') || '#20a0ff',
            themeColorList: [{
                name: '中国红',
                color: '#e31d1a'
            }, {
                name: '东方蓝',
                color: '#457CD6'
            }, {
                name: '赛罗蓝',
                color: '#49C1D9'
            }, {
                name: '清新绿',
                color: '#4DB021'
            }],
            loginConfigMsg: {
                footer: '',
                link: ''
            },
            dialogFormVisible: false,
            userName: '',
            iocnSrc: '',
            inputHost: window.localStorage.getItem('currentHost') || '',
            aboutDialog: false,
        }
    },
    watch: {
        name: function(newVal, oldVal) {
            if (!newVal) { return }
            this.userName = newVal;
        },
        isDragging(newValue) {
            if (newValue) {
                this.delayedDragging = true
                return
            }
            this.$nextTick(() => {
                this.delayedDragging = false
            })
        }
    },
    computed: {
        env: function() {
            if (process.env.NODE_ENV == 'development') {
                return true
            } else if (process.env.NODE_ENV == 'production') {
                return false
            }
        }
    },
    beforeCreate() {

    },
    created() {
        if (store.state.realName) {
            this.userName = store.state.realName;
        } else {
            this.userName = '';
        }
        if (store.state.avatar) {
            this.iocnSrc = window.ShiYue.base + '/api/storage/show/' + store.state.avatar;
        } else {
            this.iocnSrc = window.ShiYue.base + '/api/storage/show/' + 'logo.png';
        }
        let msg = window.localStorage.getItem('loginConfigMsg');
        msg = msg ? JSON.parse(msg) : false;
        if (msg && msg.link) {
            this.loginConfigMsg.footer = msg.footer;
            this.loginConfigMsg.link = msg.link;
        }
    },
    methods: {
        changeHost() {
            this.dialogFormVisible = false;
            window.localStorage.setItem('currentHost', this.inputHost);
            window.location.reload();
        },
        changeThemeColor(color) {
            let saveTheme = window.localStorage.getItem('themeColor');
            if (saveTheme && saveTheme == color) {
                return
            }
            updataThemeColor('color', color).then((data) => {
                if (data && data.data === 'success') {
                    this.$notify({
                        title: '成功',
                        message: '设置成功！',
                        type: 'success'
                    });
                    window.localStorage.setItem('themeColor', color);
                    changeTheme(color);
                } else {

                }
            })
        },
        // 接收座右铭信息 并修改
        onSelectType(msg) {
            if (this.selfMsgForm.motto === msg) {

            } else {
                this.selfMsgForm.motto = msg;
                this.submitForm('save');
            }
        },
        // 失去焦点校验
        handleBulur(t, value, obj, key) {
            if (t === 'phone') {
                if (!value) { return; }
                // console.log(this.oldloginMobile)
                if (this.oldloginMobile === this.$trim(value)) { return; }
                if (this.$checkPhoneNumber(this.$trim(value))) {
                    validataMobile(this.$trim(value)).then((data) => {
                        if (!data.data) {
                            this.$notify({
                                message: '手机号码已存在！',
                                type: 'warning'
                            });
                            obj[key] = '';
                        }
                    })
                } else {
                    this.$notify({
                        message: '手机号码格式有误！',
                        type: 'error'
                    });
                    obj[key] = '';
                }
            } else if (t === 'email') {
                if (!value) { return; }
                if (this.oldloginEmail === this.$trim(value)) { return; }
                if (this.$checkEmail(this.$trim(value))) {
                    validataEmail(this.$trim(value)).then((data) => {
                        if (!data.data) {
                            this.$notify({
                                message: '邮箱已存在！',
                                type: 'warning'
                            });
                            obj[key] = '';
                        }
                    })
                } else {
                    this.$notify({
                        message: '邮箱格式有误！',
                        type: 'error'
                    });
                    obj[key] = '';
                }
            }
        },
        open(t) {
            if (t === 'logout') {
                this.$confirm(this.$t('message.logout'), '提示', {
                    confirmButtonText: this.$t('button.ok'),
                    cancelButtonText: this.$t('button.cancel'),
                    type: 'warning'
                }).then(() => {
                    window.sessionStorage.removeItem('user');
                    window.localStorage.removeItem('themeColor');
                    $.post(window.ShiYue.base + '/api/uaa/oauth/logout', (res) => {
                        this.$router.push({
                            name: 'login'
                        });
                    });
                }).catch(() => {});
            } else if (t === 'reload') {
                window.location.reload();
            } else if (t === 'theme') {
                this.themeModelDialog = true;
            } else if (t === 'full') {
                if (!screenfull.enabled) {
                    this.$message({
                        message: 'you browser can not work',
                        type: 'warning'
                    })
                    return false
                }
                this.isfullscreen = !this.isfullscreen;
                screenfull.toggle()
                if (this.isfullscreen) {
                    this.onFullScreenEvent(this.fullScreenCallback)
                    requestFullscreen(dom)
                } else {
                    this.offFullScreenEvent(this.fullScreenCallback)
                    exitFullscreen()
                }
            } else if (t == 'host') {
                this.dialogFormVisible = true;
            } else {
                this.$alert('此功能没做', '提示', {
                    confirmButtonText: '确定',
                    callback: action => {

                    }
                });
            }
        },
        fullScreenCallback() {
            this.isfullscreen = this.fullScreenStatus()
            let isFullscreen = this.fullScreenStatus()
            if (!isFullscreen) {
                // 退出全屏时解绑回调
                this.offFullScreenEvent(this.fullScreenCallback)
            }
        },
        fullScreenStatus() {
            if (document.fullscreen ||
                document.mozFullScreen ||
                document.fullscreenElement ||
                document.msFullscreenElement ||
                document.webkitIsFullScreen) {
                return true
            } else {
                return false
            }
        },
        onFullScreenEvent(callback) {
            document.addEventListener('fullscreenchange', callback)
            document.addEventListener('mozfullscreenchange', callback)
            document.addEventListener('MSFullscreenChange', callback)
            document.addEventListener('webkitfullscreenchange', callback)
        },
        offFullScreenEvent(callback) {
            document.removeEventListener('fullscreenchange', callback)
            document.removeEventListener('mozfullscreenchange', callback)
            document.removeEventListener('MSFullscreenChange', callback)
            document.removeEventListener('webkitfullscreenchange', callback)
        }
    },
    mounted() {

    }
}