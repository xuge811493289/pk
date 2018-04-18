import api from '@/api';
export let request = (method, url, params, serializer = true) => {
    return api(method, url, params, serializer, {
        headers: {
            'Sy-Headers': 'device=pc;app=pk'
        }
    })
};

//获取单位树
function getTree(params) {
    return request("GET", '/api/base/unitTree', params);
};
//获取总学年
function getYears(params) {
    return request("GET", '/api/base/years?unitId=' + params);
};
//获取总学期
function getTerms(params) {
    return request("GET", '/api/base/term', params);
};
//获取选修班数据
function getTable(params) {
    return request("GET", '/api/base/el_class', params);
};
//修改选修班
function editTable(params) {
    return request("PUT", '/api/base/el_class', params);
};
// 获取课程类型
function getcType(params) {
    return request("GET", '/api/base/course_type?unitId=' + params);
};
//获取年级
function getGrade(params) {
    return request("GET", '/api/base/grade/active?unitId=' + params);
};
// 获取级段
function getStage(params) {
    return request("GET", '/api/base/stage/unit?unitId=' + params);
};
//新增选修班
function addData(params) {
    return request("POST", '/api/base/el_class', params);
}
//获取课程
function getClassTree(params) {
    return request("get", '/api/base/course/active', params);
}
// 根据id获取选修班
function beforeEdit(params) {
    return request("get", '/api/base/el_class/' + params);
}

//查询场地类型
function getPlaceType(params) {
    return request("get", '/api/base/placeType?unitId=' + params);
}
//查询场地
function getPlace(params) {
    return request("get", '/api/base/place', params);
}
// 查询历史选修班
function getOldClass(params) {
    return request("get", '/api/base/el_class/history', params);
}
//复制历史的选修班到当前年度
function getOldClassToCurrentYear(params) {
    return request("post", '/api/base/el_class/copy', params);
}
//分配学生
function giveStudents(params) {
    return request("POST", '/api/base/el_class/students', params);
}
//查看分配学生
function getStudents(params) {
    return request("GET", '/api/base/student/el_clazz_id', params);
}
//批量删除
function deleteData(params) {
    return request("DELETE", '/api/base/el_class/batch?ids=' + params.ids + '&unitId=' + params.unitId);
}
//重名校验
function checkName(params) {
    return request("GET", '/api/base/el_class/nameExist', params);
}


const tableList2 = [{
    label: "学号",
    prop: "number",
    width: ""
}, {
    label: "姓名",
    prop: "realName",
    width: ""
}, {
    label: "性别",
    prop: "gender",
    width: ""
}, {
    label: "年级",
    prop: "gradeName",
    width: ""
}, {
    label: "行政班",
    prop: "className",
    width: ""
}, ];
// const tableList = [{
//   label: "选修班名称",
//   prop: "name",
//   width: "117px"
// }, {
//   label: "简称",
//   prop: "shortName",
//   width: "75px"
// }, {
//   label: "开设课程名称",
//   prop: "courseName",
//   width: "132px"
// }, {
//   label: "周课时数",
//   prop: "weekHour",
//   width: "103px"
// }, {
//   label: "总课时数",
//   prop: "sumHour",
//   width: "103px"
// }, {
//   label: "上课教室",
//   prop: "classRoomName",
//   width: "103px"
// }, {
//   label: "学生来源",
//   prop: "gradeNames",
//   width: "132px"
// }, {
//   label: "课程学期",
//   prop: "courseTerm",
//   width: "103px"
// }, {
//   label: "开课学年学期",
//   propY: "yearName",
//   propT: "termName",
//   width: "142px"
// }, {
//   label: "任课教师",
//   prop: "courseTeacherNames",
//   width: "103px"
// }];
const copy = [{
    label: "选修班名称",
    prop: "name",
    width: "122px"
}, {
    label: "简称",
    prop: "shortName",
    width: "65px"
}, {
    label: "选修课程名称",
    prop: "courseName",
    width: "142px"
}, {
    label: "周课时数",
    prop: "weekHour",
    width: "93px"
}, {
    label: "总课时数",
    prop: "sumHour",
    width: "93px"
}];
var term_new = [];
for (let i = 1; i <= 12; i++) {
    term_new.push({ id: i + "" })
}
const classPlace = [{
    id: 1,
    prop: "1301教室"
}, {
    id: 2,
    prop: "1302教室"
}, {
    id: 3,
    prop: "1303教室"
}]
const excelTable2 = [{
    a1: '选修班1',
    a2: '0000001',
    a3: '张三',
}, {
    a1: '选修班1',
    a2: '0000002',
    a3: '李四',
}, {
    a1: '选修班2',
    a2: '0000003',
    a3: '王五',
}, {
    a1: '选修班3',
    a2: '0000004',
    a3: '赵六',
}, ]
const excelTable = [{
    a1: '一班',
    a3: '语文',
    a4: '张三',
    a5: '高中一年级、高中二年级',
    a6: '1',
    a7: '3',
    a8: '21',
    a9: '教学楼01-01室',
}, {
    a1: '二班',
    a3: '数学',
    a4: '李四',
    a5: '高中一年级',
    a6: '2',
    a7: '3',
    a8: '21',
    a9: '教学楼01-02室',
}]
const pageSize = 5;

export default {
    getTree,
    getYears,
    getTerms,
    getTable,
    editTable,
    getcType,
    getGrade,
    addData,
    getStage,
    beforeEdit,
    getPlaceType,
    getPlace,
    deleteData,
    checkName,
    // treeData,
    // classTree,
    // year,
    // term,
    // classType,
    // grade,
    // tableList,
    tableList2,
    copy,
    pageSize,
    term_new,
    classPlace,
    excelTable,
    excelTable2,
    getClassTree,
    downStudent: '/api/base/el_class/student/export',
    importStudent: '/zuul/api/base/el_class/stu_el_clazz_import',
    downStudentTemplat: '/api/base/el_class/stu_el_clazz_template',
    downClassTemplat: '/api/base/el_class/template',
    importClazz: '/zuul/api/base/el_class/import',
    getOldClass,
    getOldClassToCurrentYear,
    giveStudents,
    getStudents
}