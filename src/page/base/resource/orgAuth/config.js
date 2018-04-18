const treeData = [{
    id: 1,
    label: '上海师悦信息科技学校',
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
export default {
    treeData
}