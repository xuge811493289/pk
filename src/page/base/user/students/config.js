const list = [{
    label: "账号",
    prop: "loginName",
    align: 'left',
    width: ""
}, {
    label: "学号",
    prop: "number",
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
    label: "年级",
    prop: "gradeName",
    align: 'left',
    width: ""
}, {
    label: "班级",
    prop: "className",
    align: 'left',
    width: ""
}, {
    label: "学生类型",
    prop: "studentTypeName",
    align: 'left',
    width: ""
}, {
    label: "状态",
    prop: "status",
    align: 'center',
    width: "70"
}]

const treeData = [{
    id: 1,
    label: '上海市徐汇教育局',
    children: [{
            id: 2,
            label: '上海市徐汇中学',
            children: [{
                    id: 3,
                    label: '高一',
                    children: [{
                            id: 6,
                            label: '高一(1)班',
                        },
                        {
                            id: 6,
                            label: '高一(2)班',
                        },
                    ]
                },
                {
                    id: 4,
                    label: '高二'
                },
                {
                    id: 5,
                    label: '高三'
                }
            ]
        },
        {
            id: 2,
            label: '上海市南洋中学',
            children: [{
                    id: 7,
                    label: '预初'
                },
                {
                    id: 8,
                    label: '初一'
                }, {
                    id: 9,
                    label: '初二'
                }, {
                    id: 10,
                    label: '初三'
                }, {
                    id: 11,
                    label: '高一'
                }, {
                    id: 12,
                    label: '高二'
                }, {
                    id: 13,
                    label: '高三'
                }
            ]
        }
    ]
}]
const excelTable = [{
    a1: 'zhangsan',
    a2: '张三',
    a3: '男',
    a4: '普通学生',
    a5: '11051004',
    a6: '18302925996',
    a7: '115412255885225',
    a8: '123456',
    a9: '2002/3/5',
    a10: '老张',
    a11: 'jz001',
    a12: '111111',
    a13: '18302925995',
    a14: 'xxxxxxxxxxxxx',
    a15: '高一',
    a16: '1班',
    a17: '221'
}, {
    a1: 'zhangsan',
    a2: '张三',
    a3: '男',
    a4: '普通学生',
    a5: '11051004',
    a6: '18302925996',
    a7: '115412255885225',
    a8: '123456',
    a9: '2002/3/5',
    a10: '老张',
    a11: 'jz001',
    a12: '111111',
    a13: '18302925995',
    a14: 'xxxxxxxxxxxxx',
    a15: '高一',
    a16: '1班',
    a17: '221'
}, {
    a1: 'zhangsan',
    a2: '张三',
    a3: '男',
    a4: '普通学生',
    a5: '11051004',
    a6: '18302925996',
    a7: '115412255885225',
    a8: '123456',
    a9: '2002/3/5',
    a10: '老张',
    a11: 'jz001',
    a12: '111111',
    a13: '18302925995',
    a14: 'xxxxxxxxxxxxx',
    a15: '高一',
    a16: '1班',
    a17: '221'
}, {
    a1: 'zhangsan',
    a2: '张三',
    a3: '男',
    a4: '普通学生',
    a5: '11051004',
    a6: '18302925996',
    a7: '115412255885225',
    a8: '123456',
    a9: '2002/3/5',
    a10: '老张',
    a11: 'jz001',
    a12: '111111',
    a13: '18302925995',
    a14: 'xxxxxxxxxxxxx',
    a15: '高一',
    a16: '1班',
    a17: '221'
}, {
    a1: 'zhangsan',
    a2: '张三',
    a3: '男',
    a4: '普通学生',
    a5: '11051004',
    a6: '18302925996',
    a7: '115412255885225',
    a8: '123456',
    a9: '2002/3/5',
    a10: '老张',
    a11: 'jz001',
    a12: '111111',
    a13: '18302925995',
    a14: 'xxxxxxxxxxxxx',
    a15: '高一',
    a16: '1班',
    a17: '221'
}, ]
const excelTable1 = [{
        a1: 'zhangsan',
        a2: '张三',
        a3: '男',
        a4: '11051004',
    },
    {
        a1: 'zhangsan',
        a2: '张三',
        a3: '男',
        a4: '11051004',
    }
]
export default {
    treeData,
    list,
    excelTable,
    excelTable1
}