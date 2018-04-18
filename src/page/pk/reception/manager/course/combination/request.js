import api from '@/api';
export let request = (method, url, params, serializer = true) => {
    return api(method, url, params, serializer, {
        headers: {
            'Sy-Headers': 'device=pc;app=pk'
        }
    })
};
// 通过id获取方案
export let getCurrentTerm = (unitId) => {
    return request('get','/api/base/term_all_data/no_auth/' + unitId);
};
// 通过id获取方案
export let getMergeCourse = (solutionId) => {
    return request('get','/api/pk/merge_course/select_by_solution?solutionId=' + solutionId);
};
// 通过单位查找年级
export let getGradeListByUnitId = (params) => {
    return request('get', '/api/base/grade', params);
}
// 通过方案获取全部年级
export let getGradeListBysolutionId = (params) => {
    return request('get', '/api/pk/solution/select_pk_grade_by_s_type?solutionId='+params.solutionId+'&type=all')
}
// 通过单位获取课程
export let  getCourseByUnitId = (params) =>{
	return request('get','/api/base/course/active?unitId='+params);
}
// 查找该方案下面的课程



// 通过年级id获取班级
export let getClassListByGradeId = (params) =>{
	return request('get','/api/base/clazz', params);
}
// 通过id删除
export let deleteLayeredBymergeId = (params) =>{
	return request('post','/api/pk/merge_course/delete_all',params);
}
// 获取场地类型
export let getPlaceType = (params) => {
    return request('get', '/api/base/placeType?unitId=' + params);
};
// 获取上课场地
export let getPlace = (params) => {
    return request('get', '/api/base/place?unitId=' + params.unitId + '&placeTypeId=' + params.placeTypeId + '&start=1&size=500');
};
// 保存合班分层课
export let saveCombinationCourse = (params) =>{
	return request('post','/api/pk/merge_course/save_mergecourse',params);
}

// 修改合班分层课
export let updateCombinationCourse = (params) =>{
	return request('post','/api/pk/merge_course/update',params);
}
// 删除分层课
export let deleteLayeredBymergeLayereId = (params) =>{
	return request('post','/api/pk/merge_course/delete_mergelayered',params);
}

// 根据分层id和合班课程id查询学生
export let selectStudentByMergeLayeredId = (params) =>{
	return request('get','/api/pk/merge_course/select_student_by_mergelayeredid', params);
}

// 保存合班分层课学生信息
export let saveCombinationCourseStudent = (params) =>{
	return request('post','/api/pk/merge_course/save_sutdent',params);
}







