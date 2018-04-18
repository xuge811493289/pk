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
        label: '1班',
        prop: 'check1',
        width: '180',
        checkProp: 'check1'
    },
    {
        label: '2班',
        prop: 'check2',
        width: '180',
        checkProp: 'check2'
    },
    {
        label: '3班',
        prop: 'check3',
        width: '180',
        checkProp: 'check3'
    },
    {
        label: '4班',
        prop: 'check4',
        width: '180',
        checkProp: 'check4'
    },
    {
        label: '4班',
        prop: 'check5',
        width: '180',
        checkProp: 'check5'
    }
];
export default {
    treeData,
    taableColums
}