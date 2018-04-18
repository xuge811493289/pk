import request from '../../../../api';
//获取单位树
export let getUnitCourseTree = (params)=>{
	return request('GET','/api/base/course',params);
}
//添加课程类别节点
export let addTreeCourseTypeNode = (params)=>{
	return request('POST','/api/base/courseType/batch',params);
}
//添加课程
export let addTreeCourseNode = (params)=>{
	return request('POST','/api/base/course/batch',params);
}
//修改课程
export let editTreeCourseNode = (params)=>{
	return request('PUT','/api/base/course',params);
}
//根据id查询学科课程
export let courseIdFind = (params)=>{
	return request('GET','/api/base/course/'+params);
}
//修改课程类型
export let editTreeCourseTypeNode = (params)=>{
	return request('PUT','/api/base/courseType',params);
}
//根据id查询学科课程类型
export let courseTypeIdFind = (params)=>{
	return request('GET','/api/base/courseType/'+params);
}
//删除课程或课程类型（不是初始化数据才能删除）
export let delectCourse = (params)=>{
	return request('DELETE','/api/base/course/'+params);
}
export let delectCourseType = (params)=>{
	return request('DELETE','/api/base/course_type/'+params);
}
//校验课程类型的重名
export let vifCourseSame = (params)=>{
	return request('GET','/api/base/course/nameExist',params);
}
//校验课程的重名
export let vifCourseTypeSame = (params)=>{
	return request('GET','/api/base/course_type/nameExist',params);
}
//校验课程编号重复
export let vifCourseNumSame = (params)=>{
	return request('GET','/api/base/course/numExist',params);
}