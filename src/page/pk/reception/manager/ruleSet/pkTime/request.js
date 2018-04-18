import api from '@/api';
export let request = (method, url, params, serializer = true) => {
    return api(method, url, params, serializer, {
        headers: {
            'Sy-Headers': 'device=pc;app=pk'
        }
    })
};
// 查询标签是否存在
export let labelTimeExist = (params) =>{
	return request('get','/api/pk/time_lable/lable_name_exist',params);
}
// 增加标签
export let addLabelNotExist = (params) =>{
	return request('post','/api/pk/time_lable/save_label',params);
}
// 查询标签
export let toGetLabelName = (params)=>{
	return request('get','/api/pk/time_lable/select_time_label_by_solutionid',params);
}
// 删除标签
export let toDeleteLabel = (params) =>{
	return request('post','/api/pk/time_lable/delete_lable',params);
}
// 修改标签
export let toEditLabel = (params) =>{
	return request('post','/api/pk/time_lable/update_label',params);
}

// 查询排课时间下拉
export let toGetPktimeSelect = ()=>{
	return request('get','/api/pk/time_rule/select_time_sel_type');
}
// 获取班级 通过方案获取全部年级
export let getGradeListBysolutionId = (params) => {
    return request('get', '/api/pk/solution/select_pk_grade_by_s_type?solutionId='+params.solutionId+'&type=all')
}
// 通过年级id获取班级
export let getClassListByGradeId = (params) =>{
	return request('get','/api/base/clazz', params);
}
// 教师树
export let getTeacherTree = (params)=>{
	return request('get','/api/pk/time_rule_teacher_group/select_course_time_teaher',params)
}
// 科目树
export let getCourseTree = (params)=>{
	return request('get','/api/pk/time_rule_course/select_time_course_tree_by_solution',params);
}
// 场地树
export let getPlaceType = (params) => {
    return request('get', '/api/base/placeType?unitId=' + params);
};
// 具体场地
export let getPlace = (params) => {
    return request('get', '/api/base/place?unitId=' + params.unitId + '&placeTypeId=' + params.placeTypeId + '&start=1&size=500');
};

// 查询排课时间类型
export let toGetPktimeType = () =>{
	return request('get','/api/pk/time_rule/select_pk_time_type');
}

//根据单位查询节次列表
export let selectFestivlaByUnit = (params) => {
  return request('get','api/base/festival',params);
}

//根据类型查询国标
export let selectGB = () => {
  return request('get','api/base/codeitem/type/no_auth/XQ')
}

//保存班级排课时间 
export let saveTimeClassDetail = (params) => {
 	return request('post','/api/pk/time_rule_class/save_time_class_detail',params);
}

//删除班级排课时间 
export let delTimeClassDetail = (params) => {
 	return request('post','/api/pk/time_rule_class/delete_time_class_detail',params);
}

//查找班级排课时间
export let selectTimeClassDetail = (params) => {
 	return request('get','/api/pk/time_rule_class/select_pk_time_detail_class',params);
}

//保存教师排课时间
export let saveTimeTeacherDetail = (params) => {
 	return request('post','/api/pk/time_rule_teacher/sava_time_teacher',params);
}
//删除教师排课时间
export let delTimeTeacherDetail = (params) => {
 	return request('post','/api/pk/time_rule_teacher/delete_time_teacher',params);
}
//查找教师排课时间
export let selectTimeTeacherDetail = (params) => {
 	return request('get','/api/pk/time_rule_teacher/select_pk_time_detail_teacher',params);
}

//保存科目排课时间
export let saveTimeCourseDetail = (params) => {
 	return request('post','/api/pk/time_rule_course/save_time_course',params);
}
//删除科目排课时间
export let delTimeCourseDetail = (params) => {
 	return request('post','/api/pk/time_rule_course/delete_time_course',params);
}
//查找科目排课时间
export let selectTimeCourseDetail = (params) => {
 	return request('get','/api/pk/time_rule_course/select_pk_time_detail_course',params);
}


//保存场地排课时间
export let saveTimePlaceDetail = (params) => {
 	return request('post','/api/pk/time_rule_place/save_time_place',params);
}
//删除场地排课时间
export let delTimePlaceDetail = (params) => {
 	return request('post','/api/pk/time_rule_place/delete_time_place',params);
}
//查找场地排课时间
export let selectTimePlaceDetail = (params) => {
 	return request('get','/api/pk/time_rule_place/select_pk_time_detail_place',params);
}

// 保存教师组
 export let saveTeacherGroup = (params) =>{
 	return request('post','/api/pk/time_rule_teacher_group/save_time_group',params);
 }





