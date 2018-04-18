import request from '../../../../api'

//******************************************评论首页*******************************************************

//  查询热门评论及回复
export function getHotComment(param) {
    let url = `/api/comment/nologin/comment/hot`
    const params = Object.assign({}, {
        subjectId: param.subjectId,
        appCode: param.appCode,
        start: param.start,
        size: param.size
    })
    return request('get', url, params)
}

//  查询评论数
export function getCommentNum(param) {
    let url = `/api/comment/comment/support`
    const params = Object.assign({}, {
        subjectId: param.subjectId,
        appCode: param.appCode
    })
    return request('get', url, params)
}

//  查询最新评论及回复
export function getCommentByTime(param) {
    let url = `/api/comment/nologin/comment/time`
    const params = Object.assign({}, {
        subjectId: param.subjectId,
        appCode: param.appCode,
        start: param.start,
        size: param.size
    })
    return request('get', url, params)
}

//  添加评论
export function addComment(param) {
    let url = `/api/comment/comment`
    const params = Object.assign({}, {
        app: param.app,
        subjectId: param.subjectId,
        subjectName: param.subjectName,
        content: param.content,
        status: param.status,
        subjectTypeId: param.subjectTypeId
    })
    return request('post', url, params)
}

//  根据id更新评论点赞数
export function updateCommentFabulous(param) {
    let url = `/api/comment/comment/fabulous`
    const params = Object.assign({}, {
        id: param.id,
        type: param.type
    })
    return request('put', url, params)
}

//  根据id删除评论信息
export function delComment(param) {
    let url = `/api/comment/comment_manager/del_my_comment_reply`
    return request('post', url, { ids: param.id })
}

//******************************************回复管理*******************************************************

//  新增回复信息
export function addCommentReply(param) {
    let url = `/api/comment/reply`
    const params = Object.assign({}, {
        id: param.id,
        toUserId: param.toUserId,
        toUserName: param.toUserName,
        toUserType: param.toUserType,
        toUnitId: param.toUnitId,
        toUnitName: param.toUnitName,
        commentId: param.commentId,
        content: param.content,
        parentId: param.parentId,
        status: param.status
    })
    return request('post', url, params)
}

//  更新回复点赞数
export function updateReplyFabulous(param) {
    let url = `/api/comment/nologin/reply/fabulous`
    const params = Object.assign({}, {
        id: param.id,
        type: param.type
    })
    return request('put', url, params)
}

//  根据id删除回复
export function delReply(param) {
    let url = `/api/comment/reply/` + `${param.id}`
    const params = Object.assign({}, {})
    return request('DELETE', url, params)
}

//*****************************************获取当前登录用户信息*********************************************

//  获取当前登录用户信息
export function getUserInfo() {
    let url = `/api/user`
    const params = Object.assign({}, {})
    return request('get', url, params)
}

//  根据用户id查询用户信息
export function getUserInfoById(param) {
    let url = `/api/base/user/find`
    const params = Object.assign({}, {
        id: param.id
    })
    return request('get', url, params)
}

//  判断用户是否登陆
export function isLogined() {
    let url = `/api/logined`
    const params = Object.assign({}, {})
    return request('get', url, params)
}

//  获取缩略图
export function getThumb(param) {
    let url = `/api/storage/show/thumbnail/` + `${param.id}`
    const params = Object.assign({}, {})
    return request('get', url, params)
}

//  判断用户是否登陆并获取相关数据
export function getUser() {
    let url = `/api/comment/loadUser`
    const params = Object.assign({}, {})
    return request('get', url, params)
}