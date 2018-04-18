import request from '@/api';

function checkUser(param) {
    return request("GET", '/api/uaa/oauth/forget/getuser', param);
}

function findUser(userInfo) {
    return request("GET", '/api/base/user/validata/userInfo/nologin', { userInfo });
}

function checkVcode(param) {
    return request("GET", '/api/uaa/oauth/forget/validatevcode/' + param);
}

function selectWay(params) {
    return request("POST", '/api/uaa/oauth/forget/action/' + params.way, params);
}

function checkQuestion(params) {
    return request("POST", '/api/uaa/oauth/forget/checkencrypt', params);
}

function check_Vcode(params) {
    return request("POST", '/api/uaa/oauth/forget/checkvcode/' + params.way, params);
}

function newPassword_question(params) {
    return request("POST", '/api/uaa/oauth/forget/encrypt', params);
}

function newPassword_vcode(params) {
    return request("POST", '/api/uaa/oauth/forget/validatecode/' + params.way, params);
}
export default {
    checkUser,
    checkVcode,
    selectWay,
    checkQuestion,
    check_Vcode,
    newPassword_question,
    newPassword_vcode,
    findUser
}