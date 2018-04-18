<template>
    <div class="sy-comment-recallCon" v-show="replyListStatus">
        <div class="sy-comment-recall_info" ref="syCommentReplyNew" @mouseenter="showHandleTip" @mouseleave="hideHandleTip">
            <img :src="avatarUrl" alt="" class="sy-comment-recall_avatar">
            <span v-if="prop.userId != prop.toUserId">
                <span class="sy-comment-recall_userName">{{prop.userName}}</span>
                <span>回复</span>
            </span>
            <span class="sy-comment-recall_userName">{{prop.toUserName}}</span>
            <span>：</span>
            <p style="word-wrap:break-word;margin: 5px 0px;line-height: 20px;" v-html="prop.content"></p>
            <div class="sy-comment-handle">
                <div class="sy-comment-recall_time">{{prop.datetime}}</div>
                <div class="sy-comment-handle_tip" v-show="handleStatus">
                    <div class="" @click="addReplyFabulous(prop.id, prop.zanType)">
                        <i class="fa fa-thumbs-up" ref="addFabulous" :title="prop.zanType===1? '取消赞':'点个赞'" :class="{'beforeAdd' : prop.zanType === 2, 'afterAdd' : prop.zanType === 1}"></i>
                        <span ref="fabulousNum">({{prop.fabulous}})</span>
                    </div>
                    <div class="" @click="showReplybox">
                        <i class="fa fa-reply"></i>
                    </div>
                    <div class="" v-if="prop.userId == loginId">
                        <i class="fa fa-trash" @click="delRep(prop.id)"></i>
                    </div>
                </div>
            </div>
            <reply-box @close="replyBoxStatus = false" :show-reply-box="replyBoxStatus" :status="status" :options="{commentId: comId, commentUserId: prop.userId, commentUserName: prop.userName, loginUserId: loginId}"></reply-box>
        </div>
    </div>
</template>

<script type="text/ecmascript-6">
import ReplyBox from './reply_box.vue'
import { delReply, updateReplyFabulous } from './javaScripts/request'
import bus from './javaScripts/bus'
export default {
    name: 'ReplyList',
    components: {
        ReplyBox
    },
    data() {
        return {
            canClick: true,
            avatarUrl: this.basePath + '/api/storage/show/avatar/' + this.prop.userId,
            handleStatus: false,
            replyBoxStatus: false,
        }
    },
    props: {
        prop: {
            type: Object,
        },
        replyListStatus: {
            type: Boolean,
            default: false
        },
        basePath: {
            type: String,
            default: ''
        },
        loginId: {
            type: String,
            default: ''
        },
        status: {
            type: Number,
        },
        comId: {
            type: String,
            default: ''
        }
    },
    created() {

    },
    watch: {
        "prop.fabulous": function(newValue, oldValue) {
            if (newValue - oldValue > 0) {
                this.$refs.addFabulous.style.color = '#6BB0EF'
                this.$refs.addFabulous.title = '取消赞'
            } else {
                this.$refs.addFabulous.style.color = '#C1BFC0'
                this.$refs.addFabulous.title = '点个赞'
            }
        }
    },
    mounted() {
    },
    methods: {
        //  显示操作按钮
        showHandleTip() {
            this.handleStatus = true
        },

        //  隐藏操作按钮
        hideHandleTip() {
            this.handleStatus = false
        },

        //  显示回复框
        showReplybox() {
            this.replyBoxStatus = !this.replyBoxStatus
        },

        //  点赞
        addReplyFabulous(id, type) {
            if (this.canClick) {
                if (id && type) {
                    if (type === 1) {
                        this._updateReplyFabulous({
                            id: id,
                            type: 2,
                        })
                    } else {
                        this._updateReplyFabulous({
                            id: id,
                            type: 1,
                        })
                    }
                    this.canClick = false
                }
            }

        },

        //  删除
        delRep(id) {
            this.$confirm('您确定要删除么？是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                if (id) {
                    this._delReply({
                        id: id
                    })
                }
            }).catch(() => {
                this.$notify({
                    title: '提示',
                    message: '已取消删除！',
                    type: 'info'
                })
            })
        },

        //  回复点赞
        _updateReplyFabulous(param) {
            updateReplyFabulous(param).then((res) => {
                if (res.status === 200 && res.data === 'success') {
                    if (param.type === 1) {
                        bus.$emit('reply-add-fabulous', param.id)
                    } else {
                        bus.$emit('reply-reduce-fabulous', param.id)
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

        //  删除回复
        _delReply(param) {
            delReply(param).then((res) => {
                if (res.status === 200) {
                    if (res.message === '成功') {
                        this.$notify({
                            title: '成功',
                            message: '操作成功！',
                            type: 'success'
                        })
                        this.replyBoxStatus = false
                        this.$emit('reply-del', param.id)
                    } else {
                        this.$notify({
                            title: '失败',
                            message: '操作失败！',
                            type: 'error'
                        })
                    }
                }
            })
        },
    }
}
</script>

<style scoped>
.sy-comment-recallCon {
    padding: 10px 0px 0px;
    position: relative;
}

.sy-comment-recall_info {

    padding: 10px 0px 10px 10%;
}

.sy-comment-recall_info span {
    display: inline-block;
    line-height: 20px;
}

.sy-comment-recall_userName {
    color: #2D96E9;
}

.sy-comment-recall_avatar {
    position: absolute;
    left: 0px;
    width: 40px;
    height: 40px;
    border-radius: 50%;
}

.sy-comment-recall_time {
    margin: 0px;
    line-height: 22px;
    cursor: auto;
}

.afterAdd {
    color: #6BB0EF;
}

.beforeAdd {
    color: #C1BFC0;
}

.sy-comment-handle_tip {
    font-size: 12px;
    color: #C1BFC0;
    line-height: 20px;
    overflow: hidden;
}

.sy-comment-handle_tip i {
    font-size: 14px;
    line-height: 20px;
}

.sy-comment-handle_tip div {
    margin-left: 10px;
    float: left;
    cursor: pointer;
}

.sy-comment-handle {
    overflow: hidden;
}

.sy-comment-recall_time,
.sy-comment-handle_tip {
    float: left;
}

.sy-comment-handle i:hover {
    color: #6BB0EF;
}
</style>
