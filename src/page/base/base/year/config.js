const treeData = [{
	type:1,
    label: '上海市徐汇教育局',
    children: [{
    			 type:2,
           		 label: '上海市徐汇中学',
           	}]
        }
]
const options=[{
      value: '1994-1995学年',
      label: '1994-1995学年'
    }, {
      value: '1995-1996学年',
      label: '1995-1996学年'
    }, {
      value: '1996-1997学年',
      label: '1996-1997学年'
    }, {
      value: '1997-1998学年',
      label: '1997-1998学年'
    }, {
      value: '1998-1999学年',
      label: '1998-1999学年'
    }]
const parentList=[{
		value: '1994-1995学年',
    label: '1994-1995学年',
    children:[{
    label: "学期名称",
    prop: "shName",
    width: ""
}, {
    label: "开始日期",
    prop: "startDate",
    width: ""
}, {
    label: "结束日期",
    prop: "endDate",
    width: ""

  }]
},{
	value: '1995-1996学年',
    label: '1995-1996学年',
    children:[{
    label: "学期名称",
    prop: "shName",
    width: ""
}, {
    label: "开始日期",
    prop: "startDate",
    width: ""
}, {
    label: "结束日期",
    prop: "endDate",
    width: ""

  }]
}]
const yearList = [{
    label: "年度",
    prop: "year",
    width: "",
    is: true
}, {
    label: "年度值",
    prop: "yearVal",
    width: "",
    is: false
}]
const shList = [{
    label: "学期名称",
    prop: "shName",
    width: "",
    is: true
}, {
    label: "学期值",
    prop: "shVal",
    width: "",
    is: false
}]
export default {
    treeData,
    parentList,
	options,
	yearList,
	shList
}
