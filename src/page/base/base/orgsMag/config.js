import request from '../../../../api'

//表头
const orgList = [{
  label:"序号",
  prop:"sort",
  width:"80px"
},{
    label: "部门名称",
    prop: "name",
    width: ""
}, {
    label: "部门负责人",
    prop: "managerName",
    width: ""
},{
    label: "联系电话",
    prop: "contactPhone",
    width: ""
}];

//获取部门树
function getTree() {
  return request("GET",'/api/base/orgTree');
};

//获取单位下的部门
function getTable(params) {
  return request("GET",'/api/base/org?'+(params.type==='organization'?'parentId=':'unitId=')+params.id);
};
//根据unitId获取单位
function getUnit(params) {
  return request("GET",'/api/base/unit/'+params);
};

//根据id获取部门详情
function getOrg(params) {
  return request("GET",'/api/base/org/'+params);
};

//验证Name和Code是否重复
function NameExistSave(params) {
  return request("GET",'/api/base/org/NameExist',params);
};
function CodeExistSave(params) {
  return request("GET",'/api/base/org/CodeExist',params);
};

//修改部门
function editData(params) {
  return request("PUT",'/api/base/org',params);
};

//新增部门
function addData(params){
  return request("POST",'/api/base/org',params);
};

//删除部门
function delData(params){
  return request("DELETE",'/api/base/org/'+params);
};

export default {
  getTree,
  getTable,
  getUnit,
  getOrg,
  editData,
  addData,
  delData,
  NameExistSave,
  CodeExistSave,
  orgList
}
