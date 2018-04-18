import request from '../../../../api';

/**************************************** 教务查询 *******************************************/
//查询单位树
export let getUnitTree = (params) => {
    return request('GET', '/api/base/unitTree', params);
};

//根据单位Id---学年
export let getYears = (params) => {
    return request('GET', '/api/base/years', params);
};
//根据单位Id和学年---学期
export let getTermList = (params) => {
    return request('GET', '/api/base/term', params);
};

//根据单位Id---启用的年级
export let getGradeList = (params) => {
    return request('GET', '/api/base/grade/active', params);
};

//学段    
export let getStageList = (params) => {
    return request('GET', '/api/base/stage', params);
};
//根据单位Id---当前学段
export let getNowStage = (params) => {
    return request('GET', '/api/base/stage/unit', params);
};


//根据单位Id、学年，学期---行政班任教查询
export let getTeachSituations = (params) => {
    return request('GET', '/api/base/teachSituations', params);
};

//根据单位Id、学年，学期，维度---教师分组查询
export let getTeacherGroup = (params) => {
    return request('GET', '/api/base/teachergroup/teacher', params);
};
//根据单位Id、学年，学段---课时查询
export let getCourseHour = (params) => {
    return request('GET', '/api/base/grade_course_r/query', params);
};
//根据单位Id、学年，学段---课时查询
export let getCodeList = () => {
    return request('GET', '/api/base/resource/user/code?code=category_base_academicinquiry');
};