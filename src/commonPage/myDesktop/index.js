import _ from 'lodash';
import config from './config.js';
import changeTheme from '@/theme/index.js';
import {
    updataPassword,
    getDesktopSelfprops,
    updataThemeColor,
    validataEmail,
    validataMobile,
    imgUrl,
    showImgUrl,
    getUsrMsg,
    getUnitLogo,
    getPortalletList,
    updataUsrMsg,
    updataPortalletStatus,
    editgPortallet,
    findCodeList
} from './request.js';
import ClassList from './models/MyClassList.vue';
import Motto from './models/Motto.vue';
import Photos from './models/Photos.vue';
import Tools from './models/Tools.vue';
import MsgList from './models/MsgList.vue';
import WarringMsg from './models/WarringMsg.vue';
import MyDayWork from './models/MyDayWork.vue';
import News from './models/News.vue';
import MyDashbord from './models/MyDashbord.vue';
import EmailBox from './models/EmailBox.vue';
export default {
    components: {
        ClassList,
        Motto,
        Photos,
        Tools,
        MsgList,
        WarringMsg,
        MyDayWork,
        News,
        MyDashbord,
        EmailBox
    },
    directives: {
        toggle(el, binding) {
            const closeModel = () => {

            };
            el.addEventListener('click', (event) => {
                let height = el.parentNode.offsetHeight;
                let scorllHeight = el.parentNode.scrollHeight;
                let num = height;
                let doms = el.parentNode.childNodes;
                let div = document.createElement('div');
                div.setAttribute("id", "menu-model");
                div.style.position = 'fixed';
                div.style.width = '100%';
                div.style.height = '100%';
                div.style.zIndex = '998';
                let openTimer, closeTimer;
                //  div.style.background = 'rgba(155,155,155,.4)';
                if (height <= 60) {
                    el.innerHTML = '<i class="el-icon-arrow-up"></i>';
                    // doms[2].style.background = 'rgba(155,155,155,.4)';
                    doms[2].setAttribute("class", "sy-desktop-slide-open");
                    doms[2].setAttribute("class", "sy-theme-background");
                    document.getElementById('sy-desktop_model').appendChild(div);
                    // document.body.appendChild(div);
                    clearInterval(closeTimer);
                    openTimer = setInterval(() => {
                        num += 3;
                        el.parentNode.style.height = num + 'px';
                        if (num >= scorllHeight) {
                            clearInterval(openTimer);
                        }
                    }, 3)
                    div.addEventListener('click', (event) => {
                        event.stopPropagation();
                        clearInterval(openTimer);
                        let timer2 = setInterval(() => {
                            num -= 3;
                            el.parentNode.style.height = num + 'px';
                            if (num <= 60) {
                                el.innerHTML = '<i class="el-icon-arrow-down"></i>';
                                // doms[2].style.background = 'transparent';
                                doms[2].setAttribute("class", "sy-desktop-slide-close");
                                clearInterval(timer2);
                                let menuModel = document.getElementById('menu-model');
                                menuModel.parentNode.removeChild(menuModel);
                            }
                        }, 3)
                    });
                } else {
                    clearInterval(openTimer);
                    closeTimer = setInterval(() => {
                        num -= 3;
                        el.parentNode.style.height = num + 'px';
                        if (num <= 60) {
                            el.innerHTML = '<i class="el-icon-arrow-down"></i>';
                            // doms[2].style.background = 'transparent';
                            doms[2].setAttribute("class", "sy-desktop-slide-close");
                            clearInterval(closeTimer);
                            let menuModel = document.getElementById('menu-model');
                            menuModel.parentNode.removeChild(menuModel);
                        }
                    }, 3)
                }
            })
        }
    },
    name: 'MyDesktop',
    data() {
        var validateOldPass = (rule, value, callback) => {
            if (!value) {
                callback(new Error('旧密码不能为空！'));
            } else {
                if (value !== this.oldPassWord) {
                    callback(new Error('旧密码不正确！'));
                } else {
                    callback()
                }
            }
        };
        var validatePass = (rule, value, callback) => {
            if (value === '') {
                callback(new Error('新密码不能为空！'));
            } else {
                if (value === this.passForm.oldPass) {
                    callback(new Error('新密码不能与原密码一致！'));
                } else {
                    if (value.length <= 16 && value.length >= 8) {
                        callback()
                    } else {
                        callback(new Error('长度在8~16位之间！'));
                    }
                }
            }
        };
        var validatePass2 = (rule, value, callback) => {
            if (value === '') {
                callback(new Error('确认密码不能为空！'));
            } else if (value !== this.passForm.pass) {
                callback(new Error('新密码与确认密码不一致!'));
            } else {
                callback();
            }
        };
        var validatePhone = (rule, value, callback) => {
            if (!value) { return callback(); }
            if (this.oldloginMobile === this.$trim(value)) { return callback(); }
            if (this.$checkPhoneNumber(this.$trim(value))) {
                validataMobile(this.$trim(value)).then((data) => {
                    if (!data.data) {
                        return callback(new Error('手机号码已存在!'));
                    } else {
                        callback();
                    }
                })
            } else {
                return callback(new Error('手机号码格式有误!'));
            }
        };
        var validateEmail = (rule, value, callback) => {
            if (!value) { return callback(); }
            if (this.oldloginEmail === this.$trim(value)) { return callback(); }
            if (this.$checkEmail(this.$trim(value))) {
                validataEmail(this.$trim(value)).then((data) => {
                    if (!data.data) {
                        return callback(new Error('邮箱已存在!'));
                    } else {
                        callback();
                    }
                })
            } else {
                return callback(new Error('邮箱格式有误!'));
            }
        };
        var validateQuestion = (rule, value, callback) => {
            if (!value && this.selfMsgForm.answer) {
                return callback(new Error('密保问题不能为空!'));
            }
            if (!value) { return callback(); }
            if (!this.selfMsgForm.question && !this.selfMsgForm.answer) {
                return callback();
            } else if (value && !this.selfMsgForm.answer) {
                // return callback(new Error('密保答案不能为空!'));
                this.$refs.selfMsgForm.validateField('answer');
                return callback();
            } else {
                return callback();
            }
        };
        var validateAnswer = (rule, value, callback) => {
            if (this.selfMsgForm.question && !value) {
                return callback(new Error('密保答案不能为空!'));
            }
            if (!value) { return callback(); }
            if (!this.selfMsgForm.question && !value) {
                return callback();
            } else if (!this.selfMsgForm.question && value) {
                this.$refs.selfMsgForm.validateField('question');
                return callback();
            } else {
                return callback();
            }
        };
        return {
            columX: config.list,
            imgUrl: imgUrl,
            showImgUrl: '',
            deskImgUrl: '',
            getUnitLogo: getUnitLogo + this.$store.state.unitId,
            iocnSrc: '',
            isHaveImg: true,
            isfullscreen: false,
            loading: false,
            data: {
                serverid: 'base',
                uploadtype: 'head'
            },
            bgColor: {
                background: "rgb(73, 193, 219)"
            },
            selfMsgForm: {
                loginName: '',
                realName: '',
                loginEmail: '',
                loginMobile: '',
                question: '',
                answer: '',
                brief: '',
                avatar: '',
                motto: '',
                img: ''
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
            passForm: {
                pass: '',
                checkPass: '',
                oldPass: ''
            },
            oldPassWord: '',
            rules: {
                pass: [
                    { required: true, validator: validatePass, trigger: 'blur' }
                ],
                checkPass: [
                    { required: true, validator: validatePass2, trigger: 'blur' }
                ],
                oldPass: [
                    { required: true, validator: validateOldPass, trigger: 'blur' }
                ],
                loginMobile: [
                    { validator: validatePhone, trigger: 'blur' }
                ],
                loginEmail: [
                    { validator: validateEmail, trigger: 'blur' }
                ],
                question: [
                    { validator: validateQuestion, trigger: 'change' }
                ],
                answer: [
                    { validator: validateAnswer, trigger: 'change' }
                ]
            },
            imageUrl: '/common/images/img.jpg',
            menuList: [],
            imgs: {
                base: '/common/images/base.png',
                rc: '/common/images/resdesk.png',
                dy: '/common/images/dy.png',
                app: '/common/images/app.png',
                comment: '/common/images/comment.png',
                el: '/common/images/el.png',
                sc: '/common/images/sc.png',
                po: '/common/images/po.png',
                default: '/common/images/desk.png',
            },
            oldloginMobile: '',
            oldloginEmail: '',
            photoModel: {},
            mottoModel: {},
            msgModel: {},
            toolsModel: {},
            unitId: '',
            dialogConfig: config.list,
            isEditDialog: false,
            editData: [],
            editDialog: false,
            themeColorList: [{
                name: '中国红',
                color: '#FE0000'
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
            showModelList: {
                'app_desktop_toolCase': false,
                'app_desktop_motto': false,
                'app_desktop_album': false
            },
            codeLists: {
                'btn_base_desk_info': false,
                'btn_base_desk_lets': false,
                'btn_base_desk_lets_status': false,
                'btn_base_desk_lets_update': false
            }
        }
    },
    watch: {
        'passForm.oldPass': function(val) {
            this.oldPassWord = val;
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
        dragOptions() {
            return {
                animation: 10,
                group: 'description',
                disabled: !this.editable,
                ghostClass: 'ghost',
                userId: '',
            };
        },
        listString() {
            return JSON.stringify(this.list, null, 2);
        },
    },
    beforeCreate() {
        document.title = '个人桌面';
    },
    created() {
        let msg = window.localStorage.getItem('loginConfigMsg');
        msg = msg ? JSON.parse(msg) : false;
        if (msg && msg.link) {
            this.loginConfigMsg.footer = msg.footer;
            this.loginConfigMsg.link = msg.link;
        }
        this.userId = this.$store.state.userId;
        this.unitId = this.$store.state.unitId;
        if (this.$store.state.avatar) {
            this.iocnSrc = window.ShiYue.base + '/api/storage/show/' + this.$store.state.avatar;
        } else {
            this.iocnSrc = window.ShiYue.base + '/api/storage/show/' + 'logo.png';
        }
        this.getMyMsgList();
        this.getUserMsg();

        // showModelList
        findCodeList().then((res) => {
            Object.keys(this.codeLists).forEach((_show, i) => {
                this.codeLists[_show] = (_.find((res.data || []), {
                    code: _show
                }) ? true : false);
            });
        });
    },
    methods: {
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
                this.submitForm('selfMsgForm');
            }
        },
        // 基本信息
        getMyMsgList() {
            getDesktopSelfprops().then((data) => {
                if (data && data.data) {
                    if (data.data.backgroundColor) {
                        let saveTheme = window.localStorage.getItem('themeColor');
                        if (saveTheme && saveTheme != data.data.backgroundColor) {
                            window.localStorage.setItem('themeColor', data.data.backgroundColor);
                            changeTheme(data.data.backgroundColor);
                        }
                    }
                    let menu = JSON.parse(data.data.iconProps);
                    if (menu && menu.length > 0) {
                        this.menuList = _.sortBy(menu, function(o) { return o.sort; });
                    }
                    let moduleList = JSON.parse(data.data.moduleProps);
                    Object.keys(this.showModelList).forEach((_show, i) => {
                        let obj = _.find(moduleList, { resourceId: _show });
                        if (obj.status == 1) {
                            this.showModelList[_show] = true;
                        } else {
                            this.showModelList[_show] = false;
                        }
                    })
                }
            })
        },
        // 获取用户信息
        getUserMsg() {
            getUsrMsg(this.userId).then((data) => {
                if (data && data.data) {
                    this.selfMsgForm = _.cloneDeep(data.data);
                    if (!data.data.img && !data.data.avatar) {
                        this.isHaveImg = false;
                    } else {
                        this.isHaveImg = true;
                        this.showImgUrl = showImgUrl + (data.data.avatar || data.data.img);
                        this.deskImgUrl = showImgUrl + (data.data.avatar || data.data.img);
                    }
                    this.oldloginMobile = data.data.loginMobile;
                    this.oldloginEmail = data.data.loginEmail;
                }
            });
        },
        handleEnd() {

        },
        open(t) {
            if (t === 'user') {
                this.$refs.passForm.resetFields();
                this.$refs.selfMsgForm.resetFields();
                getUsrMsg(this.userId).then((data) => {
                    if (data && data.data) {
                        this.selfMsgForm = _.cloneDeep(data.data);
                    }
                    this.selfMsgDialog = true;
                });
            } else if (t === 'logout') {
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
            } else if (t === 'menu') {
                this.menuModelDialog = true;
                this.getCodeList();
            } else {
                this.$alert('此功能没做', '提示', {
                    confirmButtonText: '确定',
                    callback: action => {

                    }
                });
            }
        },
        getCodeList() {
            getPortalletList(this.unitId).then((data) => {
                let _filter = ['app_desktop_icon', 'btn_base_desk_lets_update', 'desktop', 'btn_base_desk_lets', 'btn_base_desk_lets_status', 'btn_base_desk_info', 'btn_base_desk_lets_update'];
                if (data && data.code === 'ok') {
                    let arr = [];
                    data.data.forEach((_d, i) => {
                        let obj = {};
                        obj = {..._d, ..._d.props };
                        if (_d.resourceId == "app_desktop_toolCase" || _d.resourceId == "app_desktop_motto" || _d.resourceId == "app_desktop_album") {
                            obj.rows = null;
                        }
                        if (_filter.indexOf(_d.resourceId) == -1) {
                            arr.push(obj);
                        }
                    })
                    this.tableData = arr;
                } else {

                }
            })
        },
        // 标签页切换
        handleClick(tab, event) {
            this.activeName = tab.name
        },
        save() {
            // console.log(this.listString);
        },
        onMove({ relatedContext, draggedContext }) {
            const relatedElement = relatedContext.element;
            const draggedElement = draggedContext.element;
            return (!relatedElement || !relatedElement.fixed) && !draggedElement.fixed
        },
        onOpenList() {
            this.isOpen = !this.isOpen;
        },
        jump(path) {
            if (process.env.NODE_ENV == 'development'){
                let div = document.getElementById('menu-model');
                let body = document.getElementById('sy-desktop_model');
                if (div) {
                    body.removeChild(div);
                }
                window.sessionStorage.removeItem('page');
                this.$router.push('/' + path);
            }else{
                window.open('/' + path)
            }
        },
        handleSelect() {

        },
        // 编辑个人信息
        submitForm(formName) {
            if (formName === 'passForm') {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        updataPassword(this.passForm.oldPass, this.passForm.checkPass).then((data) => {
                            if (data && data.data === 'success') {
                                this.$notify({
                                    title: '成功',
                                    message: '修改密码成功',
                                    type: 'success'
                                });
                                // 登出重新登录
                                this.$router.push('/login');
                                this.selfMsgDialog = false;
                            } else if (data.message === '原始密码不正确') {
                                this.oldPassWord = '';
                                this.$refs[formName].validateField('oldPass')
                            }
                        })
                    } else {
                        return false;
                    }
                });
            } else {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        updataUsrMsg(this.selfMsgForm).then((data) => {
                            if (data && data.data === 'success') {
                                this.$notify({
                                    title: '成功',
                                    message: '修改成功',
                                    type: 'success'
                                });
                                this.selfMsgDialog = false;
                                this.getUserMsg();
                            }
                        })
                    } else {
                        return false;
                    }
                });
            }
        },
        resetForm(formName) {
            this.$refs[formName].resetFields();
        },
        // 上传成功
        handleAvatarSuccess(res, file) {
            this.imgloading = false;
            if (res.status === 200) {
                if (res.data && !res.data.error) {
                    // this.$notify.success({
                    //   message: res.data.msg
                    // });
                    this.selfMsgForm.img = res.data.id;
                    this.selfMsgForm.avatar = res.data.id;
                    this.isHaveImg = true;
                    this.showImgUrl = showImgUrl + res.data.id;
                } else {
                    this.isHaveImg = false;
                }
            } else {
                this.$notify.error({
                    message: res.data.msg || res.message
                });
                this.isHaveImg = false;
            }
            this.loading = false;
        },
        beforeAvatarUpload(file) {
            const isJPG = file.type === 'image/jpeg';
            const isPNG = file.type === 'image/png';
            const isLt2M = file.size / 1024 / 1024 < 2;
            if (!isJPG && !isPNG) {
                this.$message.error('上传头像图片只能是 JPG/PNG 格式!');
            }
            if (!isLt2M) {
                this.$message.error('上传头像图片大小不能超过 2MB!');
            }
            if ((isJPG || isPNG) && isLt2M) {
                this.imgloading = true;
            } else {
                this.imgloading = false;
            }
            return (isJPG || isPNG) && isLt2M;
        },
        dialogEdit(obj) {
            this.isEditDialog = true;
            this.$set(this.editData, 0, _.cloneDeep(obj))
        },
        saveEditDialog(editData) {
            let parmas = {
                'id': editData.id,
                'props.rows': editData.rows,
                'props.width': editData.width,
                'props.height': editData.height,
                'props.expand': editData.expand,
                'props.remove': editData.remove,
                'props.tabs': editData.tabs,
                'name': editData.name,
                'resourceId': editData.resourceId,
                'status': editData.status,
                'unitId': this.unitId
            }
            editgPortallet(parmas).then((data) => {
                if (data.status == 200) {
                    this.isEditDialog = false
                    this.getCodeList();
                    // this.getMyMsgList();
                    this.$notify({
                        message: '保存成功!',
                        type: 'success'
                    });
                } else {

                }
            })
        },
        controlPortalletStatus(obj) {
            let id = obj.id
            let parmas = {
                status: obj.status ? 0 : 1
            }
            updataPortalletStatus(id, parmas).then((data) => {
                if (data.status == 200) {
                    this.getCodeList();
                    this.getMyMsgList();
                    this.$notify({
                        message: '修改成功!',
                        type: 'success'
                    });

                }
            })
        }
    },
    mounted() {

    }
}