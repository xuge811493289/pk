import request from '../../../../api'

function getTree(params){
  return request("GET",'/api/base/unitTree',params);
};
function getTable(params){
  return request("GET",'/api/base/teachingPreparationOrganization',params);
};
function addData(params){
  return request("POST",'/api/base/teachingPreparationOrganization',params);
};
function getCourse(params){
  return request("GET",'/api/base/course/active?unitId='+params);
};
function getGrade(params){
  return request("GET",'/api/base/grade?unitId='+params);
};
function getStage(params){
  return request("GET",'/api/base/stage/unit?unitId='+params);
};
function editData(params){
  return request("PUT",'/api/base/teachingPreparationOrganization',params);
};
function delData(params){
  return request("DELETE",'/api/base/teachingPreparationOrganization?orgId='+params);
};
function getBKZ(params){
  return request("GET",'/api/base/LessonPreparationGroup?orgId='+params);
};
function addBKZ(params){
  return request("POST",'/api/base/prepareLessons',params);
};
function editBKZ(params){
  return request("PUT",'/api/base/prepareLessons/'+params.id,params);
};
function delBKZ(params){
  return request("DELETE",'/api/base/prepareLessons/'+params);
};
function BKZExist_add(params){
  return request("GET",'/api/base/prepareLessons/nameExistSave?name='+params.name+'&orgId='+params.orgId);
};
function BKZExist_edit(params){
  return request("GET",'/api/base/prepareLessons/nameExistUpdate?name='+params.name+'&orgId='+params.orgId+"&lessonId="+params.lessonId);
};
function JYExist_add(params) {
  return request("GET",'/api/base/org/NameExist',params);
};
const tableList=[{
  prop:"sort",
  label:"序号",
  label1:"序号",
  width:""
},{
  prop:"name",
  label:"教研组名称",
  label1:"教研组名称",
  width:""
},{
  prop:"cNames",
  label:"学科",
  label1:"学科",
  width:""
},{
  prop:"gNames",
  label:"年级",
  label1:"学段",
  width:""
},{
  prop:"managerName",
  label:"教研组组长",
  label1:"教研组组长",
  width:""
},{
  prop:"contactPhone",
  label:"电话号码",
  label1:"电话号码",
  width:""
}];
const settingTableList=[{
  prop:"sort",
  label:"序号",
  width:""
},{
  prop:"name",
  label:"备课组名称",
  width:""
},{
  prop:"cNames",
  label:"学科",
  width:""
},{
  prop:"userName",
  label:"备课组长",
  width:""
},{
  prop:"contact",
  label:"电话号码",
  width:""
}];
// const year = [{
//   id:1,
//   label:"2015-2016学年"
// },{
//   id:2,
//   label:"2016-2017学年"
// },{
//   id:3,
//   label:"2017-2018学年"
// }];
// const term=[{
//   id:1,
//   label:"第一学期"
// },{
//   id:2,
//   label:"第二学期"
// }];
export default {
  getTree,
  getTable,
  addData,
  getCourse,
  getGrade,
  getStage,
  editData,
  delData,
  getBKZ,
  addBKZ,
  editBKZ,
  delBKZ,
  BKZExist_add,
  BKZExist_edit,
  JYExist_add,
  // treeData,
  // year,
  // term,
  tableList,
  settingTableList,
}
