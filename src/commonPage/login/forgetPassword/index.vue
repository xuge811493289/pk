<template>
  <div class="sy_body" v-loading="loding" element-loading-text="请稍候...">
    <div class="sy_top">
      <div class="sy_container">
        <a href="http://www.shiyuesoft.com/po/toCompanyIndex.action"><img src="/common/images/password/logo.png" alt=""></a>
        <a>&nbsp找回密码</a>
      </div>
    </div>
    <div class="sy_main">
      <div class="sy_container">
        <div class="sy_step">
          <div class="sy_line"></div>
          <ul>
            <li :class="css_active1">
              <div class=" sy_step1">
                <i class="num">1</i>
                <div class="sy_line"></div>
                <span>输入账号</span>
              </div>
            </li>
            <li :class="css_active2">
              <div class=" sy_step2">
                <i class="num">2</i>
                <div class="sy_line"></div>
                <span>选择找回方式</span>
              </div>
            </li>
            <li :class="css_active3">
              <div class=" sy_step3">
                <i class="num">3</i>
                <div class="sy_line"></div>
                <span>进行安全验证</span>
              </div>
            </li>
            <li :class="css_active4">
              <div class=" sy_step4">
                <i class="num">4</i>
                <div class="sy_line"></div>
                <span>设置新密码</span>
              </div>
            </li>
          </ul>
          <div class="sy_step_cont">
            <div class="sy_step_pane">
              <div class="info" v-if="step1">
                <form action="">
                  <div class="div_input">
                    <i class="sy_icon user"></i>
                    <input v-model.trim="userInput" type="text" placeholder="请输入账号" @blur="checkUserId()">
                    <p v-if="userIsWrong" class="check">{{check_user}}</p>
                  </div>
                  <div class="div_input">
                    <i class="sy_icon vcode"></i>
                    <input v-model.trim="yanzhengma" type="text" placeholder="验证码（不区分大小写）" class="code_word" @blur="checkvCode()">
                    <el-button type="text" @click="refresh" class="code"><img :src="yanzhengImg" alt=""></el-button>
                    <i class="sy_icon icon7" @click="refresh"></i>
                    <p v-if="vcodeIsWrong" class="check">{{check_vcode}}</p>
                  </div>
                  <input type="button" class="btn next" @click="next1" value="下一步">
                </form>
              </div>
            </div>
            <div class="sy_step_pane">
              <ul class="sy_step2_cont btn" v-if="step2_correct" style="width:100%; text-align: center">
                <li v-if="step2_email" style="float:none; display:inline-block; list-style: none; width:300px" @click="handleClick_email"><a><i class="sy_icon icon2"></i>通过邮箱地址</a></li>
                <li v-if="step2_question" style="float:none; display:inline-block; list-style: none; width:300px" @click="answerQuestion"><a><i class="sy_icon icon2"></i>通过密码提示问题</a></li>
                <li v-if="step2_message" style="float:none; display:inline-block; list-style: none; width:300px" @click="handleClick_message"><a><i class="sy_icon icon2"></i>通过短信</a></li>
              </ul>
              <div class="error" v-if="step2_wrong">
                <i class="sy_icon icon3"></i>
                <div>
                  <p>对不起，您没有预留邮箱、密保问题及手机号码，无法找回密码。</p>
                  <p>请联系管理员修改密码！<el-button type="text" @click="toLogin" style="color: #00A0E9; font-size: 16px">返回</el-button></p>
                </div>
              </div>
            </div>
            <div class="sy_step_pane">
              <div class="email" v-if="step3_email">
                <div class="email_success" style="position:relative; top:-200px">
                  <i v-if="eSuccess" class="sy_icon icon4"></i>
                  <i v-else class="sy_icon msgError"></i>
                  <div>
                    <p>{{emailData}}</p>
                    <p v-if="eSuccess">请注意查收邮件</p>
                    <p><input class="resendEmail" type="button" @click.stop="handleClick_email" :value="eResendValue" :style="eResendStyle" /> </p>
                  </div>
                  <div>
                    <input v-model.trim="vcodeInput" type="text" placeholder="请输入四位邮件验证码" class="email_input" style="padding-left: 20px">
                    <p v-if="vcode_IsWrong" class="check" style="margin-left: -230px">{{check__vcode}}</p>
                    <p><input type="button" class="btn back" value="返回" @click="backTo2"><input type="button" class="btn next" @click="newPassword('e')" value="下一步" style="width:250px"></p>
                  </div>
                </div>
              </div>
              <div class="encrypted" v-if="step3_question" style="position:relative; top:-200px">
                <form action="">
                  <ul>
                    <li>问题：<span>{{questionData}}</span></li>
                    <li><input v-model.trim="questionInput" type="text" style="padding-left: 20px"></li>
                    <p v-if="answerIsWrong" class="check" style="margin-left: -230px">{{check_answer}}</p>
                    <li><input type="button" class="btn back" value="返回" @click="backTo2"><input type="button" class="btn next" @click="newPassword('q')" value="下一步" style="width:250px"></li>
                  </ul>
                </form>
              </div>
              <div class="email" v-if="step3_message">
                <div class="email_success" style="position:relative; top:-200px">
                  <i v-if="mSuccess" class="sy_icon icon4"></i>
                  <i v-else class="sy_icon msgError"></i>
                  <div>
                    <p>{{messageData}}</p>
                    <p v-if="mSuccess">请注意查收短信</p>
                    <p><input class="resendEmail" type="button" @click.stop="handleClick_message" :value="mResendValue" :style="mResendStyle" /> </p>
                  </div>
                  <div>
                    <input v-model.trim="vcodeInput" type="text" placeholder="请输入六位短信验证码" class="email_input" style="padding-left: 20px">
                    <p v-if="vcode_IsWrong" class="check" style="margin-left: -230px">{{check__vcode}}</p>
                    <p><input type="button" class="btn back" value="返回" @click="backTo2"><input type="button" class="btn next" @click="newPassword('m')" value="下一步" style="width:250px"></p>
                  </div>
                </div>
              </div>
            </div>
            <div class="sy_step_pane">
              <div class="reset_passWord" v-if="step4" style="position:relative; top:-300px">
                <form action="">
                  <div class="div_input">
                    <i class="sy_icon icon5"></i>
                    <input type="password" v-model.trim="newPassword1" placeholder="设置新密码" @blur="checkPassword1" style="padding-left: 32px">
                    <p v-if="password1IsWrong" class="check" style="margin-left: -200px">{{check_password1}}</p>
                  </div>
                  <div class="div_input">
                    <i class="sy_icon icon5"></i>
                    <input type="password" v-model.trim="newPassword2" placeholder="确认新密码" @blur="checkPassword2" style="padding-left: 32px">
                    <p v-if="password2IsWrong" class="check" style="margin-left: -200px">{{check_password2}}</p>
                  </div>
                  <input type="button" class="btn next" value="下一步" @click="toFinalStep">
                </form>
              </div>
              <div class="success" v-if="step5" style="position:relative; top:-300px">
                <p><i class="sy_icon icon6"></i>您已成功设置密码，请使用新密码 <a class="login" @click="toLogin">登录</a>！</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="sy_foot">
      <div class="sy_container"><a href="http://www.shiyuesoft.com">版权所有：上海师悦信息科技有限公司</a></div>
    </div>
  </div>
