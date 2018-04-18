import request from '../../../../api'
export const ERR_OK = 'ok'

//  获取模块数据
export function getAppModule() {
  let url = `/api/base/resource/application_module`
  const params = Object.assign({}, {})
  return request('get', url, params)
}

//  根据code获取当前用户资源树
export function getResTree(param) {
  let url = `/api/base/resource/code/tree`
  const params = Object.assign({}, {
    code: param.code,
    flag: 1
  })
  return request('get', url, params)
}

//  增加资源
export function addRes(param) {
  let url = `/api/base/resource`
  const params = Object.assign({}, {
    parentId: param.parentId,
    name: param.name,
    opener: param.opener,
    indexUrl: param.indexUrl,
    sort: param.sort
  })
  return request('post', url, params)
}

//  修改资源
export function editRes(param) {
  let url = `/api/base/resource`
  const params = Object.assign({}, {
    id: param.id,
    name: param.name,
    opener: param.opener,
    indexUrl: param.indexUrl,
    sort: param.sort
  })
  return request('put', url, params)
}

//  删除资源
export function delRes(param) {
  let url = `/api/base/resource/` +  `${param.id}`
  const params = Object.assign({}, {})
  return request('DELETE', url, params)
}

//  添加时校验
export function checkAdd(param) {
  let url = `/api/base/resource/check`
  const params = Object.assign({}, {
    name: param.name,
    parentId: param.parentId
  })
  return request('get', url, params)
}

//  修改时校验
export function checkEdit(param) {
  let url = `/api/base/resource/check`
  const params = Object.assign({}, {
    flag: true,
    name: param.name,
    parentId: param.parentId,
    id: param.id
  })
  return request('get', url, params)
}

//  根据id查询当前资源
export function getResById(param) {
  let url = `/api/base/resource/id`
  const params = Object.assign({}, {
    id: param.id
  })
  return request('get', url, params)
}
