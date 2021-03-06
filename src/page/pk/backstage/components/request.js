import api from '@/api';
export let request = (method, url, params, serializer = true) => {
    return api(method, url, params, serializer, {
        headers: {
            'Sy-Headers': 'device=pc;app=pk'
        }
    })
};
/* 获得年度 */
export let getYear = (params) => {
    return request('GET', '/api/base/years', params);
};
/* 获得学期 */
export let getTerm = (params) => {
    return request('GET', '/api/base/term', params);
};
/* 获得周 */
export let getWeeks = (params) => {
    return request('GET', '/api/pk/solution/select_week', params);
};
/* 获得国标星期 */
export let getBb = (params) => {
    return request('GET', '/api/base/codeitem/type/no_auth/' + params);
};
/* 根据单位查询节次列表 */
export let getFestival = (params) => {
    return request('GET', '/api/base/festival', params);
};

/* 获得年级 */
export let getGrade = (params) => {
    return request('GET', '/api/pk/solution/select_pk_grade_by_term_and_type', params);
};
/* 获取班级 */
export let getClazz = (params) => {
    return request('GET', '/api/base/clazz', params);
};
/* 获得课程 */
export let getCourse = (params) => {
    return request('POST', '/api/pk/sheet/course_list', params);
};
/* 根据教研组查询老师 */
export let getTeacherJyz = (params) => {
    return request('GET', '/api/pk/sheet/teach_prepara_org', params);
};
//根据年级课程查询老师
export let getTeacherCourse = (params) => {
    return request('POST', '/api/pk/sheet/teacher_list', params);
};
/*查询教师课表*/
export let getTeacherSheets = (params) => {
    return request('POST', '/api/pk/sheet/teacher_sheet', params);
};
/* 查询班级课表 */
export let getClazzSheets = (params) => {
    return request('POST', '/api/pk/sheet/class_sheet', params);
};