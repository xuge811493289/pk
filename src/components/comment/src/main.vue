<template>
    <div class="sy-comment">
        <comment-box @user-login="userLogin" @comment-add="commentAdd" :button-size="buttonSize" :logined="logined" :comment-total="total" :login-user-avatar="avatar" :login-user-name="userName" :prop="{appCode: appCode, subjectId: subjectId, subjectName: subjectName, subjectTypeId: typeId}" :status="status"></comment-box>
        <div class="sy-comment-bodyCon" style="padding-top:10px" v-show="hotCommentData.length != 0 || newCommentData.length != 0 || hotCommentDataLoad.length != 0">
            <div class="sy-comment-optionBtn" style="">
                <el-button-group style="float: right">
                    <el-button type="primary" size="small" @click="changeTime" class="timeBtn" ref="timeBtn">时间</el-button>
                    <el-button size="small" @click="changeHot" class="hotBtn" ref="hotBtn">热度</el-button>
                </el-button-group>
            </div>
            <div class="sy-comment-byTime" v-show="timeChange">
                <div class="sy-comment-hot" style="margin-top:8px">
                    <span class="sy-comment-title"> 热门评论</span>
                    <comment-list v-for="(hotItem, hotIndex) in hotCommentData" :key="hotIndex" :base-path="baseUrl" :login-user-id="userId" :prop="hotItem" @comment-del="commentDel" @reply-delfind="replyDelFindNew" :status="status" @comment-add-fabulous="commentAddFabulous" @comment-reduce-fabulous="commentReduceFabulous"></comment-list>
                </div>
                <div class="sy-comment-new" style="margin-top:8px">
                    <span class="sy-comment-title">最新评论</span>
                    <comment-list v-for="(newItem, newIndex) in newCommentData" :key="newIndex" :base-path="baseUrl" :login-user-id="userId" :prop="newItem" @comment-del="commentDel" @reply-delfind="replyDelFindHot" :status="status" @comment-add-fabulous="commentAddFabulous" @comment-reduce-fabulous="commentReduceFabulous"></comment-list>
                </div>
                <div class="sy-comment-loadMoreNew">
                    <el-button size="large" type="primary" style="width:100%" @click="loadMore" :loading="loadingNew" :disabled="disableNew">{{newLoadTitle}}</el-button>
                </div>
            </div>
            <div class="sy-comment-byHot" v-show="hotChange">
                <comment-list v-for="(hotItem, hotIndex) in hotCommentDataLoad" :key="hotIndex" :base-path="baseUrl" :login-user-id="userId" :prop="hotItem" @comment-del="commentDel" :status="status" @comment-add-fabulous="commentAddFabulous" @comment-reduce-fabulous="commentReduceFabulous"></comment-list>
                <div class="sy-comment-loadMoreHot">
                    <el-button size="large" type="primary" style="width:100%" @click="loadMore" :loading="loadingHot" :disabled="disableHot">{{hotLoadTitle}}</el-button>
                </div>
            </div>
        </div>
        <div class="emptyComment" v-if="hotCommentData.length == 0 && newCommentData.length == 0 && hotCommentDataLoad.length == 0">
            <div class="emptyImg"></div>
            <div class="emptyInfo">评论空空如也，快来抢个沙发吧~</div> 
        </div>
    </div>
</template>

<script type="text/ecmascript-6">
import CommentBox from './comment_box.vue'
import CommentList from './comment_list.vue'
import bus from './javaScripts/bus'
import {
    getUserInfo,
    getUserInfoById,
    getUser,
    getCommentByTime,
    getHotComment
} from './javaScripts/request'
import moment from 'moment'
// import DialogLogin from '../../../page/login/src/DialogLogin'
moment.locale('zh-cn')

