import request from '../../../api';

/*************************************权限一览表******************************************* */

// 查看用户具有的栏目
export let getResourceTreeByUserId = (id) => {
    return request('get', '/api/base/resource/tree/' + id, '');
};

// 查看用户组织角色
export let getUserOrgRoleList = (params) => { // page - start
    return request('get', '/api/base/resource/user_org_role', params);
};

/**************************************组织授权******************************************** */

// 查询组织部门tree
export let getTree = (params) => {
    return request('get', '/api/base/orgTree', params);
};

// 授权资源树
export let getResoureTree = (id) => {
    return request('get', '/api/base/resource/unit/tree/' + id, '');
};

// 组织资源授权的选中的id集合
export let getChoiceOrgresource = (orgId) => {
    return request('get', '/api/base/org_resource/choice/' + orgId, '');
};

// 组织资源授权
export let saveOrgRes = (params) => {
    return request('post', '/api/base/org/res', params);
};

/**************************************角色授权******************************************** */

// 查询组织树
export let getUnitTree = (params) => {
    return request('get', '/api/base/unitTree', params);
};

// 查询是否重名
export let checkNameIsRepeat = (unitId, name) => {
    return request('get', '/api/base/role/same', { unitId, name });
};

// 查询角色列表
export let getRolesList = (unitId) => {
    return request('get', '/api/base/role', { unitId });
};

// 通过id查询角色
export let getRoleById = (id) => {
    return request('get', '/api/base/role/' + id, '');
};

// 新增角色
export let addnewRole = (params) => {
    return request('post', '/api/base/role', params);
};

// 修改角色
export let updataRole = (params) => {
    return request('put', '/api/base/role', params);
};

// 删除角色
export let deleteRoles = (ids) => {
    return request('post', '/api/base/role/batch', { ids });
}

// 锁定角色
export let lockRole = (ids) => {
    return request('put', '/api/base/role/lock', { ids });
};

// 激活角色
export let unlockRole = (ids) => {
    return request('put', '/api/base/role/unlock', { ids });
};

// 角色资源授权
export let roleRresMinix = (unitId, roleIds, resIds) => {
    return request('post', '/api/base/role/res', { unitId, roleIds, resIds });
};

// 查询角色资源
export let getRoleRresMinix = (roleIds, unitId) => {
    return request('get', '/api/base/role/res', { roleIds, unitId });
};