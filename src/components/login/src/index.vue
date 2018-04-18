<template>
    <div class="sy-login-panel">
        <div class="sy-login-panel-header">用户登录</div>
        <div class="sy-login-panel-cont">
            <el-form ref="loginForm" :model="loginForm" :rules="loginFormRules">
                <el-form-item prop="username">
                    <el-input ref="username" @focus="ifocus" @blur="iblur" type="text" @change="inputChange" v-model.trim="loginForm.username" size="large" placeholder="请输入账号" @keyup.enter.native="next('password', 'username')">
                        <template slot="prepend">
                            <span class="fa fa-user" aria-hidden="true"></span>
                        </template>
                    </el-input>
                </el-form-item>
                <el-form-item prop="password">
                    <el-input ref="password" @focus="ifocus" @blur="iblur" type="password" @change="inputChange" v-model.trim="loginForm.password" size="large" placeholder="请输入密码" @keyup.enter.native="next('button', 'password')">
                        <template slot="prepend">
                            <span class="fa fa-lock" aria-hidden="true"></span>
                        </template>
                    </el-input>
                </el-form-item>
                <el-form-item prop="errorMsg" class="sy-login-errormsg"></el-form-item>
                <el-form-item>
                    <el-row>
                        <el-col :span="18">
                            <el-checkbox v-model="loginForm.remPass" @change="removeRempass">记住密码</el-checkbox>
                        </el-col>
                        <el-col :span="6" style="text-align: right;">
                            <a class="fogPass" href="/forgetPassword" target="_blank">
                                <el-button type="text">忘记密码？</el-button>
                            </a>
                        </el-col>
                    </el-row>
                </el-form-item>
                <el-row>
                    <el-col :span="24">
                        <el-button ref="button" type="primary" size="large" style="width: 100%;height: 45px;" @click="login">登录</el-button>
                    </el-col>
                </el-row>
            </el-form>
        </div>
    </div>
</template>

<script>
export default {
    name: 'SyLogin',
    props: {
        action: {
            type: String,
            default: ''
        },
        callback: Function
    },
    data() {
        return {
            loginForm: {
                username: '',
                password: '',
                errorMsg: '',
                remPass: false
            },
            loginFormRules: {
                username: [{
                    trigger: 'change',
                    validator: (rule, value, callback) => {
                        value = this.$trim(value);
                        if (!value || value.length <= 0) {
                            callback(new Error('请输入账号'));
                            return;
                        }
                        callback();
                    }
                }],
                password: [{
                    trigger: 'change',
                    validator: (rule, value, callback) => {
                        value = this.$trim(value);
                        if (!value || value.length <= 0) {
                            callback(new Error('请输入密码'));
                            return;
                        }
                        callback();
                    }
                }],
                errorMsg: [{
                    trigger: 'change',
                    validator: (rule, value, callback) => {
                        if (value) {
                            callback(new Error(value));
                            return;
                        }
                        callback();
                    }
                }]
            }
        }
    },
    mounted() {
		let _ = JSON.parse(localStorage.getItem("rempass"));
		if (_) {
			if (_.rempass) {
				this.loginForm.remPass = true;
				this.loginForm.username = _._;
				this.loginForm.password = _.__;
			} else {
				localStorage.removeItem("rempass");
			}
		}
    	setTimeout(() => {
           $(this.$refs.username.$refs.input).trigger('focus');
    	}, 400);
    },
    methods: {
        inputChange() {
            this.loginForm.errorMsg = '';
            this.$refs.loginForm.validateField('errorMsg');
        },
        ifocus(e) {
            let _c = $(this.$refs.button.$el).css('background-color');
            $(e.target).prev('.el-input-group__prepend').css('border-color', _c).find('.fa').css('color', _c);
        },
        iblur(e) {
            $(e.target).prev('.el-input-group__prepend').removeAttr('style').find('.fa').removeAttr('style');
        },
        removeRempass() {
            if (!this.loginForm.remPass) {
                localStorage.removeItem("rempass");
            }
        },
    	next(_ref, _thisref) {
    		// 账号、mima都不为空，则直接提交表单
    		if (this.loginForm.username.length > 0 && this.loginForm.password.length > 0) {
    			let $vm = this.$refs.button;
    			$vm.$el.focus();
    			$vm.$emit('click');
    			return false;
    		}
    		if (_thisref && this.loginForm[_thisref].length <= 0) {
				return false;
    		}
    		let $vm = this.$refs[_ref];
    		if ($vm.$options._componentTag == 'el-input') {
    			$vm.$refs.input.focus();
    		} else {
    			$vm.$el.focus();
    			$vm.$emit('click');
    		}
    	},
        login() {
            this.$refs.loginForm.validate((valid) => {
                if (!valid || !this.action || this.action.length == 0) {
                    return valid;
                }
                $.post(this.action, this.loginForm, (res, textStatus, xhr) => {
                    if (res.status && res.status == 200) {
                    	if (this.loginForm.remPass) {
			        		localStorage.setItem("rempass", JSON.stringify({
			        			"rempass": this.loginForm.remPass,
			        			"_": this.loginForm.username,
			        			"__": this.loginForm.password
			        		}))
			        	} else {
			        		localStorage.removeItem("rempass");
			        	}
                        sessionStorage.setItem('user', JSON.stringify(res));
                        
                        if (typeof this.callback === 'function') {
                            this.callback(res, this);
                        }
                    } else {
                        this.loginForm.errorMsg = res.message;
                        this.$refs.loginForm.validate();
                    }
                }, 'json');
            });
        }
    }
};
</script>

<style scoped>
.sy-login-panel {
    min-width: 310px;
    padding: 30px;
    -moz-border-radius: 3px;
    -webkit-border-radius: 3px;
    border-radius: 3px;
    box-shadow: 0 0 5px #333;
}

.sy-login-panel .sy-login-panel-header {
    font-size: 22px;
    line-height: 30px;
}

.sy-login-panel .sy-login-panel-cont {
    margin: 20px auto 0;
}

.sy-login-panel .sy-login-panel-cont .fa-user,
.sy-login-panel .sy-login-panel-cont .fa-lock {
    width: 21px;
    text-align: center;
    font-size: 22px;
}

.sy-login-panel .sy-login-panel-cont .el-form-item {
    margin-bottom: 22px;
}

.sy-login-panel .sy-login-panel-cont .el-form-item.sy-login-errormsg {
    margin-bottom: 0px;
    -webkit-transform: all .5s;
    transform: all .5s;
}

.sy-login-panel .sy-login-panel-cont .el-form-item.sy-login-errormsg.is-error {
    margin-bottom: 18px;
    -webkit-transform: all .5s;
    transform: all .5s;
}
</style>
