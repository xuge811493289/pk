<template>
    <div class="app-container-box">
        <div class="sy-div-form">
            <el-form :model="form" :rules="loginRules" ref="form" label-width="180px" class="sy-form-login" v-if="codeList['btn_base_login_page_submit']">
                <el-form-item label="请配置您的登录背景图片：" prop="backdrop">
                    <el-upload
                    class="sy-upload-login"
                    name="fileUpload"
                    :action="uploadBgUrl"
                    :data="bgData"
                    :show-file-list="false"
                    :on-success="handleBgSuccess"
                    :before-upload="beforeBgUpload"
                    >
                    <el-button size="small" type="primary" :loading="bgBtn">点击上传</el-button>
                </el-upload>
                </el-form-item>
                <el-form-item label="请配置您的logo图片：" prop="logo">
                    <el-upload
                    class="sy-upload-login"
                    name="fileUpload"
                    :action="uploadLogoUrl"
                    :data="logoData"
                    :show-file-list="false"
                    :on-success="handleAvatarSuccess"
                    :before-upload="beforeAvatarUpload"
                    >
                    <el-button size="small" type="primary" :loading="logoBtn">点击上传</el-button>
                    </el-upload>
                </el-form-item>
                <el-form-item label="登录页面页脚：" prop="footer">
                    <el-input size="small" v-model="form.footer"></el-input>
                </el-form-item>
                <el-form-item label="页脚连接：" prop="link">
                    <el-input size="small" v-model="form.link"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button size="small" :loading="subBtn" type="primary" @click="submitForm('form')" style="float:right">提 交</el-button>
                </el-form-item>
            </el-form>
            <div class="sy-login-zhanshi" :style="{'background-image': `url(${form.backdrop && form.backdrop.indexOf('http')==-1 ? showBg+form.backdrop : form.backdrop})`}">
                <div class="sy-login-top">
                    <div class="sy-login-container">
                        <a :href="form.link" target="_blank"
                            :style="{'background-image': `url(${form.logo && form.logo.indexOf('http')==-1 ? showBg+form.logo : form.logo})`}">
                            <!-- <img :src="form.logo.indexOf('http')==-1 ? showLogo+form.logo : form.logo" /> -->
                        </a>
                    </div>
                </div>
                <div class="sy-login-main" :style="{'background-color': form.backdrop ? 'transparent' : ''}">
                    <div class="sy-img-bg">
                        <!-- <img :src="showBg+form.backdrop" alt="" /> -->
                    </div>
                    <img class="sy-img-bg-footer" :src="bgfooterImgUrl" alt="" />
                    <div disabled style="widht:100%;height:100%;">
                        <sy-login ref="sylogin"></sy-login>
                    </div>
                </div>
                <div class="sy-login-foot">
                    <div class="sy-login-footer">版权所有：<a :href="form.link" target="_blank">{{form.footer}}</a></div>
                </div>
                <div class="sy-login-zhanshi-layer"></div>
            </div>
        </div>
    </div>
</template>

