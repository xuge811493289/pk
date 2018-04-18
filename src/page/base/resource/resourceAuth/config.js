const options = [{
    id:1,
    label:'基础模块',
    URL:'',
    openStyle:'0',
    children: [{
      id:2,
      label: '基础设置',
      URL:'',
      openStyle:'0',
      children: [{
        id:3,
        label: '单位管理',
        URL:'',
        openStyle:'0',
        children: [{
          id:5,
          label: '管理'
        },{
          id:6,
          label: '查询'
        }]
      },{
        id:4,
        label:'年度学期',
        URL:'',
        openStyle:'0',
        children: [{
          id:7,
          label:'增加',
        },{
          id:8,
          label:'修改'
        }]
      }]
    }]
    }]



const defaultProps = {
  children: 'children',
  label: 'name'
  }





export default {
  defaultProps,
  options
}
