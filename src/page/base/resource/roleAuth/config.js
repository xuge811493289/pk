const treeData = [{
    id: 1,
    label: '上海市徐汇教育局',
    children: [{
            id: 2,
            label: '上海市徐汇中学',
            children: []
        },
        {
            id: 3,
            label: '上海市南洋中学',
            children: []
        }
    ]
}];
const taableColums = [{
        label: '序号',
        prop: 'sort',
        width: '70',
        align: 'center'
    },
    {
        label: '角色名称',
        prop: 'name',
        width: '',
        align: 'left'
    },
    {
        label: '角色类型',
        prop: 'roleType',
        width: '120',
        align: 'left'
    },
    {
        label: '是否激活',
        prop: 'status',
        width: '95',
        align: 'center'
    },
    {
        label: '角色描述',
        prop: 'memo',
        width: '',
        align: 'left'
    }
];
export default {
    treeData,
    taableColums
}