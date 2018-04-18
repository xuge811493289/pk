<template>
    <div class="sy-comment-replyBox" v-if="replyShow">
        <div contentEditable="true" :placeholder="placeHolder" class="sy-comment-editBox" ref="contentBox"></div>
        <div class="sy-comment-isLogin">
            <div class="sy-commeny-reply_emoji" @mouseenter="emojiStatus = true" @mouseleave="emojiStatus = false">
                <i class="fa fa-smile-o" style="font-size: 22px;line-height: 40px;color: #E2E2E2"></i>
                <sy-emoji :is-show="emojiStatus" @emoji-change="chooseEmoji" style="left: 10px"></sy-emoji>
            </div>
            <el-button type="primary" v-if="options.loginUserId != ''" size="middle" style="float: right;margin-top: 5px" @click="submitReply" :loading="loading">回复</el-button>
            <el-button type="primary" v-else  size="middle" style="float: right;margin-top: 5px" @click="userLogin">登录</el-button>
        </div>
    </div>
</template>

<script type="text/ecmascript-6">
import SyEmoji from './emoji.vue'
import DialogLogin from '../../../commonPage/login/src/DialogLogin.vue'
import { addCommentReply, getUserInfoById } from './javaScripts/request'
import moment from 'moment'
import bus from './javaScripts/bus'
moment.locale('zh-cn')

export default {
    name: 'ReplyBox',
    components: {
        SyEmoji
    },
    data() {
        return {
            emojiStatus: false,
            replyShow: this.showReplyBox,
            loading: false,
            placeHolder: '',
        }
    },
    props: {
        options: {
            type: Object,
            default() {
                return {
                    commentId: '',
                    commentUserId: '',
                    commentUserName: '',
                    loginUserId: ''
                }
            }
        },
        showReplyBox: {
            type: Boolean,
            default: false
        },
        status: {
            type: Number,
        }
    },
    created() {
        this.placeHolder = `回复${this.options.commentUserName}：`
    },
    computed: {

    },
    watch: {
        showReplyBox(val) {
            console.log(val)
            this.replyShow = val
        }
    },
    methods: {
        //  用户登录
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
            img.style.verticalAlign = -6 + 'px'
            img.alt = options.tplName
            this.$refs.contentBox.appendChild(img)
        },

        //  提交回复
        submitReply() {
            if (this.options.loginUserId !== '') {
                let content = this.$refs.contentBox.innerHTML
                if (this.options.commentId !== '' && this.options.commentUserId !== '' && this.options.commentUserName !== '') {
                    if (content !== '') {
                        if (content.length <= 2000) {
                            this.loading = true
                            this._addCommentReply({
                                userId: this.options.commentUserId,
                                userName: this.options.commentUserName,
                                commentId: this.options.commentId,
                                content: content.replace(/<[^img][^>]+>/g, ""),
                                status: this.status
                            })
                        } else {
                            this.$notify({
                                title: '提示',
                                message: '回复内容长度不可超过2000个字符！',
                                type: 'info'
                            })
                        }
                    } else {
                        this.$notify({
                            title: '提示',
                            message: '回复内容不能为空！',
                            type: 'info'
                        })
                    }
                }
            } else {
                this.$notify({
                    title: '提示',
                    message: '请登录后再进行回复操作！',
                    type: 'info'
                })
                bus.$emit('reply-user-login')
            }
        },

        //  提交回复操作
        _addCommentReply(param) {
            getUserInfoById({
                id: param.userId,
            }).then((resUser) => {
                if (resUser && resUser.status === 200) {
                    addCommentReply({
                        toUserId: param.userId,
                        toUserName: param.userName,
                        toUserType: resUser.userType,
                        toUnitId: resUser.unitId,
                        commentId: param.commentId,
                        content: param.content,
                        status: param.status
                    }).then((resReply) => {
                        if (resReply && resReply.data && resReply.status === 200) {
                            if (param.status === 1) {
                                this.$notify({
                                    title: '提示',
                                    message: '操作成功！',
                                    type: 'success'
                                })
                                this.$emit('close')
                                bus.$emit('reply-add', {
                                    id: resReply.data.id,
                                    date: moment(resReply.data.datetime).startOf('minute').fromNow(),
                                    content: resReply.data.content,
                                    commentId: resReply.data.commentId,
                                    toUserId: resReply.data.toUserId,
                                    toUserName: resReply.data.toUserName
                                })
                            } else {
                                this.$notify({
                                    title: '提示',
                                    message: '操作成功，等待审核中！',
                                    type: 'success'
                                })
                                this.$emit('close')
                            }
                            this.loading = false
                        } else {
                            this.$notify({
                                title: '提示',
                                message: '操作失败！',
                                type: 'info'
                            })
                            this.loading = false
                        }
                    })
                }
            })
        },

    }
}
</script>

<style scoped>
.sy-comment-replyBox {
    margin-top: 10px;
    border-radius: 5px;
    box-sizing: border-box;
    border: 1px solid #BFCBD9;
    font-size: 14px;
    line-height: 26px;
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

.sy-comment-isLogin {
    position: relative;
    box-sizing: border-box;
    height: 45px;
    line-height: 45px;
    border-top: 1px solid #BFCBD9;
    padding: 0px 10px;
}

.sy-comment-redPoint {
    position: absolute;
    top: 16px;
    left: 25px;
    width: 5px;
    height: 5px;
    background: red;
    border-radius: 50%;
}

.sy-commeny-reply_emoji {
    float: left;
}

.sy-comment-editBox:empty:before {
    content: attr(placeholder);
    color: #ccc;
}

.sy-comment-editBox:focus:before {
    content: none;
}
.margin-top-5 {
    margin-top: 5px;
}
.margin-top-8 {
    margin-top: 8px;
}
.margin-top-halfPast3 {
    margin-top: 1.5px;
}
</style>
