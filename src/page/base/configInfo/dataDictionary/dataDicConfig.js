import request from '../../../../api'

function getTableData(params) {
  return request('GET','/api/base/codeitem/type/'+params);
};
function deleteRow(params){
  return request("DELETE",'/api/base/codeitem/'+params);
};
function changeStatus(params){
  return request("PUT",'/api/base/codeitem/status/'+params.id,params);
};
function addData(params){
  return request("POST",'/api/base/codeitem',params);
};
function editData(params){
  return request("PUT",'/api/base/codeitem/'+params.id,params);
};
function checkName(params){
  return request("GET",'/api/base/codeitem/name/exists',params);
};
function checkNum(params){
  return request("GET",'/api/base/codeitem/value/exists',params);
}
const tableList=[{
  label: "代码编号",
  prop: "value",
  width: ""
}, {
  label: "代码名称",
  prop: "name",
  width: ""
},{
  label: "代码序号",
  prop: "sort",
  width: ""
},{
    label: "代码说明",
    prop: "details",
    width: ""
},{
  label: "当前状态",
  prop: "status",
  width: "90px",
  isBtn:true
}];
export default {
  tableList,
  getTableData,
  deleteRow,
  changeStatus,
  addData,
  editData,
  checkName,
  checkNum
}
