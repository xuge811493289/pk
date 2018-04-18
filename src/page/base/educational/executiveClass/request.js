import request from '../../../../api';

// 查询组织年级班级tree
export let getClassCourseTree = (params) => {
    return request('get', '/api/base/gradeClassTree', params);
};

// 查询组织年级tree
export let getClassTree = (params) => {
    return request('get', '/api/base/gradeTree', params);
};

// 查询学年
export let getYearList = (unitId) => {
    return request('get', '/api/base/years', { unitId });
};

// 查询学期
export let getTermList = (unitId, year) => {
    return request('get', '/api/base/term', { unitId, year });
};

// 根据单位查询单位课程
export let getUnitClassListByUnitId = (unitId) => {
    return request('get', '/api/base/course/active', { unitId });
};

// 根据单位、年度值、学期值、年级查询学科课程
export let getUnitClassListByGrade = (params) => {
    return request('get', '/api/base/course/grade', params);
};

// 根据单位查询年级
export let getGradByUnitId = (unitId) => {
    return request('get', '/api/base/grade', { unitId });
};

// 根据年级查询班级
export let getClassByGradId = (params) => {
    return request('get', '/api/base/clazz', params);
};

/*----------------------------------------班级-------------------------------------------------*/
// 查询行政班班级课程
export let getClassList = (params) => {
    return request('get', '/api/base/class_course_r', params);
};

// 新增行政班班级课程
export let addClass = (params) => {
    return request('post', '/api/base/class_course_r', params);
};

// 修改行政班班级课程
export let updataClass = (params) => {
    return request('put', '/api/base/class_course_r', params);
};

// 批量删除行政班班级课程
export let deleteClass = (params) => {
    return request('post', '/api/base/class_course_r/batch/delete', params);
};
/*----------------------------------------年级-------------------------------------------------*/
// 查询行政班年级课程
export let getGradeCourseList = (gradeId, yearValue, termValue, unitId) => {
    return request('get', '/api/base/grade_course_r', { gradeId, yearValue, termValue, unitId });
};

// 查询行政班年级课程数
export let getGradeCourses = (params) => {
    return request('get', '/api/base/grade_course_r/query', params);
};

// 新增行政班年级课程
export let addGradeCourse = (params) => {
    return request('post', '/api/base/grade_course_r', params);
};

// 批量新增行政班年级课程
export let addGradeCourses = (params) => {
    return request('post', '/api/base/grade_course_r/batch', params);
};

// 批量删除行政班年级课程
export let deleteGradeCourses = (params) => {
    return request('post', '/api/base/grade_course_r/batch/delete', params);
};

// 修改行政班年级课程
export let updataGradeCourse = (params) => {
    return request('put', '/api/base/grade_course_r', params);
};

//查询整个系统中的年度列表
export let getAllYearList = (params) => {
    return request('get', '/api/base/findFirstYearList', params);
};