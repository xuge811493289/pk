import ztree from './tree.js';
import _ from 'lodash';
import store from '../store.js';
import qs from 'qs';
import moment from 'moment';
import print from '../print/index.js';
import tableDownload from './download-table.js';
import { scrollTo } from '../methods.js';

export default {
    tableDownload,
    scrollTo: scrollTo,
    print: print,
    store: store,
    _: _,
    moment: moment,
    isEmptyObject: (obj) => {
        if (null == obj || undefined == obj || typeof obj == 'object') {
            return true;
        }
        return Object.keys(obj).length == 0;
    },
    isArry: (o) => { // 判断一个返回结果是不是数组
        return Object.prototype.toString.call(o) == '[object Array]';
    },
    isEditorObject: (oldObj, newObj) => { // 判断两个对象是否相等 用于编辑判断提交
        let oldKeys = Object.keys(oldObj);
        let newKeys = Object.keys(newObj);
        if (oldKeys.length < newKeys.length) {
            // oldObj = [newObj, newObj = oldObj][0];
            [oldObj, newObj] = [newObj, oldObj]; // es6
        }
        for (let key in newObj) {
            console.log(oldObj[key], newObj[key]);
            if (oldObj[key] || newObj[key]) {
                if (oldObj[key] != newObj[key]) {
                    return true;
                }
            }
        }
        return false;
    },
    trim: (str) => {
        return str.replace(/^\s+|\s+$/g, '');
    },
    trimLeft: (str) => {
        return str.replace(/^\s+/, '');
    },
    trimRight: (str) => {
        return str.replace(/\s+$/, '');
    },
    setStore: (name, content) => { // 存储localStorage
        if (!name) return;
        if (typeof content !== 'string') {
            content = JSON.stringify(content);
        }
        window.localStorage.setItem(name, content);
    },
    getStore: name => { // 获取localStorage
        if (!name) return false;
        return window.localStorage.getItem(name).replace(/"/g, '');
    },
    setSess: (name, content) => { // sessionStorage
        if (!name) return;
        if (typeof content !== 'string') {
            content = JSON.stringify(content);
        }
        window.sessionStorage.setItem(name, content);
    },
    getSess: name => { // sessionStorage
        if (!name) return false;
        let msg = window.sessionStorage.getItem(name);
        if (msg && /^[\[{]/gi.test(msg)) {
            msg = JSON.parse(msg);
        }
        return msg;
    },
    removeSess: name => { // 删除sessionStorage
        if (!name) return;
        window.sessionStorage.removeItem(name);
    },
    removeStore: name => { // 删除localStorage
        if (!name) return;
        window.localStorage.removeItem(name);
    },
    testEmail: (value) => { // 验证邮箱格式
        value = value.trim();
        if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(value)) {
            return false;
        }
        return true;
    },
    data2tree: (datas, idprop, pIdprop) => {
        if (!idprop) {
            idprop = 'id';
        }
        if (!pIdprop) {
            pIdprop = 'parentId';
        }
        let nodes = [],
            c = function(obj) {
                let _c = [];
                for (let i = 0; i < datas.length; i++) {
                    let _d = _.cloneDeep(datas[i]);
                    if (_d[pIdprop + ''] == obj[idprop + '']) {
                        _c.push(_d);
                        c(_d);
                    }
                }
                if (_c.length) {
                    obj.children = _c;
                }
            };
        for (let i = 0; i < datas.length; i++) {
            let _d = _.cloneDeep(datas[i]);
            if ((!_d[pIdprop + ''] && _d[pIdprop + ''] != '') || (!_.result(_.find(datas, {
                    [idprop]: _d[pIdprop + '']
                }), idprop))) {
                c(_d);
                nodes.push(_d);
            }
        }
        return nodes;
    },
    ztree: ztree,
    downloade: (url, method, parmas = {}) => {
        let formDom = document.createElement('form');
        formDom.method = method.toUpperCase();
        formDom.style.display = 'none';
        if (formDom.method == 'GET') {
            formDom.action = window.ShiYue.base + url + '?' + qs.stringify(parmas);
        } else {
            Object.keys(parmas).forEach((_p, p) => {
                let textarea = document.createElement('textarea');
                textarea.value = parmas[_p];
                textarea.name = _p;
                formDom.appendChild(textarea);
            })
            formDom.action = window.ShiYue.base + url
        }
        document.body.appendChild(formDom);
        formDom.submit();
        setTimeout(() => {
            document.body.removeChild(formDom)
        }, 500)
    },
    emptyObj: (obj = {}) => {
        Object.keys(obj).forEach((_key, index) => {
            if (Object.prototype.toString.call(_key) == '[object Array]') {
                obj[_key] = [];
            } else {
                obj[_key] = '';
            }
        })
    },
    checkPhoneNumber: (value) => {
        return /^1[3|4|5|7|8][0-9]{9}$/.test(value)
    },
    checkIdCard: (value) => {
        return /^\d{6}(18|19|20)?\d{2}(0[1-9]|1[12])(0[1-9]|[12]\d|3[01])\d{3}(\d|X)$/i.test(value)
    },
    checkEmail: (value) => {
        // return /^((([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+(\.([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+)*)|((\x22)((((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(([\x01-\x08\x0b\x0c\x0e-\x1f\x7f]|\x21|[\x23-\x5b]|[\x5d-\x7e]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(\\([\x01-\x09\x0b\x0c\x0d-\x7f]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))))*(((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(\x22)))@((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?$/.test(value)
        // return /^[a-zA-Z0-9_\.]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/i.test(value);
        return /^([a-zA-Z0-9_\.])+@([a-zA-Z0-9_-])+(\.[a-zA-Z0-9_-])+/gi.test(value);
        // return /^$|[\\w!#$%&'*+/=?^_`{|}~-]+(?:\\.[\\w!#$%&'*+/=?^_`{|}~-]+)*@(?:[\\w](?:[\\w-]*[\\w])?\\.)+[\\w](?:[\\w-]*[\\w])?/i.test(value)
    },
    removeZero: (val, obj, key) => {
        if (val) {
            if (/^0{1,}$/.test(val)) {
                setTimeout(() => {
                    obj[key] = '0'; //把一串0变成一个0
                }, 50)
            } else {
                if (!/^\d{0,}\./.test(val))
                    obj[key] = val.replace(/\b(0+)/gi, ""); //去掉字符串前面的所有0
            }
        }
    },

    //验证联系电话
    /*规则：
     * 可以为空字符串或null；
     * 允许包含最多两个空格或"-"，不允许空格或"-"连续或交替输入;
     * 可以匹配手机、座机或400/800热线电话;
     * 联系电话正确返回true,错误返回false；
     */
    checkContact: (value) => {
        let f = /^\d|-|\s{1,}$/
        let nf = /-{2,}|\s{2,}|(\s-)|(-\s)/
        let s = /(^1(3|4|5|7|8)\d{9}$)|(^(0[1-9]\d{1,2})?\d{7,8}$)|(^(400|800)\d{7,8}$)/
        let v = value === null ? "" : value + "";
        if (v.length === 0) return true;
        if (f.test(v) && !nf.test(v) && v.replace(/\d/g, "").length < 3) {
            if (s.test(v.replace(/\D/g, ""))) {
                return true;
            } else {
                return false;
            }
        }
        return false;
    },

    //点击树节点选中该节点
    /*
     * 点击没有children的树节点,该节点会改变选中状态
     * 用法：写在tree的node-click事件里
     *
     * 参数如下：
     * _this：this
     * val：当前节点数据，类型为object
     * refName：树的$refs对象名，类型为string
     * noSelect：可选择节点的标识，可选，类型为string
     * noSelectContent：可选择节点标识的内容，可选
     * isRadio：是否为单选，默认值false
     */
    selectNodeClick: (_this, val, refName, noSelect, noSelectContent, isRadio) => {
        let data = _this.$refs[refName].getCheckedNodes();
        if (noSelect && noSelectContent) {
            if (val[noSelect] !== noSelectContent) {
                return;
            }
        }
        if (!Boolean(val.children) || val.children.length < 1) {
            if (data.length > 0) {
                let z = _.findIndex(data, (obj) => {
                    return JSON.stringify(obj) == JSON.stringify(val);
                });
                if (z > -1) {
                    data.splice(z, 1)
                    _this.$refs[refName].setCheckedNodes(data);
                    return;
                }
            }
            if (isRadio) data = [val];
            else data.push(val);
            console.log("data", data)
            _this.$refs[refName].setCheckedNodes(data);
            return;
        }
    },


    //检验非法文件类型
    checkFileType: (fileName) => {
        let fileType = /\.[^\.]+$/.exec(fileName);
        if (fileType == ".exe" ||
            fileType == ".jar" ||
            fileType == ".jsp" ||
            fileType == ".asp" ||
            fileType == ".dll" ||
            fileType == ".php" ||
            fileType == ".aspx" ||
            fileType == ".bat" ||
            fileType == ".sh" ||
            fileType == ".html" ||
            fileType == ".com" ||
            fileType == ".cgi" ||
            fileType == ".class" ||
            fileType == ".jspx")
            return false;
        else
            return true;
    }
}