const list = [{
    label: "账号",
    prop: "loginName",
    align: 'left',
    width: ""
}, {
    label: "姓名",
    prop: "realName",
    align: 'left',
    width: ""
}, {
    label: "性别",
    prop: "gender",
    align: 'center',
    width: "70"
}, {
    label: "手机号码",
    prop: "loginMobile",
    align: 'left',
    width: ""
}, {
    label: "电子邮箱",
    prop: "loginEmail",
    align: 'left',
    width: ""
}, {
    label: "状态",
    prop: "status",
    width: "70",
    align: 'center'
}]

const treeData = [{
    id: 1,
    label: '上海市徐汇教育局',
    children: [{
            id: 2,
            label: '本单位部门',
            children: [{
                    id: 5,
                    label: '人事科'
                },
                {
                    id: 6,
                    label: '财务科'
                }
            ]
        },
        {
            id: 3,
            label: '上海市徐汇中学',
            children: [{
                    id: 7,
                    label: '校长室'
                },
                {
                    id: 8,
                    label: '总务处'
                },
                {
                    id: 9,
                    label: '年级部'
                }
            ]
        },
        {
            id: 4,
            label: '上海市南洋中学',
            children: [{
                id: 10,
                label: '校长室'
            }]
        }
    ]
}]

const excelTable = [{
    a1: 'zhangsan',
    a2: '张三',
    a3: '男',
    a4: '13123412546',
    a5: 'zhangsan@shiyuesoft.com',
    a6: '523324215439873254',
    a7: '123456',
    a8: '2002/3/5',
    a9: '人事部',
    a10: '111',
    a11: '幼儿园,小学',
    a12: '语文,数学'
}, {
    a1: 'zhangsan1',
    a2: '张三',
    a3: '男',
    a4: '13123412546',
    a5: 'zhangsan1@shiyuesoft.com',
    a6: '523324215439873254',
    a7: '123456',
    a8: '2002/3/5',
    a9: '人事部',
    a10: '112',
    a11: '小学',
    a12: '数学'
}, {
    a1: 'zhangsan2',
    a2: '张三',
    a3: '男',
    a4: '13123412546',
    a5: 'zhangsan2@shiyuesoft.com',
    a6: '523324215439873254',
    a7: '123456',
    a8: '2002/3/5',
    a9: '人事部',
    a10: '113',
    a11: '初中',
    a12: '化学'
}]

export default {
    treeData,
    list,
    excelTable
}