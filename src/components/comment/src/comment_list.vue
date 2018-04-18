<template>
    <div class="sy-comment-list">
        <div class="sy-comment-avatar">
            <img :src="avatarUrl" alt="" style="width:100%;height:100%;border-radius:50%">
        </div>
        <div class="sy-comment-content">
            <div class="sy-comment-content_title">
                <span class="sy-comment-userName">{{prop.userName}}</span>
                <span class="sy-comment-time">{{prop.datetime}}</span>
            </div>
            <div class="sy-comment-content_con">
                <p style="word-wrap:break-word" v-html="prop.content"></p>
            </div>
            <div class="sy-comment-handle">
                <div class="sy-comment-good" @click="addCommentFabulous(prop.id, prop.zanType)" v-if="loginUserId != ''">
                    <i ref="addFabulous" class="fa fa-thumbs-up" :title="prop.zanType===1? '取消赞':'点个赞'" :class="{'beforeAdd' : prop.zanType === 2, 'afterAdd' : prop.zanType === 1}"></i>
                    <span ref="fabulousNum">({{prop.fabulous}})</span>
                </div>
                <div class="sy-comment-return" @click="showReplyBox" v-if="loginUserId != ''">
                    <i class="fa fa-reply" title="回复"></i>
                </div>
                <div class="sy-comment-showCom" v-if="prop.replys.length > 0">
                    <i class="fa fa-list-ul" title="查看回复" @click="showReply"></i>
                    <span style="">({{prop.replys.length}})</span>
                </div>
                <div class="sy-comment-del" v-if="prop.userId == loginUserId">
                    <i class="fa fa-trash" title="删除" @click="delCom(prop.id)"></i>
                </div>
            </div>
            <reply-list v-for="(item, replyIndex) in prop.replys" :key="replyIndex" :com-id="prop.id" :reply-list-status="replyListShow" :base-path="basePath" :prop="item" :login-id="loginUserId" @reply-del="replyDel" :status="status"></reply-list>
            <reply-box @close="replyBoxStatus = false" :show-reply-box="replyBoxStatus" :options="{commentId: prop.id, commentUserId: prop.userId, commentUserName: prop.userName, loginUserId: loginUserId}" :status="status"></reply-box>
        </div>
    </div>
</template>

<script type="text/ecmascript-6">
import ReplyBox from './reply_box.vue'
import ReplyList from './reply_list.vue'
import { updateCommentFabulous, delComment } from './javaScripts/request'
export default {
    name: 'CommentList',
    components: {
        ReplyBox,
        ReplyList
    },
    props: {
        prop: {
            type: Object,
        },
        basePath: {
            type: String,
            default: ''
        },
        loginUserId: {
            type: String,
        },
        status: {
            type: Number,
        }
    },
    data() {
        return {
            canClick: true,
            avatarUrl: this.basePath + '/api/storage/show/avatar/' + this.prop.userId,
            replyListShow: false,
            replyBoxStatus: false,
        }
    },
    created() {
    },

    watch: {
        'prop.fabulous': function(newValue, oldValue) {
            if (newValue - oldValue > 0) {
                this.$refs.addFabulous.style.color = '#6BB0EF'
                this.$refs.addFabulous.title = '取消赞'
            } else {
                this.$refs.addFabulous.style.color = '#C1BFC0'
                this.$refs.addFabulous.title = '点个赞'
            }
        }
    },
    methods: {
        //  删除回复操作
        replyDel(id) {
            var index = this.prop.replys.findIndex((val, index) => {
                return val.id == id
            })
            if (index > -1) {
                this.prop.replys.splice(index, 1)
            }
            this.$emit('reply-delfind', id)
        },

        //  展示所有内容
        showAll() {

        },

        //  评论点赞
        addCommentFabulous(id, type) {
            if (this.canClick) {
                if (id && type) {
                    if (type === 1) {
                        this._updateCommentFabulous({
                            id: id,
                            type: 2,
                        })
                    } else if (type === 2) {
                        this._updateCommentFabulous({
                            id: id,
                            type: 1,
                        })
                    }
                    this.canClick = false
                }

            }

        },

        //  删除评论
        delCom(id) {
            this.$confirm('您确定要删除么？是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                this._delComment({
                    id: id
                })
            }).catch(() => {
                this.$notify({
                    title: '提示',
                    message: '已取消删除！',
                    type: 'info'
                })
            })
        },

        //  评论点赞
        _updateCommentFabulous(param) {
            updateCommentFabulous(param).then((res) => {
                if (res.status === 200 && res.data === 'success') {
                    if (param.type === 1) {
                        this.$emit('comment-add-fabulous', param.id)
                    } else if (param.type === 2) {
                        this.$emit('comment-reduce-fabulous', param.id)
                    }
                    this.canClick = true
                } else {
                    this.$notify({
                        title: '提示',
                        message: '操作失败！',
                        type: 'info'
                    })
                    this.canClick = true
                }
            })
        },

        //  删除评论
        _delComment(param) {
            delComment(param).then((res) => {
                if (res.status === 200) {
                    if (res.message === '成功') {
                        this.$notify({
                            title: '提示',
                            message: '删除成功！',
                            type: 'success'
                        })
                        this.replyBoxStatus = false
                        this.$emit('comment-del', param.id)
                    } else {
                        this.$notify({
                            title: '提示',
                            message: '删除失败！',
                            type: 'info'
                        })
                    }
                }
            })
        },

        //  显示回复框
        showReplyBox() {
            this.replyBoxStatus = !this.replyBoxStatus
        },

        //  查看回复
        showReply() {
            this.replyListShow = !this.replyListShow
        }

    },
}

</script>

<style scoped>
.sy-comment-list {
    border-top: 2px solid #E6E6E6;
    padding: 20px 5px;
    margin-top: 10px;
    position: relative;
}

.sy-comment-avatar {
    position: absolute;
    width: 50px;
    height: 50px;
    box-sizing: content-box;
    border-radius: 50%;
    margin-top: 4px;
    padding-left: 10px;
}

.sy-comment-content {
    padding-left: 13%;
}

.sy-comment-content_title {
    line-height: 20px;
}

.sy-comment-userName {
    color: #6BB0EF;
    line-height: 20px;
    font-size: 14px;
}

.sy-comment-time {
    color: #C4C3C2;
    padding-left: 5px;
}

.sy-comment-content_con {
    text-align: justify;
    overflow: hidden;
    line-height: 20px;
}

.showAllBtn {
    display: block;
    text-align: center;
    height: 15px;
    padding-top: 5px;
    padding-bottom: 5px;
    color: #999;
}

.sy-comment-handle {
    font-size: 12px;
    color: #C1BFC0;
    line-height: 20px;
    overflow: hidden;
}

.sy-comment-handle i {
    font-size: 14px;
    line-height: 20px;
}

.sy-comment-handle div {
    margin-left: 10px;
    float: left;
    cursor: pointer;
}

.sy-comment-handle i:hover {
    color: #6BB0EF;
}

.sy-comment-handle div:nth-child(1) {
    margin-left: 0;
}

.beforeAdd {
    color: #C1BFC0
}

.afterAdd {
    color: #6BB0EF
}
</style>