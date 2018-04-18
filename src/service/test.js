import request from '../api';

//<--------------------------------数据获取(列表，增删改查)------------------------->
function getUnitList(params) {
    return request('GET','/api/base/unit', params);
}
function addUnitList(params) {
    return request('POST', '/api/base/unit', params);
}
function updataUnitList(id, params) {
    return request('PUT', '/api/base/unit' + id, params); 
}
function deleteUnitList(params) {
    return request('DELETE', '/api/base/unit/{id}' + params, '');
}
function deleteUnitAllList(params) {
    return request('POST', '/api/base/unit/delete' + params, '');
}


//function getOrganizationList(params) {
//  return request('get', '/api/security/orgs', params);
//}
//
//function addnewOrganization(params) {
//  return request('post', '/api/security/org', params);
//}
//
//function deleteOrganization(params) {
//  return request('delete', '/api/security/org/' + params, '');
//}
//
//function updataOrganization(id, params) {
//  return request('put', '/api/security/org/' + id, params);
//}
//<--------------------------抛出方法------------------------->
export default {
    //抛出方法2
     getUnitList(unitId) {
        return getUnitList(unitId);
    },
    addUnitList(params) {
        return addUnitList(params);
    },
    deleteUnitList(params) {
        return deleteUnitList(params);
    },
    updataUnitList(id, params) {
        return updataUnitList(id, params);
    },
    deleteUnitAllList(params) {
    	return deleteUnitAllList(params);
	}
    //<----------------------------------------->
//  getOrganizationList(params) {
//      return getOrganizationList(params);
//  },
//  addnewOrganization(params) {
//      return addnewOrganization(params);
//  },
//  deleteOrganization(params) {
//      return deleteOrganization(params);
//  },
//  updataOrganization(id, params) {
//      return updataOrganization(id, params);
//  },
}