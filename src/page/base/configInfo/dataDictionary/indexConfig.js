import request from '../../../../api'
const tableList=[{
  label:"字段名称",
  prop:"name",
  width:""
},{
  label:"字段编码",
  prop:"id",
  width:""
},{
  label:"说明",
  prop:"instruction",
  width:""
}];
function getTableData(params){
  return request('GET','/api/base/codeitem/types',params);
};
export default {
  tableList,
  getTableData
}
// const selectList=[{
//   label: "通知公告",
//   prop: "notice",
//   width: "",
//   children:[{
//     label:"标题1",
//     prop:"a1",
//     width:""
//   },{
//     label:"标题2",
//     prop:"a2",
//     width:"",
//   },{
//     label:"标题3",
//     prop:"a3",
//     width:"",
//   }]
// }, {
//   label: "设备报修",
//   prop: "repair",
//   width: "",
//   children:[{
//     label:"标题4",
//     prop:"a1",
//     width:"",
//     children:[{
//       label:"序号",
//       prop:"ordinal",
//       width:""
//     },{
//       label:"字段名称",
//       prop:"name",
//       width:""
//     },{
//       label:"字段编码",
//       prop:"code",
//       width:""
//     },{
//       label:"说明",
//       prop:"instruction",
//       width:""
//     }]
//   },{
//     label:"标题5",
//     prop:"a2",
//     width:"",
//   },{
//     label:"标题6",
//     prop:"a3",
//     width:"",
//   }]
// }, {
//   label: "学籍管理",
//   prop: "administrate",
//   width: "",
//   children:[{
//     label:"标题7",
//     prop:"a1",
//     width:"",
//     children:[{
//       label:"序号",
//       prop:"ordinal",
//       width:""
//     },{
//       label:"字段名称",
//       prop:"name",
//       width:""
//     },{
//       label:"字段编码",
//       prop:"code",
//       width:""
//     },{
//       label:"说明",
//       prop:"instruction",
//       width:""
//     }]
//   },{
//     label:"标题8",
//     prop:"a2",
//     width:"",
//   },{
//     label:"标题9",
//     prop:"a3",
//     width:"",
//   }]
// }];

// export default {
//   tableList,
//   selectList
// }
