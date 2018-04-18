import request from '../../../../api'

export const ERR_OK = 'ok'

//  获得单位树
export function getUnit() {
  let url = `/api/base/unitTree`
  const params = Object.assign({}, {})
  return request('get', url, params)
}

//  获取当前年度
export function getCurrentYear(param) {
  let url = `/api/base/findYear`
  const params = Object.assign({}, {
    unitId: param.unitId
  })
  return request('get', url, params)
}

//  获取当前单位所有年度
export function getAllYear(param) {
  let url = `/api/base/years`
  const params = Object.assign({}, {
    unitId : param.unitId
  })
  return request('get', url, params)
}

// 根据单位年度查询学期
export function getTerm(param) {
  let url = `/api/base/term`
  const params = Object.assign({}, {
    unitId: param.unitId,
    year: param.year
  })
  return request('get', url, params)
}

//根据主键id修改学期
export function editTerm(param) {
  let url = `/api/base/term`
  const params = Object.assign({}, {
    id: param.id,
    beginDate: param.beginDate,
    endDate: param.endDate,
    isCurrent: param.isCurrent
  })
  return request('put', url, params)
}

//  根据id查询学期
export function getTermById(param) {
  let url = `/api/base/term/` + `${param.id}`
  const params = Object.assign({}, {})
  return request('get', url, params)
}
