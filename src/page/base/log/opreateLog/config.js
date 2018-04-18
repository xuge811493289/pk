const periods = [{
    value: 'ALL',
    label: '全部时间',
}, {
    value: 'NEARLY_HOUR',
    label: '近一小时',
}, {
    value: 'NEARLY_THOURS',
    label: '近三小时',
}, {
    value: 'NEARLY_DAY',
    label: '最近一天',
}, {
    value: 'NEARLY_TDAYS',
    label: '最近三天',
}, {
    value: 'NEARLY_MONTH',
    label: '最近一月',
}, {
    value: 'NEARLY_TMONTHS',
    label: '最近三月',
}, {
    value: 'NEARLY_YEAR',
    label: '最近一年',
}];
const states = [{
    value: '',
    label: '请选择'
}, {
    value: '0',
    label: '失败'
}, {
    value: '1',
    label: '成功'
}];
const appColumn = [{
    label: "操作人",
    prop: "userName",
    align: "center",
    width: "210",
}, {
    label: "登录IP",
    prop: "loginIp",
    align: "center",
    width: "120",
}, {
    label: "操作模块",
    prop: "logDetails",
    align: "left",
    width: "200",
}, {
    label: "操作日志",
    prop: "logging",
    align: "left",
    width: "",
}, {
    label: "是否操作成功",
    prop: "logSuc",
    align: "center",
    width: "130",
}, {
    label: "操作时间",
    prop: "logRequestTime",
    align: "center",
    width: "170",
}];

export default {
    periods,
    states,
    appColumn
};