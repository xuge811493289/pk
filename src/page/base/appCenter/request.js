import request from '../../../api'
export const ERR_OK = 'ok'

//  获取应用中心列表数据
export function getAppList(param) {
    let url = `/api/base/oauthClientDetails`
    const params = Object.assign({}, {})
    return request('get', url, params)
}

//  获取详情列表数据
export function getTipList(param) {
    let url = `/api/base/oauthClientDetails/` + `${param.clientId}`
    const params = Object.assign({}, {})
    return request('get', url, params)
}

//  删除应用中心列表
export function delAppList(param) {
    let url = `/api/base/oauthClientDetails/` + `${param.clientId}`
    const params = Object.assign({}, {})
    return request('DELETE', url, params)
}

//  获取授权数据
export function getAuth(param) {
    let url = `/api/base/api/api_app/` + `${param.clientId}`
    const params = Object.assign({}, {})
    return request('get', url, params)
}

//  提交授权数据
export function postAuth(param) {
    let url = `/api/base/api/api_grant_r`
    const params = Object.assign({}, {
        clientId: param.clientId,
        ids: param.ids
    })
    return request('post', url, params)
}

//  修改应用数据
export function postAppInfo(param) {
    let url = `/api/base/oauthClientDetails`
    const params = Object.assign({}, param)
    return request('put', url, params)
}

//  根据clientid获取服务数据
export function getSerByClientId(param) {
    let url = `/api/base/oauthClientDetails/service/` + `${param.clientId}`
    const params = Object.assign({}, {})
    return request('get', url, params)
}

//  提交编辑服务授权
export function postSerAuth(param) {
    let url = `/api/base/oauthClientDetails/service`
    const params = Object.assign({}, {
        clientId: param.clientId,
        serviceIds: param.serviceIds
    })
    return request('post', url, params)
}

// ---------------------服务管理------------------
// 获取列表
export function getServerList(params) {
    return request('get', '/api/base/service', params)
};
// 新增
export function saveServer(params) {
    return request('post', '/api/base/service', params)
};
// 校验id
export function checkedServerId(params) {
    return request('get', '/api/base/service/check', params)
};
// 修改
export function updateServer(params) {
    return request('put', '/api/base/service/update', params)
};
// 删除
export function deleteServer(id) {
    return request('delete', '/api/base/service/' + id, '')
};
// 获得服务
export function getServer(id) {
    return request('get', '/api/base/service/' + id, '')
};

// ---------------------api管理------------------

// 获取列表
export function getApiList(params) {
    return request('get', '/api/base/api/page', params)
};

// 获取列表byid
export function getApiById(id) {
    return request('get', '/api/base/api/' + id, '')
};

//通过api得到已经勾选的权限操作码
export function getApiChice(apiId) {
    return request('get', '/api/base/api/authority/choice', { apiId })
};

//api资源与权限操作码的关系保存
export function saveMoreApiCodes(params) {
    return request('post', '/api/base/api/authority', params)
};

// 新增
export function saveApiList(params) {
    return request('post', '/api/base/api', params)
};

// 修改
export function updateApi(params) {
    return request('put', '/api/base/api', params)
};

//授权查看与授权
export function checkApiAuth(clientId) {
    return request('get', '/api/base/api/api_app/' + clientId, '')
};

//授权
export function giveApiAuth(clientId, ids) {
    return request('post', '/api/base/api/api_grant_r', { clientId, ids })
};

//删除api
export function deleteApi(id) {
    return request('delete', '/api/base/api/' + id, '')
};

// 得到已勾选的api资源与权限操作码的树
export function getApiConectTree(id) {
    return request('get', '/api/base/api/authority', { id })
};

// 删除
export function deleteApiConect(params) {
    return request('post', '/api/base/api/authority/del', params)
};

// ---------------------操作码管理------------------

// 获取列表
export function getCodeList(params) {
    return request('get', '/api/base/authority', params)
};

// 获取列表byid
export function getCodeById(id) {
    return request('get', '/api/base/authority/' + id, '')
};

// 获取列表fenye
export function getCodeListBy(params) {
    return request('get', '/api/base/authority/page', params)
};

// 添加
export function saveCode(params) {
    return request('post', '/api/base/authority', params)
};

// 修改
export function updataCode(params) {
    return request('put', '/api/base/authority', params)
};

//删除
export function deleteCode(id) {
    return request('delete', '/api/base/authority/' + id, '')
};

//校验操作码
export function checkCode(params) {
    return request('get', '/api/base/authority/check', params)
};

//搜索指定操作码
export function searchCodeBy(params) {
    return request('get', '/api/base/authority/search', params)
};

//查询服务所有的controller
export function getSearchController(serviceId) {
    return request('get', '/api/base/authority/controller', { serviceId })
};

// ---------------------资源管理------------------

//通过code查询内部资源
export function getRcTreeByCodeTree(code) {
    return request('get', '/api/base/resource/inside/tree', { code })
};

//保存内部资源
export function saveInsideRc(params) {
    return request('post', '/api/base/resource/inside', params)
};

//应用模块查询
export function getApplicationModels(code) {
    return request('get', '/api/base/resource/application_module', { code })
};

//通过id查询资源
export function getRcById(id) {
    return request('get', '/api/base/resource/inside', { id })
};

//根据上级节点得到子节点的所有可以的资源类型
export function getResourceType(parentId) {
    return request('get', '/api/base/resource/inside/resourceType', { parentId })
};

// 修改
export function updataInsideRc(params) {
    return request('put', '/api/base/resource/inside', params)
};

// 资源添加/修改名称校验
export function checkRcNameUniq(params) {
    return request('get', '/api/base/resource/check', params)
};

// 资源编码校验
export function checkRcCodeUniq(params) {
    return request('get', '/api/base/resource/check', params)
};

// 删除内部资源
export function deleteInsideRc(id) {
    return request('delete', '/api/base/resource/inside/' + id, '')
};

// 通过code查询资源关联的操作码
export function getCodeByCodes(params) {
    return request('get', '/api/base/resource/inside/authority', params)
};

// 通过code查询资源关联的操作码树
export function getCodeByCodesTree(id) {
    return request('get', '/api/base/resource/authority/tree', { id })
};

// 保存code资源关联的操作码
export function saveCodeByCodes(params) {
    return request('post', '/api/base/resource/inside/authority', params)
};

// 删除code资源关联的操作码
export function deleteCodeByCodes(params) {
    return request('post', '/api/base/resource/inside/authority/del', params)
};

// 效验code
export function checkCodes(params) {
    return request('get', '/api/base/resource/inside/check', params)
};