<script>
    import _ from 'lodash';
  import config from './config.js';
  import { getRcCodeList } from '../../request.js';
  import {getLoginConfig,saveLoginConfig,getDefaultLoginConfig} from '../requestApi.js';
  export default {
    name: '',
    component: {},
    data () {
        let checkLink = (rule, value, callback) => {
            if (!value) {
                return callback(new Error('页脚连接不能为空'));
            } else {
                let strRegex  = `^((https|http|ftp|rtsp|mms)?://)?(([0-9a-z_!~*'().&=+$%-]+: )?[0-9a-z_!~*'().&=+$%-]+@)?(([0-9]{1,3}\.){3}[0-9]{1,3}|([0-9a-z_!~*'()-]+\.)*([0-9a-z][0-9a-z-]{0,61})?[0-9a-z]\.[a-z]{2,6})(:[0-9]{1,4})?((/?)|(/[0-9a-z_!~*'().;?:@&=+$,%#-]+)+/?)$`;
                var reg = new RegExp(strRegex);
                if(reg.test(value)){
                    callback()
                }else{
                    return callback(new Error('页脚连接格式不正确'));
                }
            }
        };
        return {
            logoBtn: false,
            bgBtn: false,
            subBtn: false,
            uploadBgUrl: window.ShiYue.base + '/zuul/api/storage/upload/type',
            uploadLogoUrl: window.ShiYue.base + '/zuul/api/storage/upload/type',
            showLogo: window.ShiYue.base +'/api/storage/show/thumbnail/',
            showBg: window.ShiYue.base +'/api/storage/show/',
            bgData: {
                serverid: 'base',
                uploadtype: 'theme',
                width: 2400
            },
            logoData: {
                serverid: 'base',
                uploadtype: 'logo'
            },
            form: {
                footer: '',
                link:'',
                backdrop: '',
                logo: ''
            },
            loginRules: {
                link: [
                    { required: true, validator: checkLink,  trigger: 'blur' },
                    { min: 1, max: 50, message: '长度在 1 到 50 个字符', trigger: 'blur' }
                ],
                footer: [
                    { required: true, message: '登录页面页脚不能为空', trigger: 'blur' },
                    { min: 1, max: 50, message: '长度在 1 到 50 个字符', trigger: 'blur' }
                ],
                backdrop: [
                    { required: true, message: '请配置您的登录背景图片', trigger: 'blur' },
                ],
                logo: [
                    { required: true, message: '请配置您的logo图片', trigger: 'blur' },
                ],
            },
            tplForm: {
                userName: 'hello world',
                passWord: 'hulala',
                tplRadio: ''
            },
            oldMsg: '',
            logoImgUrl: '/common/images/login/logo.jpg',
            bgImgUrl: '/common/images/login/img.png',
            bgfooterImgUrl: '/common/images/login/foot.png',
            codeList: {
                'btn_base_login_page_bg': false, // logo
                'btn_base_login_page_logo': false, // "背景"
                'btn_base_login_page_submit': false, // 保存
            }
        }
    },
    beforeCreate () {

    },
    created () {
        this.$parent.$emit('currentPage', '/base/loginConf');
        getRcCodeList('category_base_login_page', this.codeList).then(() => {
            getLoginConfig().then((data)=>{
                if(data && data.code === 'ok'){
                    if(!data.data){
                        getDefaultLoginConfig().then((def)=>{
                            this.form.footer = def.data.footer;
                            this.form.link = def.data.link;
                            this.form.backdrop = def.data.backdrop;
                            this.form.logo = def.data.logo;
                        })
                    }else{
                        this.oldMsg = data.data;
                        this.form.footer = data.data.footer;
                        this.form.link = data.data.link;
                        this.form.backdrop = data.data.backdrop;
                        this.form.logo = data.data.logo;
                    }
                }
            })
        });
    },
    mounted() {
    	this.$refs['sylogin'].$refs.loginForm.resetFields();
    	this.$refs['sylogin'].loginForm.remPass = false;
    	this.$refs['sylogin'].loginForm.password = '';
    	this.$refs['sylogin'].loginForm.username = '';
    },
    methods : {
        submitForm(formName) {
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    if(this.oldMsg.footer === this.form.footer &&
                        this.oldMsg.link === this.form.link &&
                        this.oldMsg.backdrop === this.form.backdrop &&
                        this.oldMsg.logo === this.form.logo
                    ){return}
                    this.subBtn = true;
                    saveLoginConfig(this.form).then((data)=>{
                        this.subBtn = false;
                        if(data && data.code === 'ok'){
                            this.$notify({
                                title: '成功',
                                message: '成功',
                                type: 'success'
                            });
                            this.oldMsg.footer = this.form.footer;
                            this.oldMsg.link = this.form.link;
                            this.oldMsg.backdrop = this.form.backdrop;
                            this.oldMsg.logo = this.form.logo;
                            window.localStorage.setItem('loginConfigMsg',JSON.stringify(this.form));
                        }else{
                            this.$notify({
                                title: '成功',
                                message: _.map(data.fieldErrors,'message').join(','),
                                type: 'error'
                            });
                        }
                    })
                } else {
                    return false;
                }
            });
        },
        //logo
        handleAvatarSuccess(res, file) {
            this.logoBtn = false;
            if (res.status === 200) {
                if (res.code === 'ok' && res.data) {
                    this.$notify.success({
                        message: res.data.msg
                    });
                    this.form.logo = res.data.id;
                } else {
                }
            } else {
                this.$notify.error({
                    message: res.fieldErrors
                });
            }
        },
        // bg
        handleBgSuccess(res, file) {
            this.bgBtn = false;
            if (res.status === 200) {
                if (res.data && !res.data.error) {
                    this.$notify.success({
                        message: res.data.msg
                    });
                    this.form.backdrop = res.data.id;
                } else {
                }
            } else {
                this.$notify.error({
                    message: res.fieldErrors
                });
            }
        },
        beforeBgUpload(file) {
            const isJPG = file.type === 'image/jpeg';
            const isPNG = file.type === 'image/png';
            const isLt2M = file.size / 1024 / 1024 < 1;

            if (!isJPG && !isPNG) {
                this.$message.error('上传头像图片只能是 JPG/PNG 格式!');
            }
            if (!isLt2M) {
                this.$message.error('上传头像图片大小不能超过 1MB!');
            }
            if ((isJPG || isPNG) && isLt2M) {
                this.bgBtn = true;
            } else {
                this.bgBtn = false;
            }
            return (isJPG || isPNG) && isLt2M;
        },
        beforeAvatarUpload(file) {
            const isJPG = file.type === 'image/jpeg';
            const isPNG = file.type === 'image/png';
            const isLt2M = file.size / 1024 / 1024 < 1;

            if (!isJPG && !isPNG) {
                this.$message.error('上传头像图片只能是 JPG/PNG 格式!');
            }
            if (!isLt2M) {
                this.$message.error('上传头像图片大小不能超过 1MB!');
            }
            if ((isJPG || isPNG) && isLt2M) {
                this.logoBtn = true;
            } else {
                this.logoBtn = false;
            }
            return (isJPG || isPNG) && isLt2M;
        },

    }
  }
</script>

<style scoped>

.sy-div-form{
  box-sizing: border-box;
  height:97%;
  margin: 10px;
  overflow: auto;
}
.sy-div-form .sy-form-login{
    padding: 10px 20px;
    width: 50%;
}
.sy-login-main {
    background-color: #00A0E9;
}
.sy-login-panel-cont .fogPass .el-button--text {
	color: #00A0E9;
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
/* .sy-login-zhanshi{
    position: relative;
    height: 100%;
    border: 1px solid #d3dce6;
    background-repeat: no-repeat;
    background-size: cover;
    background-position: 22% 50%;
    background-size: 52%;
    overflow: hidden;
} */
.sy-login-zhanshi-layer {
	position: absolute;
	top: 0px;
	left: 0px;
	right: 0px;
	bottom: 0px;
    z-index: 1005;
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
    padding: 10px 5px;
    box-sizing: border-box;
}

.sy-login-top a,
.sy-login-top a:hover,
.sy-login-top a:active {
    color: transparent;
    display: inline-block;
    height: 100%;
    width: 50%;
    box-sizing: border-box;
    background-repeat: no-repeat;
    background-size: contain;
    background-position: left center;
    overflow: hidden;
}
.sy-login-top a img{
    height: 100%;
    background-color: #fff;
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
}
</style>
