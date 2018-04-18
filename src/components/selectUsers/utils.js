import _ from 'lodash';
export default {
    inArray(elem, arr, i) {
        var len;
        if (arr) {
            if (Array.prototype.indexOf) {
                return Array.prototype.indexOf.call(arr, elem, i);
            }
            len = arr.length;
            i = i ? i < 0 ? Math.max(0, len + i) : i : 0;
            for (; i < len; i++) {
                if (i in arr && arr[i] === elem) {
                    return i;
                }
            }
        }
        return -1;
    },
    data2tree(datas, idprop, pIdprop) {
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
    merge(target) {
        for (let i = 1, j = arguments.length; i < j; i++) {
            let source = arguments[i] || {};
            for (let prop in source) {
                if (source.hasOwnProperty(prop)) {
                    let value = source[prop];
                    if (value !== undefined) {
                        target[prop] = value;
                    }
                }
            }
        }
        return target;
    }
};