</template>
<script>
  import config from './config.js';
  export default{
    name:"forgetPassword",
    data(){
      return{
        loding:false,
        eSuccess:true,
        mSuccess:true,
        qSuccess:true,
        css_active1:"sy_active",
        css_active2:"",
        css_active3:"",
        css_active4:"",
        type:"",
        loginName:"",
        vCode:"",
        eCountdown:60,
        mCountdown:60,
        eCountdownStop:true,
        mCountdownStop:true,
        step1:true,
        step2_correct:false,
        step2_wrong:false,
        step2_email:false,
        step2_question:false,
        step2_message:false,
        step3_email:false,
        step3_question:false,
        step3_message:false,
        step4:false,
        step5:false,
        userInput:"",
        yanzhengma:"",
        yanzhengImg:"",
        userIsWrong:false,
        check_user:"",
        vcodeIsWrong:false,
        check_vcode:"",
        isvisible_email:true,
        isvisible_message:true,
        isvisible_question:true,
        emailData:"",
        messageData:"",
        questionData:"",
        eResendValue:"",
        mResendValue:"",
        eResendStyle:{
          color:"#bfcbd9",
          cursor:"default",
          disabled:"false"
        },
        mResendStyle:{
          color:"#bfcbd9",
          cursor:"default",
          disabled:"false"
        },
        questionInput:"",
        vcodeInput:"",
        question:"",
        _vCode:"",
        answerIsWrong:false,
        vcode_IsWrong:false,
        check_answer:"",
        check__vcode:"",
        newPassword1:"",
        newPassword2:"",
        password1IsWrong:false,
        password2IsWrong:false,
        check_password1:"",
        check_password2:"",
      }
    },
    created(){
      this.yanzhengImg=window.ShiYue.base+'api/uaa/oauth/forget/getvcode';

    },
    mounted(){
      $(function () {
        //四个步骤条
        $(".sy_step>ul>li").width($(".sy_step>ul").width() / $(".sy_step>ul>li").length);
        $(".sy_step2_cont>li").click(function () {
          $(this).addClass("active");
          $(this).siblings("li").removeClass("active");

          $(".sy_step_pane:nth-child(3)").show();
          $(".sy_step>ul>li:nth-child(2)").addClass("sy_active");
          $(".email").show();
          $(".encrypted").show();
          $(".error").show();

          $(".sy_step_pane:nth-child(2)").show();
          $(".reset_passWord").show();

          $(".sy_step_pane:nth-child(4)").show();
          $(".reset_passWord").show();
          $(".success").show();
        });
      });
    },
    methods:{
      refresh(){
        this.yanzhengImg+='?time='+new Date().getTime()
      },
      checkUserId(){
        this.userIsWrong=false;
        if(!this.userInput||this.userInput.length<1) {
          this.userIsWrong=true;
          this.check_user="用户名不能为空！"
        }else{
          // config.findUser(this.userInput).then((data)=>{
          //   if(!data){
          //     this.userIsWrong=true;
          //     this.check_user="用户名不存在！"
          //   }
          // })
        }
      },
      checkvCode(){
        this.vcodeIsWrong=false;
        if(!this.yanzhengma||this.yanzhengma.length<1) {
          this.vcodeIsWrong=true;
          this.check_vcode="验证码不能为空！"
        }
      },
      next1(){
        if(this.userInput&&this.userInput.length>0){
          this.userIsWrong=false;
          if(this.yanzhengma&&this.yanzhengma.length>0){
            this.vcodeIsWrong=false;
            this.loading=true;
            config.checkVcode(this.yanzhengma).then((data)=>{
              if(data&&data.data){
                if(data.data=="failure"){
                  this.loding=false;
                  this.vcodeIsWrong=true;
                  this.check_vcode="验证码错误！"
                  this.refresh();
                }else{
                  this.vcodeIsWrong=false;
                  config.checkUser({loginname:this.userInput}).then((data)=>{
                    if(data){
                      if(data.data){
                        this.loginName=this.userInput;
                        this.userIsWrong=false;
                        this.step1=false;
                        if(!data.data.email&&!data.data.question&&!data.data.phone){
                          this.loding=false;
                          this.step2_wrong=true;
                          this.css_active1="";
                          this.css_active2="sy_active";
                          return;
                        }
                        this.loding=false;
                        this.step2_correct=true;
                        this.step2_email=data.data.email;
                        this.isvisible_email=data.data.email;
                        this.step2_question=data.data.question;
                        this.isvisible_question=data.data.question;
                        this.step2_message=data.data.phone;
                        this.isvisible_message=data.data.phone;
                        this.css_active1="";
                        this.css_active2="sy_active";
                      }else{
                        this.loding=false;
                        this.userIsWrong=true;
                        this.check_user="用户名不存在！"
                      }
                    }
                  })
                }
              }
            })
          }else{
            this.vcodeIsWrong=true;
            this.check_vcode="验证码不能为空！"
          }
        }else{
          this.userIsWrong=true;
          this.check_user="用户名不能为空！"
        }
      },
      handleClick_email(){
        this.loding=true;
        config.selectWay({
          way:"mail",
          loginname:this.loginName
        }).then((data)=>{
          this.loding=false;
          if(data&&data.data){
            this.step2_correct=false;
            this.step2_email=false;
            this.step2_question=false;
            this.step2_message=false;
            this.step3_email=true;
            this.css_active2="";
            this.css_active3="sy_active";
            this.eSuccess=data.data.result=="success"?true:false;
//            this.countdownStop=false;
            if(this.eSuccess) {
              this.eCountdownStop=true;
              this.emailData=data.data.message;
              this.$notify.success({
                title: '成功',
                message: '邮件已发送！'
              });
              this.eCountdown = 60;
              this.sendEmail("e");
            }else{
              this.emailData=data.data.message;
            }
          }
        })

      },
      handleClick_message(){
        this.loding=true;
        config.selectWay({
          way:"sms",
          loginname:this.loginName
        }).then((data)=> {
          this.loding=false;
          if(data&&data.data){
            this.step2_correct = false;
            this.step2_email = false;
            this.step2_question = false;
            this.step2_message = false;
            this.step3_message = true;
            this.css_active2="";
            this.css_active3="sy_active";
            this.mSuccess=data.data.result=="success"?true:false;
//            this.countdownStop = false;
            if(this.mSuccess){
              this.mCountdownStop=true;
              this.messageData=data.data.message;
              this.$notify.success({
                title: '成功',
                message: '短信已发送！'
              });
              this.mCountdown = 60;
              this.sendEmail("m");
            }else{
              this.messageData=data.data.message;
            }
          }
        })
      },
      sendEmail(type) {
        if (this.eCountdown == 0 || this.mCountdown == 0) {
          if(type=='e'){
            this.eResendStyle={
              color:"#00A0E9",
              cursor:"pointer",
              disabled:"disabled"
            }
            this.eResendValue="重新发送邮件";
            this.eCountdownStop = true;
            this.eCountdown = 60;
            return;
          }
          else{
            this.mResendStyle={
              color:"#00A0E9",
              cursor:"pointer",
              disabled:"disabled"
            }
            this.mResendValue="重新发送短信";
            this.mCountdownStop = true;
            this.mCountdown = 60;
            return;
          }

        } else {
//          if(this.countdownStop) return;
          if(type=='e'){
            this.eResendStyle={
              color:"#bfcbd9",
              cursor:"default",
              disabled:"false"
            }
            this.eResendValue="重新发送邮件(" + this.eCountdown + ")";
            this.eCountdownStop = false;
            this.eCountdown--;
          }
          else{
            this.mResendStyle={
              color:"#bfcbd9",
              cursor:"default",
              disabled:"false"
            }
            this.mResendValue="重新发送短信(" + this.mCountdown + ")";
            this.mCountdownStop = false;
            this.mCountdown--;
          }
          this.cd(type);
        }
      },
      cd(type){
        setTimeout(()=>{
          this.sendEmail(type)
        },1000)
      },
      answerQuestion(){
        this.loding=true;
        config.selectWay({
          way:"encrypt",
          loginname:this.loginName
        }).then((data)=> {
          this.loding=false;
          if(data&&data.data){
            this.questionData=data.data.message;
            this.step2_correct = false;
            this.step2_email = false;
            this.step2_question = false;
            this.step2_message = false;
            this.step3_question = true;
            this.css_active2="";
            this.css_active3="sy_active";
          }
        })
      },
      backTo2(){
        this.step2_correct=true;
        this.step2_email=this.isvisible_email;
        this.step2_question=this.isvisible_question;
        this.step2_message=this.isvisible_message;
        this.step3_email=false;
        this.step3_question=false;
        this.step3_message=false;
//        this.countdownStop=true;
        this.answerIsWrong=false;
        this.vcode_IsWrong=false;
        this.questionInput="";
        this.vcodeInput="";
        this.css_active3="";
        this.css_active2="sy_active";
      },
      newPassword(type){
        this.type=type;
        this.answerIsWrong=false;
        this.vcode_IsWrong=false;
        if(type=="q"){
          if(this.questionInput.length==0){
            this.answerIsWrong=true;
            this.check_answer="答案不能为空！";
            return;
          }
          this.question=this.questionInput;
          this.loding=true;
          config.checkQuestion({
            answer:this.question,
            loginname:this.loginName
          }).then((data)=>{
            this.loding=false;
            if(data&&data.data){
              if(data.data=="failure"){
                this.answerIsWrong=true;
                this.check_answer="答案错误！请重新输入";
              }else{
                this.step3_question=false;
                this.step4=true;
                this.css_active3="";
                this.css_active4="sy_active";
              }
            }
          })
        }else{
          if(this.vcodeInput.length==0){
            this.vcode_IsWrong=true;
            this.check__vcode="验证码不能为空！";
            return;
          }
          this._vCode=this.vcodeInput;
          this.loding=true;
          config.check_Vcode({
            way:type=="e"?"mail":"sms",
            vcode:this._vCode,
            loginname:this.loginName
          }).then((data)=>{
            this.loding=false;
            if(data&&data.data){
              if(data.data=="failure"){
                this.vcode_IsWrong=true;
                this.check__vcode="验证码错误！请重新输入";
              }else{
                this.step3_email=false;
                this.step3_message=false;
                this.step4=true;
                this.css_active3="";
                this.css_active4="sy_active";
              }
            }
          })
        }

      },
      checkPassword1(){
        this.password1IsWrong=false;
        if(this.newPassword1.length<1){
          this.password1IsWrong=true;
          this.check_password1="密码不能为空！";
          return false;
        }else{
          if(this.newPassword1.length<8||this.newPassword1.length>16){
            this.password1IsWrong=true;
            this.check_password1="长度在8~16位之间！";
            return false;
          }else{
            if(!(/^[a-zA-Z0-9_]+$/.test(this.newPassword1))){
              this.password1IsWrong=true;
              this.check_password1="只能输入字母、数字、下划线！";
              return false;
            }else{
              return true;
            }
          }
        }
      },
      checkPassword2(){
        this.password2IsWrong=false;
        if(this.newPassword1!=this.newPassword2){
          this.password2IsWrong=true;
          this.check_password2="前后密码不一致！";
          return false;
        }else{
          if(this.newPassword2.length<1){
            this.password2IsWrong=true;
            this.check_password2="密码不能为空！";
            return false;
          }else{
            if(this.newPassword2.length<8||this.newPassword2.length>16){
              this.password2IsWrong=true;
              this.check_password2="长度在8~16位之间！";
              return false;
            }else{
              if(!(/^[a-zA-Z0-9_]+$/.test(this.newPassword2))){
                this.password2IsWrong=true;
                this.check_password2="只能输入字母、数字、下划线！";
                return false;
              }else{
                return true;
              }
            }
          }
        }
      },
      toFinalStep(){
        if(this.checkPassword1()&&this.checkPassword2()){
          this.loading=true;
          if(this.type=="q"){
            config.newPassword_question({
              answer:this.question,
              loginname:this.loginName,
              password:this.newPassword1
            }).then(()=>{
              this.loding=false;
              this.step4=false;
              this.step5=true;
            })
          }else{
            config.newPassword_vcode({
              way:this.type=="e"?"mail":"sms",
              vcode:this._vCode,
              loginname:this.loginName,
              password:this.newPassword1
            }).then(()=>{
              this.loding=false;
              this.step4=false;
              this.step5=true;
            })
          }
        }
      },
      toLogin(){
        this.$router.push({path: '/login'});
      }
    }
  }
