/* tabs头部 */
const tabs = [{
    label: '1',
    name: '任教查询',

}, {
    label: '2',
    name: '教师分组查询',

}, {
    label: '3',
    name: '课时数查询',

}];
/* 班级类型 */
const classTypes = [{
    label: '行政班',
    value: '1',
}, {
    label: '选修班',
    value: '2',
}];


/* 维度 */
const dimensions = [{
    label: '部门分组',
    value: '0'
}, {
    label: '学科分组',
    value: '1'
}, {
    label: '年级分组',
    value: '2'
}];
const teachersType = [{
    label: '人数',
    prop: 'peoples',
    width: '150',
    align: 'center'
}, {
    label: '教师名单',
    prop: 'teachers',
    width: ' ',
    align: 'left'
}];

export default {
    tabs,
    classTypes,
    teachersType,
    dimensions,
}