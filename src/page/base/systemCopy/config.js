const appData = [{
  name: "基础系统",
  type: "内部应用",
  code: "base",
  icon: "base.png",
  entryUrl: "/base",
  cancelUrl: "/base/logout",
  mode: "",
  clientId: "",
  clientSecret: "",
  secret:false
},{
  name: "图书管理系统",
  type: "第三方应用",
  code: "ts",
  icon: "ts.png",
  entryUrl: "http://ts.shiyue.com",
  cancelUrl: "htpp://ts.shiyue.com",
  mode: "",
  clientId: "",
  clientSecret: "",
  secret: true
}]

const authData = [{
  id: 1,
  label: "基础",
  children: [{
    id:2,
    label: "教师用户列表接口"
  },{
    id:3,
    label: "部门列表接口"
  },{
    id:4,
    label: "年级班级列表接口"
  }]
}]

export default{
  appData,
  authData
}
