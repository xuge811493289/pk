import env from './env.js';
import version from './version.js';
const baseUrl = env.baseUrl;
const count = 0;
let realName = '';
let loginName = '';
let avatar = '';
let unitId = '';
let unitType = 1;
let userId = '';
let userType = 0;
let unitName = '';
let userMsg = JSON.parse(window.sessionStorage.getItem('user'));
let checkedData = [];
if (userMsg && userMsg.data) {
    realName = userMsg.data.realName;
    loginName = userMsg.data.loginName;
    avatar = userMsg.data.avatar;
    unitId = userMsg.data.unitId;
    unitType = userMsg.data.unitType;
    userId = userMsg.data.userId;
    userType = userMsg.data.userType;
    unitName = userMsg.data.unitName
}
export default {
    baseUrl,
    count,
    realName,
    loginName,
    checkedData,
    avatar,
    unitId,
    unitType,
    userType,
    userId,
    unitName,
    version: version,
    pageSize: 30
}
