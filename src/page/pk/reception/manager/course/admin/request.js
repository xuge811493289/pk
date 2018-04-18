import api from '@/api';
export let request = (method, url, params, serializer = true) => {
    return api(method, url, params, serializer, {
        headers: {
            'Sy-Headers': 'device=pc;app=pk'
        }
    })
};
// 根据单位获取年级
export let getGradeList = (params) => {
    return request('get', '/api/pk/solution/select_pk_grade_by_s_type?solutionId='+params.solutionId+'&type=open');
};
// 根据年级获取班级
export let getClassList = (params) => {
    return request('get', '/api/base/clazz', params);
};
// 获取单位的课程信息
export let getCourseList = (params) => {
    return request('get', '/api/base/course',params);
};
// 获取年级以及课程信息
export let getGradeAndCourse = (params) =>{
    return request('get','/api/pk/pkteach/select_grade_course_tree',params);
}
// 获取场地类型
export let getPlaceType = (params) => {
    return request('get', '/api/base/placeType?unitId=' + params);
};
// 获取上课场地
export let getPlace = (params) => {
    return request('get', '/api/base/place?unitId=' + params.unitId + '&placeTypeId=' + params.placeTypeId + '&start=1&size=500');
};
// 保存课程和任教信息   
export let savePkTeach = (params) => {
    return request('post', '/api/pk/pkteach/save', params);
};
// 查询排课任教
export let  selectPkTeach = (params)=>{
	return request('get','/api/pk/pkteach/select_pk_teach',params);
}
// 设置年级课时
export let  setUpGradeTeach = (params)=>{
	return request('post','/api/pk/pkteach/set_up_grade_coursetime',params);
}
// 任课信息修改
export let  pkUpdateInfo = (params)=>{
	return request('put','/api/pk/pkteach/update',params);
}



/*任教设置页面    开始*/
// 根据年级查找课程
export let getCourseListByGradeandUnit = (params)=>{
	return request('get','/api/base/grade_course_r?gradeId='+params.gradeId+'&unitId='+params.unitId);
}
// 根据课程id和单位值id查找教师
export let getTeacherByCourseIDandUnit = (params)=>{
	return request('get','/api/base/teacher/course?courseValue='+params.courseValue+'&unitId='+params.unitId);
}

// 查询教师
export let selectGradeCourse = (params) =>{
    return request('get','/api/pk/pkteach/select_grade_course_tree',params);
}
// 批量班级任教列表
export let batchSetTeachList = (params) =>{
    return request('get','/api/pk/pkteach/select_calss_teacher',params);
}
// 批量任课列表删除教师
export let deleteTeacher = (params) =>{
    return request('post','/api/pk/pkteach/delete_teacher_by_gradeclasscourseid',params);
}
// 获取班级
export let getClassByUnitAndGrade = (params) =>{
    return request('get','/api/base/clazz/grade_unit',params);
}
// 获取班级课程
export let getClazzCourseList = (params)=>{
    return request('get','/api/base/class_course_r/grade',params);
}
// 右侧课程数据
// export let CoursetoTeach = (params) =>{
//     return request('get','/api/pk/pkteach/select_grade_course_teacher',params);
// }
// 
export let CoursetoTeach = (params) =>{
    return request('get','/api/pk/time_rule_teacher_group/select_course_teacher_by_solution',params);
}
// 查询课程教师
export let selectCourseTeacher = (params) =>{
    return request('get','/api/pk/time_rule_teacher_group/select_course_teacher_by_solution',params);
}


/*年级班级课程任教*/

// 根据年级获取班级
export let selectClazzByGradeId = (params)=>{
    return request('get','/api/base/clazz',params);
}
// 根据班级查找  科目和任教
export let selectCourseTeacherByClazz = (params) =>{
    return request('get','/api/pk/pkteach/select_course_teacher',params);
}
// 设置批量任教
export let batchTeach = (params) =>{
    return request('post','/api/pk/pkteach/batch_teach',params);
}
/*任教设置页面    结束*/