export default {
    name: 'SyComment',
    components: {
        CommentBox,
        CommentList,
    },
    props: {
        subjectId: {
            type: String,
        },
        appCode: {
            type: String,
        },
        subjectName: {
            type: String,
        },
        status: {
            type: Number,
        },
        typeId: {
            type: String
        },
        buttonSize: {
            type: String,
            default: 'middle'
        }
    },
    data() {
        return {
            newLoadTitle: '没有更多了~',
            hotLoadTitle: '没有更多了~',   
            dialogStatus: false,
            disableNew: false,
            disableHot: false,
            loadingNew: false,
            loadingHot: false,
            loadMoreType: 'new',
            baseUrl: window.ShiYue.base,
            logined: false,
            total: 0,
            avatar: '',
            userName: '',
            userId: '',
            hotChange: false,
            timeChange: false,
            hotCommentData: [],
            newCommentData: [],
            newStart: 1,
            hotStart: 1,
            size: 3,
            loadSize: 10,
            hotCommentDataLoad: [],
            cbAvatar: ''
        }
    },
    created() {
        let userMsg = this.$getSess('user');
        if (userMsg && userMsg.data) {
            this.logined = true
            if (this.$store.state.userId) {
                this.userId = this.$store.state.userId;
                this.avatar = this.baseUrl + '/api/storage/show/avatar/' + this.$store.state.userId
            } else {
                this.userId = ''
                this.avatar = this.baseUrl + '/api/storage/show/avatar/head'
            }
            if (this.$store.state.avatar) {
                this.cbAvatar = this.$store.state.avatar
            } else {
                this.cbAvatar = ''
            }
            if (this.$store.state.realName) {
                this.userName = this.$store.state.realName
            } else {
                this.userName = ''
            }
        } else {
            this.logined = false
        }
        if (this.subjectId) {
            this._init()
        }    
        bus.$on('reply-add', (val) => {
            let obj1 = {
                "id": val.id,
                "parentId": null,
                "userId": this.userId,
                "userName": this.userName,
                "img": null,
                "toUserId": val.toUserId,
                "toUserName": val.toUserName,
                "fabulous": 0,
                "datetime": val.date,
                "content": val.content,
                "zanType": 2
            }
            let obj2 = {
                "id": val.id,
                "parentId": null,
                "userId": this.userId,
                "userName": this.userName,
                "img": null,
                "toUserId": val.toUserId,
                "toUserName": val.toUserName,
                "fabulous": 0,
                "datetime": val.date,
                "content": val.content,
                "zanType": 2
            }
            this.hotCommentData.forEach((value, index) => {
                if (value.id === val.commentId) {
                    value.replys.push(obj1)
                }
            })
            this.newCommentData.forEach((value, index) => {
                if (value.id === val.commentId) {
                    value.replys.push(obj2)
                }
            })
            this.$emit('add-reply', {
                subjectId: this.subjectId,
                userId: this.userId
            })
        })
        bus.$on('reply-user-login', () => {
            this.dialogStatus = true
        })
        bus.$on('reply-add-fabulous', (val) => {
            this.hotCommentData.forEach((_d, i) => {
                if (_d.replys.length != 0) {
                    _d.replys.forEach((_v, index) => {
                        if (_v.id === val) {
                            _v.fabulous += 1
                            _v.zanType = 1
                        }
                    })
                }
            })
            this.newCommentData.forEach((_d, i) => {
                if (_d.replys.length != 0) {
                    _d.replys.forEach((_v, index) => {
                        if (_v.id === val) {
                            _v.fabulous += 1
                            _v.zanType = 1
                        }
                    })
                }
            })
            this.hotCommentDataLoad.forEach((_d, i) => {
                if (_d.replys.length != 0) {
                    _d.replys.forEach((_v, index) => {
                        if (_v.id === val) {
                            _v.fabulous += 1
                            _v.zanType = 1
                        }
                    })
                }
            })
        })
        bus.$on('reply-reduce-fabulous', (val) => {
            this.hotCommentData.forEach((_d, i) => {
                if (_d.replys.length != 0) {
                    _d.replys.forEach((_v, index) => {
                        if (_v.id === val) {
                            _v.fabulous -= 1
                            _v.zanType = 2
                        }
                    })
                }
            })
            this.newCommentData.forEach((_d, i) => {
                if (_d.replys.length != 0) {
                    _d.replys.forEach((_v, index) => {
                        if (_v.id === val) {
                            _v.fabulous -= 1
                            _v.zanType = 2
                        }
                    })
                }
            })
            this.hotCommentDataLoad.forEach((_d, i) => {
                if (_d.replys.length != 0) {
                    _d.replys.forEach((_v, index) => {
                        if (_v.id === val) {
                            _v.fabulous -= 1
                            _v.zanType = 2
                        }
                    })
                }
            })
        })
    },
    watch: {
        subjectId: function(newValue, oldValue) {
            if (newValue !== oldValue) {
                this._init()
            }
        }

    },
    methods: {
        //  userLogin
        userLogin() {
            this.dialogStatus = true
        },

        //  点赞后操作
        commentAddFabulous(val) {
            this.hotCommentData.forEach((_d, i) => {
                if (_d.id === val) {
                    _d.fabulous += 1
                    _d.zanType = 1
                }        
            })

            this.newCommentData.forEach((_d, i) => {
                if (_d.id === val) {
                    _d.fabulous += 1
                    _d.zanType = 1
                }        
            })
            this.hotCommentDataLoad.forEach((_d, i) => {
                if (_d.id === val) {
                    _d.fabulous += 1
                    _d.zanType = 1
                }        
            })
        },

        //  评论取消赞操作
        commentReduceFabulous(val) {
            this.hotCommentData.forEach((_d, i) => {
                if (_d.id === val) {
                    _d.fabulous -= 1
                    _d.zanType = 2
                }        
            })
            this.newCommentData.forEach((_d, i) => {
                if (_d.id === val) {
                    _d.fabulous -= 1
                    _d.zanType = 2
                }        
            })
            this.hotCommentDataLoad.forEach((_d, i) => {
                if (_d.id === val) {
                    _d.fabulous -= 1
                    _d.zanType = 2
                }        
            })
        },

        //  删除评论回复操作
        replyDelFindHot(id) {
            this.hotCommentData.forEach((val, index) => {
                if (val.replys.length != 0) {
                    val.replys.forEach((relVal, relIndex) => {
                        if (relVal.id === id) {
                            val.replys.splice(relIndex, 1)
                        }
                    })
                }
            })
            this.$emit('del-reply', {
                subjectId: this.subjectId,
                userId: this.userId
            })
        },
        replyDelFindNew(id) {
            this.newCommentData.forEach((val, index) => {
                if (val.replys.length != 0) {
                    val.replys.forEach((relVal, relIndex) => {
                        if (relVal.id === id) {
                            val.replys.splice(relIndex, 1)
                        }
                    })
                }
            })
            this.$emit('del-reply', {
                subjectId: this.subjectId,
                userId: this.userId
            })
        },

        //  添加评论后操作
        commentAdd(val) {
            let addData1 = {
                "id": val.id,
                "app": this.appCode,
                "userId": this.userId,
                "userName": this.userName,
                "datetime": val.date,
                "content": val.content,
                "fabulous": 0,
                "zanType": 2,
                "replys": [],
                "avatar": this.cbAvatar
            }
            let addData2 = {
                "id": val.id,
                "app": this.appCode,
                "userId": this.userId,
                "userName": this.userName,
                "datetime": val.date,
                "content": val.content,
                "fabulous": 0,
                "zanType": 2,
                "replys": [],
                "avatar": this.cbAvatar
            }
            let addData3 = {
                "id": val.id,
                "app": this.appCode,
                "userId": this.userId,
                "userName": this.userName,
                "datetime": val.date,
                "content": val.content,
                "fabulous": 0,
                "zanType": 2,
                "replys": [],
                "avatar": this.cbAvatar
            }
            this.newCommentData.unshift(addData1)
            if (this.hotCommentData.length < 3) {
                this.hotCommentData.push(addData2)
            }
            if (this.hotCommentDataLoad.length < 10) {
                this.hotCommentDataLoad.push(addData3)
            }
            this.total += 1
            this.$emit('add-comment', {
                subjectId: this.subjectId,
                userId: this.userId
            })
        },

        //  删除评论节点
        commentDel(id) {
            let index = this.newCommentData.findIndex((val, index) => {
                return val.id == id
            })
            if (index > -1) {
                this.newCommentData.splice(index, 1)
            }
            let indexOne = this.hotCommentData.findIndex((valOne, indexOne) => {
                return valOne.id == id
            })
            if (indexOne > -1) {
                this.hotCommentData.splice(indexOne, 1)
            }
            let indexTwo = this.hotCommentDataLoad.findIndex((val, index) => {
                return val.id == id
            })
            if (indexTwo > -1) {
                this.hotCommentDataLoad.splice(indexTwo, 1)
            }
            this.total -= 1
            this.$emit('del-comment', {
                subjectId: this.subjectId,
                userId: this.userId
            })
        },

        //  filter


        //  加载更多
        loadMore() {
            if (this.loadMoreType === 'new') {
                this.loadingNew = true
                this.newStart += 1
                this._getCommentByTime()
            } else {
                this.loadingHot = true
                this.hotStart += 1
                this._getHotComment(this.loadSize)
            }
        },

        //  改变为以时间展示
        changeTime() {
            this.disableNew = false
            this.newStart = 1
            this.hotCommentData = []
            this.newCommentData = []
            this._getCommentByTime()
            this._getHotComment(this.size)
            this.loadMoreType = 'new'
            this.timeChange = true
            this.hotChange = false
            $('.hotBtn').removeClass('el-button--primary')
            $('.timeBtn').removeClass('el-button--default')
            $('.timeBtn').addClass('el-button--primary')
        },

        //  改变为以热度展示
        changeHot() {
            this.disableHot = false
            this.hotStart = 1
            this.hotCommentDataLoad = []
            this._getHotComment(this.loadSize)
            this.loadMoreType = 'hot'
            this.hotChange = true
            this.timeChange = false
            $('.timeBtn').removeClass('el-button--primary')
            $('.hotBtn').removeClass('el-button--default')
            $('.hotBtn').addClass('el-button--primary')
        },

        //  初始化
        _init() {
            this.hotCommentDataLoad = []
            this.hotCommentData = []
            this.newCommentData = []
            this._getCommentByTime()
            this._getHotComment(this.size)
        },

        //  获取最新评论
        _getCommentByTime() {
            getCommentByTime({
                subjectId: this.subjectId,
                appCode: this.appCode,
                start: this.newStart,
                size: this.loadSize
            }).then((resNew) => {
                if (resNew && resNew.data.list && resNew.data && resNew.status === 200) {
                    if (resNew.data.list.length < this.loadSize) {
                        this.newLoadTitle = '没有更多了~'
                        this.disableNew = true
                    } else {
                        this.newLoadTitle = '加载更多'
                    }
                    resNew.data.list.forEach((valNew, indexNew) => {
                        valNew.datetime = moment(valNew.datetime).startOf('minute').fromNow()
                        valNew.replys.forEach((valReplyNew, indexReplyNew) => {
                            valReplyNew.datetime = moment(valReplyNew.datetime).calendar()
                        })
                    })
                    for (let i = 0; i < resNew.data.list.length; i++) {
                        this.newCommentData.push(resNew.data.list[i])
                    }
                    this.loadingNew = false
                    this.timeChange = true
                }
            })
        },


        //  获取热门评论
        _getHotComment(param) {
            getHotComment({
                subjectId: this.subjectId,
                appCode: this.appCode,
                start: this.hotStart,
                size: param
            }).then((resHot) => {
                if (resHot.status === 200 && resHot && resHot.data && resHot.data.list) {
                    this.total = resHot.data.total
                    if (resHot.data.list.length < param) {
                        this.hotLoadTitle = '没有更多了~'
                        this.disableHot = true
                    } else {
                        this.hotLoadTitle = '加载更多'
                    }
                    resHot.data.list.forEach((valHot, indexHot) => {
                   
                        valHot.datetime = moment(valHot.datetime).startOf('second').fromNow()
                        valHot.replys.forEach((valReply, indexReply) => {
                            valReply.datetime = moment(valReply.datetime).calendar()
                        })
                    })
                    if (this.loadMoreType == 'new') {
                        for (let i = 0; i < resHot.data.list.length; i++) {
                            this.hotCommentData.push(resHot.data.list[i])
                        }
                    } else {
                        for (let i = 0; i < resHot.data.list.length; i++) {
                            this.hotCommentDataLoad.push(resHot.data.list[i])
                        }
                    }
                    this.loadingHot = false
                }
            })
        }
    }
}
</script>

<style scoped>
.sy-comment {
    width: 100%;
    height: 100%;
    padding: 20px;
    box-sizing: border-box;
}

.sy-comment-optionBtn {
    height: 40px;
    padding-top: 10px;
}

.sy-comment-title {
    font-size: 18px;
    font-weight: 700;
    line-height: 40px;
    display: block;
    width: 100%;
    box-sizing: border-box;
    background-color: #eee;
    padding-left: 10px;
    height: 40px;
}
.emptyComment {
    margin-top: 20px;
    border-top: 1px solid #ccc;
}
.emptyImg {
    width: 220px;
    height: 100px;
    background: url('/common/images/noComment.png') no-repeat;
    background-size: contain;
    margin: 20px auto;
}
.emptyInfo {
    text-align: center;
    line-height: 30px;
}
</style>
