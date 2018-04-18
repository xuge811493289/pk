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
const gradeColums = [{
        label: '课程名称',
        prop: 'courseName'
    },
    {
        label: '课程简称',
        prop: 'courseShortName'
    },
    {
        label: '所属分类',
        prop: 'typeName'
    },
    {
        label: '周课时数',
        prop: 'weekHour'
    },
    {
        label: '总课时数',
        prop: 'sumHour'
    },
    {
        label: '课程级别',
        prop: 'courseLevel'
    }
];
const classColums = [{
        label: '课程名称',
        prop: 'courseName'
    },
    {
        label: '课程简称',
        prop: 'courseShortName'
    },
    {
        label: '所属分类',
        prop: 'typeName'
    },
    {
        label: '周课时数',
        prop: 'weekHour'
    },
    {
        label: '课程级别',
        prop: 'courseLevel'
    }
];
export default {
    treeData,
    gradeColums,
    classColums
}