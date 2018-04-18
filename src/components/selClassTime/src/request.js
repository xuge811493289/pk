import request from '@/api'

//  获取星期
export function getXQ(param) {
    let url = `/api/base/codeitem/type/no_auth/` + param.code
    let params = Object.assign({}, {})
    return request('get', url, params)
}

//  获取上课时间
export function getClassTime(param) {
    let url = `/api/base/festival/no_auth`
    let params = Object.assign({}, {
        unitId: param.unitId
    })
    return request('get', url, params)
}