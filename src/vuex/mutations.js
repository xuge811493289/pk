import {
    increment
} from './mutation-types.js'
export default {
    // 记录当前经度纬度
    [increment](state, {}) {
        state.count++
    },
    getUserInfo(state) {
        let userMsg = JSON.parse(window.sessionStorage.getItem('user'));
        if (userMsg && userMsg.data) {
            state.realName = userMsg.data.realName;
            state.loginName = userMsg.data.loginName;
            state.avatar = userMsg.data.avatar;
            state.unitId = userMsg.data.unitId;
            state.unitType = userMsg.data.unitType;
            state.userId = userMsg.data.userId;
            state.userType = userMsg.data.userType;
        }
    },
    changeCheckedData(state, data) {
        state.checkedData = data
    }
}