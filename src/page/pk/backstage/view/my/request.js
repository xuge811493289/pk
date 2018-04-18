import {request} from '../../request'

//  查询年度学期
export function getAllYear(param) {
    let url = `/api/base/years`
    const params = Object.assign({}, {
        unitId: param.unitId
    })
    return request('get', url, params)
}

//  获取当前年度
export function getCurrentYear(param) {
    let url = `/api/base/findYear/no_auth`
    const params = Object.assign({}, {
        unitId: param.unitId
    })
    return request('get', url, params)
}

// 根据单位年度查询学期
export function getTerm(param) {
    let url = `/api/base/term/no_auth`
    return request('get', url, param)
}

//  查询周次下拉
export function getWeeks(param) {
    let url = '/api/pk/solution/select_week'
    const params = Object.assign({}, { 
        year: param.year,
        term: param.term
    })
    return request('get', url, params)
}

//  查询我的课表
export function getMyKb(param) {
    let url = '/api/pk/sheet/my_sheet'
    const params = Object.assign({}, {
        unitId: param.unitId,
        year: param.year,
        term: param.term,
        week: param.week,
    })
    return request('post', url, params)
}

//  获取星期
export function getXQ(param) {
    let url = `/api/base/codeitem/type/no_auth/${param.code}` 
    return request('get', url)
}

//  获取上课时间
export function getClassTime(param) {
    let url = `/api/base/festival/no_auth`
    let params = Object.assign({}, {
        unitId: param.unitId
    })
    return request('get', url, params)
}