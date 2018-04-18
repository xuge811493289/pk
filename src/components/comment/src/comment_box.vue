<template>
    <div>
        <div class="sy-comment-header">
            <el-row style="padding: 8px 5px;height: 46px">
                <el-col :span="1" style="height: 30px">
                    <span class="sy-comment-comTitle" style="font-weight:700;">评论</span>
                </el-col>
                <el-col :span="8">
                    <span class="sy-comment-warn" style="">文明上网 理性发言</span>
                </el-col>
                <el-col :span="6" :offset="9" style="" class="sy-comment-total">{{commentTotal}}条评论</el-col>
            </el-row>
        </div>
        <div class="sy-comment-edit">
            <div contentEditable="true" class="sy-comment-editBox" ref="emojiCom"></div>
            <div class="sy-comment-isLogin" style="">
                <div class="sy-comment-userInfo" v-if="logined">
                    <img class="sy-comment-userAvatar" :src="loginUserAvatar" alt="">
                    <span class="sy-comment-userName" style="padding-left: 10px;line-height: 40px;">{{loginUserName}}</span>
                </div>
                <div class="sy-comment-media" v-if="logined">
                    <div class="sy-comment-comEmoji" @mouseenter="emojiStatus = true" @mouseleave="emojiStatus = false">
                        <i class="fa fa-smile-o" style="font-size: 22px;line-height: 40px; vertical-align:0px"></i>
                        <span class="sy-comment-media_text" style="">表情</span>
                        <sy-emoji :is-show="emojiStatus" @emoji-change="chooseEmoji" style=""></sy-emoji>
                    </div>
                </div>
                <el-button type="primary" :class="[buttonSize === 'large' ? '' : buttonSize === 'middle' ? 'marginTop-2' : 'marginTop-5']" :size="buttonSize" style="float: right;" v-if="logined" @click="submitComment" :loading="loading">发表评论</el-button>
                <el-button type="primary" :class="[buttonSize === 'large' ? '' : buttonSize === 'middle' ? 'marginTop-2' : 'marginTop-5']" :size="buttonSize" style="float: right;" v-else @click="userLogin">登录</el-button>
            </div>
        </div>
    </div>
</template>

<script type="text/ecmascript-6">
import { addComment } from './javaScripts/request'
import DialogLogin from '../../../commonPage/login/src/DialogLogin.vue'
import SyEmoji from './emoji.vue'
import moment from 'moment'
moment.locale('zh-cn')

export default {
    name: 'CommentBox',
    components: {
        SyEmoji
    },
    data() {
        return {
            emojiStatus: false,
            loading: false
        }
    },
    props: {
        prop: {
            type: Object,
            default() {
                return {
                    appCode: '',
                    subjectId: '',
                    subjectName: '',
                    subjectTypeId: ''
                }
            }
        },
        commentTotal: {
            type: Number,
            default: 0
        },
        logined: {
            type: Boolean,
            default: false
        },
        loginUserAvatar: {
            type: String,
            default: ''
        },
        loginUserName: {
            type: String,
            dafault: '',
        },
        status: {
            type: Number,
            default: 1
        },
        buttonSize: {
            type: String,
            default: 'small'
        }
    },
    created() {
    },
    computed: {

    },
    methods: {
        //  userLogin
        userLogin() {
            let h = this.$createElement;
            this.$msgbox({
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
        },

        //  选取表情
        chooseEmoji(options) {
            let img = document.createElement('img')
            img.src = options.imgUrl
            img.alt = options.tplName
            img.style.verticalAlign = -6 + 'px'
            this.$refs.emojiCom.appendChild(img)
        },

        //  发表评论
        submitComment() {
            if (this.$refs.emojiCom.innerHTML !== '') {
                if (this.$refs.emojiCom.innerHTML.length > 2000) {
                    this.$notify({
                        title: '提示',
                        message: '评论内容不能超过2000个字符！',
                        type: 'info'
                    })
                } else {
                    this.loading = true
                    this._addComment({
                        app: this.prop.appCode,
                        subjectId: this.prop.subjectId,
                        subjectName: this.prop.subjectName,
                        content: this.$refs.emojiCom.innerHTML.replace(/<[^img][^>]+>/g, ""),
                        status: this.status,
                        subjectTypeId: this.prop.subjectTypeId
                    })
                }
            } else {
                this.$notify({
                    title: '提示',
                    message: '评论内容不能为空！',
                    type: 'info'
                })
            }
        },

        //  提交评论
        _addComment(param) {
            addComment(param).then((res) => {
                if (res.status === 200) {
                    if (param.status === 1) {
                        this.$notify({
                            title: '成功',
                            message: '提交成功！',
                            type: 'success'
                        })
                        this.$emit('comment-add', {
                            id: res.data.id,
                            date: moment(res.data.datetime).startOf('minute').fromNow(),
                            content: res.data.content
                        })
                    } else {
                        this.$notify({
                            title: '成功',
                            message: '提交成功，等待审核中！',
                            type: 'success'
                        })
                    }
                    this.loading = false
                    this.$refs.emojiCom.innerHTML = ''
                } else {
                    this.$notify({
                        title: '提示',
                        message: '提交失败！',
                        type: 'info'
                    })
                    this.loading = false
                }
            })
        },
    }
}
</script>

<style scoped>
.sy-comment-isLogin {
    position: relative;
    box-sizing: border-box;
    height: 52px;
    border-top: 1px solid #BFCBD9;
    padding: 6px 10px;
}

.sy-comment-userInfo {
    overflow: hidden;
    float: left;
}

.sy-comment-userAvatar {
    float: left;
    height: 40px;
    width: 40px;
    border-radius: 50%;
}

.sy-comment-total {
    height: 30px;
    font-size: 12px;
    color: #C4C3C2;
    display: inline-block;
    line-height: 30px;
    text-align: right
}

.sy-comment-warn {
    font-size: 12px;
    height: 30px;
    color: #C4C3C2;
    display: inline-block;
    line-height: 30px;
    padding-left: 5px;
}

.sy-comment-comTitle {
    font-size: 16px;
    /* font-weight: 700; */
    color: #2D96E9;
    height: 30px;
    line-height: 30px;
    display: inline-block;
}

.sy-comment-media {
    padding-left: 15px;
    float: left;
    color: #E2E2E2;
    overflow: hidden;
}

.sy-comment-media .sy-comment-comEmoji,
.sy-comment-comPic {
    float: left;
}

.sy-comment-media_text {
    display: inline-block;
    font-size: 14px;
    line-height: 40px;
    padding-left: 5px;
    vertical-align: 3px;
}

.sy-comment-userName {
    color: #6BB0EF;
    line-height: 20px;
    font-size: 14px;
}

.sy-comment-editBox {
    background: #fff;
    height: 120px;
    padding: 10px;
    overflow: auto;
    border-radius: 5px;
    border-line: none;
    text-align: left;
}

.sy-comment-edit {
    border-radius: 5px;
    box-sizing: border-box;
    border: 1px solid #BFCBD9;
    font-size: 14px;
    line-height: 26px;
}

.marginTop-2 {
    margin-top: 2px;
}

.marginTop-5 {
    margin-top: 5px;
}
</style>
