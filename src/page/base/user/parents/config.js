const list = [{
    label: "账号",
    prop: "loginName",
    width: ""
}, {
    label: "姓名",
    prop: "realName",
    width: ""
}, {
    label: "子女",
    prop: "childName",
    width: ""
}, {
    label: "联系电话",
    prop: "loginMobile",
    width: ""
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

export default {
    treeData,
    list
}