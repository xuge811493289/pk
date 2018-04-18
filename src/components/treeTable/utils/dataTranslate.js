/*
 * @Author: sunlandong
 * @Date:   2017-03-11 12:06:49
 * @Last Modified by:   sunlandong
 * @Last Modified time: 2017-03-11 16:30:03
 */

import Vue from 'vue'

function DataTransfer(data) {
    if (!(this instanceof DataTransfer)) {
        return new DataTransfer(data, null, null)
    }
}
DataTransfer.treeToArray = function(data, parent, level, expandedAll, obj) {
    let tmp = []
    Array.from(data).forEach(function(record) {
        // console.log(record)
        if (record._expanded === undefined) {
            Vue.set(record, '_expanded', expandedAll)
        }
        if (parent) {
            Vue.set(record, '_parent', parent)
        }
        let _level = 0
        if (level !== undefined && level !== null) {
            _level = level + 1
        }
        Vue.set(record, '_level', _level)
        tmp.push(record)
        if (record[obj.children] && record[obj.children].length > 0) {
            let children = DataTransfer.treeToArray(record[obj.children], record, _level, expandedAll, obj)
            tmp = tmp.concat(children)
        }
    })
    return tmp
}

export default DataTransfer