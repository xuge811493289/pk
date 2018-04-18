import api from '@/api';
export let request = (method, url, params, serializer = true) => {
    return api(method, url, params, serializer, {
        headers: {
            'Sy-Headers': 'device=pc;app=pk'
        }
    })
};
// 查询所有互斥规则数据
export let selectCourseMutedBySolution = (params) =>{
	return request('get','/api/pk/course_mutex/select_course_mutex_by_solution',params);
}
// 获取年级以及课程
export let getRelatedGradeAndCourse = (params) =>{
	return request('get','/api/pk/pkteach/select_grade_course_tree',params);
}
// 删除互斥
export let deleteCourseMuted = (params) =>{
	return request('post','/api/pk/course_mutex/delete_course_mutex',params);
}
// 保存互斥课程
export let saveMutexInfo = (params) =>{
	return request('post','/api/pk/course_mutex/save_course_mutex',params);
}
// 更新互斥课程信息
export let updateMutexInfo = (params) =>{
	return request('post','/api/pk/course_mutex/update_course_mutex',params);
}
// 查询单个互斥规则
export let selectCourseMutedById = (params)=>{
	return request('get','/api/pk/course_mutex/select_course_mutex_by_id',params);
}