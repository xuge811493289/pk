import {
    validataEmail,
    validataIdcard,
    validataPin,
    validataMobile,
} from './request.js';
export default {
    methods: {
        // 失去焦点校验
        handleBulur(t, value, oldValue, obj, key, unitId) {
            console.log(t, value, oldValue, obj, key, unitId);
            value = this.$trim(value);
            if (t === 'phone') {
                if (!value) { return; }
                if (oldValue === value) { return; }
                if (this.$checkPhoneNumber(value)) {
                    validataMobile(value).then((data) => {
                        if (!data.data) {
                            this.$notify({
                                message: '手机号码已存在！',
                                type: 'error'
                            });
                            setTimeout(() => { obj[key] = ''; }, 100);
                        }
                    })
                } else {
                    this.$notify({
                        message: '手机号码格式有误！',
                        type: 'error'
                    });
                    obj[key] = '';
                }
            } else if (t === 'email') {
                if (!value) { return; }
                if (oldValue === value) { return; }
                if (this.$checkEmail(value)) {
                    validataEmail(value).then((data) => {
                        if (!data.data) {
                            this.$notify({
                                message: '邮箱已存在！',
                                type: 'error'
                            });
                            setTimeout(() => { obj[key] = ''; }, 100);
                        }
                    })
                } else {
                    this.$notify({
                        message: '邮箱格式有误！',
                        type: 'error'
                    });
                    obj[key] = '';
                }
            } else if (t === 'idCard') {
                if (!value) { return; }
                if (oldValue === value) { return; }
                if (this.$checkIdCard(value)) {
                    validataIdcard(value).then((data) => {
                        if (!data.data) {
                            this.$notify({
                                message: '身份证已存在！',
                                type: 'error'
                            });
                            setTimeout(() => { obj[key] = ''; }, 100);
                        }
                    })
                } else {
                    this.$notify({
                        message: '身份证格式有误！',
                        type: 'error'
                    });
                    obj[key] = '';
                }
            } else if (t === 'pass') {
                if (!value) { return; }
                if (oldValue === value) { return; }
                if (value.match(/[\x01-\xFF]*/) == false) {
                    this.$notify({
                        message: '密码不能输入中文！',
                        type: 'error'
                    });
                    obj[key] = '';
                } else {

                }
            } else if (t === 'phones') {
                if (!value) { return; }
                if (oldValue === value) { return; }
                if (this.$checkPhoneNumber(value)) {

                } else {
                    this.$notify({
                        message: '家长电话格式有误！',
                        type: 'error'
                    });
                    obj[key] = '';
                }
            } else if (t === 'pin') {
                if (!value) { return; }
                if (oldValue === value) { return; }
                if (!Number.isInteger(value * 1)) {
                    this.$notify({
                        message: '请输入1-5位数字!',
                        type: 'error'
                    });
                    obj[key] = '';
                    return;
                }
                if (parseInt(value) > 100000) {
                    this.$notify({
                        message: '请输入1-5位数字!',
                        type: 'error'
                    });
                    obj[key] = '';
                    return;
                }
                validataPin(unitId, value).then((data) => {
                    if (!data.data) {
                        this.$notify({
                            message: '考勤号已存在！',
                            type: 'error'
                        });
                        setTimeout(() => { obj[key] = ''; }, 100);
                    }
                })
            }
        },
    }
}