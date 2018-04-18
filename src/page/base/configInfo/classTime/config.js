import request from '../../../../api'
function getTree(params){
  return request("GET",'/api/base/unitTree',params);
};
function getTable(params){
  return request("GET",'/api/base/festival',params);
};
function addRow(params){
  return request("POST",'/api/base/festival',params);
};
function editRow(params){
  return request('PUT','/api/base/festival/'+params.id,params);
}
function deleteData(params){
  return request("DELETE",'/api/base/festival/'+params);
};
function getWeeks(){
  return request("GET",'/api/base/codeitem/type/XQ');
};
function setInit(params){
  return request("GET",'/api/base/festival/init?unitId='+params.unitId+'&type='+params.type);
};
function checkName(params){
  return request("GET",'/api/base/festival/exists',params);
};
function beforeEdit(params){
  return request('GET','/api/base/festival/'+params);
}
const tableList=[{
  label:"序号",
  prop:"sort",
  width:""
},{
  label:"名称",
  prop:"name",
  width:""
},{
  label:"开始时间",
  prop:"begin",
  width:""
},{
  label:"结束时间",
  prop:"end",
  width:""
},{
  label:"适用星期",
  prop:"weekRModels",
  width:"300px"
}]
export default {
  getTree,
  getTable,
  addRow,
  editRow,
  deleteData,
  getWeeks,
  setInit,
  checkName,
  beforeEdit,
  tableList
}