</script>
<style scoped>
  div, img, input, ul, li, p {
    padding: 0;
    margin: 0
  }

  html {
    height: 100%;
  }

  .sy_body {
    padding: 0;
    margin: 0;
    font-family: "微软雅黑";
    font-size: 16px;
    background: #F9F9F9;
    color: #666666;
    position: relative;
    min-height: 100%;
  }

  input[checked] {
    vertical-align: middle;
  }

  a {
    color: #666;
    text-decoration: none;
  }

  ul {
    list-style: none;
  }

  input {
    line-height: 40px;
    height: 40px;
    width: 330px;
  }

  .check{
    font-size: 12px;
    color: #ff4949;
    margin-left: 5px;
  }

  .btn {
    cursor:pointer;
  }

  .sy_icon {
    display: inline-block;
    vertical-align: middle;
    cursor: default;
    margin-right: 20px;
  }

  .icon2 {
    background: url("/common/images/password/icon2.png") no-repeat;
    width: 38px;
    height: 54px;
  }

  .icon3 {
    background: url("/common/images/password/icon3.png") no-repeat;
    width: 30px;
    height: 30px;
  }

  .icon4 {
    background: url("/common/images/password/icon4.png") no-repeat;
    width: 56px;
    height: 37px;
  }

  .icon5 {
    background: url("/common/images/password/icon5.png") no-repeat;
    width: 15px;
    height: 17px;
  }

  .icon5 {
    background: url("/common/images/password/icon5.png") no-repeat;
    width: 15px;
    height: 17px;
  }

  .icon6 {
    background: url("/common/images/password/icon6.png") no-repeat;
    width: 29px;
    height: 29px;
  }

  .icon7 {
    background: url("/common/images/password/icon7.png") no-repeat;
    width: 25px;
    height: 25px;
    cursor: pointer;
  }

  .user {
    background: url("/common/images/password/user.png") no-repeat;
    width: 14px;
    height: 16px;
    position: absolute;
    left: 12px;
    top: 14px;
  }

  .vcode{
    background: url("/common/images/password/vcode.png") no-repeat;
    width: 14px;
    height: 16px;
    position: absolute;
    left: 12px;
    top: 14px;
  }

  .msgError {
    background: url("/common/images/password/msgError.png") no-repeat;
    width: 56px;
    height: 37px;
  }

  .sy_container {
    width: 1200px;
    margin: 0 auto;
  }

  .sy_top {
    height: 67px;
    line-height: 67px;
    background: #FFFFFF;
    -webkit-box-shadow: 0 3px 5px #DDDDDD;
    -moz-box-shadow: 0 3px 5px #DDDDDD;
    box-shadow: 0 3px 5px #DDDDDD;
  }

  .sy_top a:first-child {
    color: transparent;
  }

  .sy_top img {
    vertical-align: middle;
  }

  .sy_top span {
    font-size: 14px;
    padding-left: 14px;
  }

  .sy_foot {
    position: absolute;
    left: 0;
    top: 100%;
    width: 100%;
    line-height: 36px;
    height: 36px;
    text-align: center;
    margin-top: -36px;
  }

  .sy_main {
    width: 100%;
    overflow: hidden;
  }

  .sy_main .sy_container {
    background: #fff;
    position: relative;
    margin: 50px auto;
  }

  .sy_step {
    padding: 100px 50px 50px;
  }

  .sy_step > ul:after {
    content: ".";
    clear: both;
    display: block;
    height: 0;
    overflow: hidden;
    visibility: hidden;
  }

  .sy_step > ul > li {
    float: left;
    position: relative;
  }

  .sy_step > ul > li > div {
    text-align: center;
  }

  .sy_step > ul > li > div > span {
    line-height: 70px;
  }

  .sy_line {
    width: 100%;
    height: 8px;
    background: -webkit-linear-gradient(#A5A5A5, #C7C7C7);
    background: -o-linear-gradient(#A5A5A5, #C7C7C7);
    background: -moz-linear-gradient(#A5A5A5, #C7C7C7);
    background: linear-gradient(#A5A5A5, #C7C7C7);
    border-radius: 4px;
    -moz-border-radius: 4px;
    -webkit-border-radius: 4px;
  }

  .sy_step > ul > li .sy_line {
    position: absolute;
    top: -8px;
  }

  .num {
    position: absolute;
    left: 0;
    right: 0;
    margin: 0 auto;
    background: url("/common/images/password/icon1.png") no-repeat;
    width: 38px;
    height: 38px;
    line-height: 38px;
    text-align: center;
    color: #fff;
    font-style: normal;
    top: -22px;
    z-index: 10;
  }

  .sy_active .sy_line {
    background: #00A0E9;
  }

  .sy_active .num {
    background: #00A0E9;
    -moz-border-radius: 50px;
    -webkit-border-radius: 50px;
    border-radius: 50px;
  }

  .sy_active ._span {
    color: #00A0E9;
  }

  .sy_step_cont {
    width: 100%;
    height: 318px;
  }

  .sy_step_pane {
    padding: 50px 0;
    text-align: center;
  }

  .sy_step_pane + .sy_step_pane {
    /*display: none;*/
  }

  /*输入账号*/
  .info {
    width: 396px;
    margin: 0 auto;
    text-align: left;
  }

  .code_word {
    width: 214px;
    padding-right: 115px;
  }

  .code {
    position: absolute;
    right: 68px;
    top: 6px;
    padding:0;
    display: inline-block;
    width: 98px;
    height: 32px;
  }

  .code img {
    width: 100%;
    height: 100%;
  }

  /*选择找回方式*/
  .sy_step2_cont {
    overflow: hidden;
  }

  .sy_step2_cont li {
    float: left;
    text-align: center;
  }

  .sy_step2_cont li.active .icon2,
  .sy_step2_cont li:hover .icon2 {
    background: url("/common/images/password/icon2_hov.png") no-repeat;
  }

  .sy_step2_cont li.active a, .sy_step2_cont li:hover a {
    color: #00A0E9;
  }

  /*发送邮件成功和没有任何的找回密码方式*/
  .email, .error {
    /*display: none;*/
    text-align: center;
    color: #959595;
    line-height: 26px;
  }

  .email .sy_icon, .error .sy_icon {
    vertical-align: top;
  }

  .email .sy_icon + div, .error .sy_icon + div {
    display: inline-block;
    text-align: left;
  }

  .email .icon4 {
    vertical-align: super;
  }

  .back, .email_find, .login {
    color: #00A0E9;
    cursor: pointer;
  }

  .email_find {
    text-decoration: underline;
  }

  .resendEmail{
    width:130px;
    height:26px;
    border:0;
    line-height:26px;
    text-align: left;
    cursor:pointer;
    font-size: 16px;
    text-decoration: underline;
    color: #00A0E9;
    background-color: #fff;
  }

  .email_input{
    margin-top:20px;
  }

  /*进行安全验证，回答密保*/
  .encrypted {
    width: 350px;;
    margin: 0 auto;
    line-height: 30px;
    /*display: none;*/
  }

  .next {
    width: 335px;
    margin-top: 30px;
    border-radius: 5px;
    -moz-border-radius: 5px;
    -webkit-border-radius: 5px;
    background: #00A0E9;
    border: none;
    outline: none;
    color: #fff;
  }

  .back {
    width: 80px;
    margin-top: 30px;
    margin-right: 10px;
    border-radius: 5px;
    -moz-border-radius: 5px;
    -webkit-border-radius: 5px;
    background: #fff;
    border:1px solid;
    border-color: #959595;
    outline: none;
  }

  /*重置密码*/
  .reset_passWord {
    /*display: none;*/
    width: 335px;
    margin: 0 auto;
  }

  .div_input {
    margin: 20px 0;
    position: relative;
  }

  .div_input .icon5 {
    position: absolute;
    left: 10px;
    top: 12px
  }

  .div_input input[type=text] {
    text-indent: 36px;
  }

  /*重新设置密码成功*/
  .success {
    /*display: none;*/
    text-align: center;
  }
</style>
