import request from '../../../api'

export const ERR_OK = 'ok'

// 查询登录页面配置
export let getLoginConfig = (params) => {
    return request('get', '/api/base/login/config', params)
}

// 保存登录页面配置
export let saveLoginConfig = (params) => {
    return request('post', '/api/base/login/config', params)
};
// 获得默认信息
export let getDefaultLoginConfig = () => {
    let result = new Promise((resolve, reject) => {
        request('get', '/api/uaa/oauth/login/config').then(((data) => {
            if (data && data.code === 'ok') {
                resolve(data)
            } else {
                reject(data);
            }

        }))
    })
    return result
}
const ipURL = `/api/base/ipgroup`
    //  获取ip段表格数据

export function getTableData() {
    const params = Object.assign({}, {})
    return request('get', ipURL, params)
}

//  增加ip段
export function addIpConfig(param) {
    const params = Object.assign({}, param)
    return request('post', ipURL, params)
}

// 修改ip段
export function editIpConfig(param) {
    let url = ipURL + `/${param.id}`
    const params = Object.assign({}, {
        begin: param.begin,
        end: param.end,
        detail: param.detail
    })
    return request('put', url, params)
}

//  删除ip段
export function delIpConfig(param) {
    let url = ipURL + `/${param.id}`
    const params = Object.assign({}, param)
    return request('DELETE', url, params)
}
//  根据id查询ip
export function getIpById(param) {
    let url = ipURL + `/${param.id}`
    const params = Object.assign({}, {})
    return request('get', url, params)
}
//
//function params(data) {
//  if (!data) {
//    return
//  }
//  let params = Object.assign({}, data)
//  return params
//}

// *****************************知识点配置**********************************************


//  获取grade数据
export function getUnitTree(param) {
    let url = `/api/base/gradeTree`
    const params = Object.assign({}, {})
    return request('get', url, params)
}

//  获取学段数据
export function getPeriod(param) {
    let url = `/api/base/stage/unit`
    const params = Object.assign({}, {
        unitId: param.unitId
    })
    return request('get', url, params)
}

//  获取年级数据
export function getGrade(param) {
    let url = `/api/base/grade/active`
    const params = Object.assign({}, {
        unitId: param.unitId,
        stageId: param.period
    })
    return request('get', url, params)
}

//  获取知识点数据
export function getKnowPoint(param) {
    let url = `/api/base/knowpoint/tree`
    const params = Object.assign({}, {
        gradeId: param.grade,
        unitId: param.unitId
    })
    return request('get', url, params)
}

//  新增一级节点
export function addKnowPointRoot(param) {
    let url = `/api/base/knowpoint/root`
    const params = Object.assign({}, {
        courseIds: param.courseIds.join(","),
        gradeId: param.grade,
        unitId: param.unitId
    })
    return request('post', url, params)
}

//  获取课程选项
export function getClass(param) {
    let url = `/api/base/grade_course_r`
    const params = Object.assign({}, {
        gradeId: param.grade,
        yearValue: param.yearValue,
        termValue: param.termValue,
        unitId: param.unitId

    })
    return request('get', url, params)
}

//  学段类
export class Periods {
    constructor({ id, name }) {
        this.value = id
        this.label = name
        this.sort = id
    }
}
//  指定单位下批量新增知识点
export function addPoint(param) {
    let url = `/api/base/knowpoint/batch`;
    return request('post', url, param)
}

//  修改知识点
export function editPoint(param) {
    let url = `/api/base/knowpoint/` + `${param.id}`
    const params = Object.assign({}, {
        name: param.name
    })
    return request('put', url, params)
}

//  删除知识点
export function delPoint(param) {
    let url = `/api/base/knowpoint/` + `${param.id}`
    const params = Object.assign({}, {})
    return request('DELETE', url, params)
}

//  根据父级节点判断是否存在
export function checkPoint(param) {
    let url = `/api/base/knowpoint/exists`
    const params = Object.assign({}, {
        unitId: param.unitId,
        name: param.name
    })
    return request('get', url, params)
}

//  根据id查询知识点
export function getPointById(param) {
    let url = `/api/base/knowpoint/` + `${param.id}`
    const params = Object.assign({}, {})
    return request('get', url, params)
}