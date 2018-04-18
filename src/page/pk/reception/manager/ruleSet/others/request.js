import api from '@/api';
export let request = (method, url, params, serializer = true) => {
    return api(method, url, params, serializer, {
        headers: {
            'Sy-Headers': 'device=pc;app=pk'
        }
    })
};
// 查询其他规则类型
export let getOtherRule = () =>{
	return request('get','/api/pk/rule_other/select_by_rule_other_type');
}
// 查找课程年级
export let getGradeListandCourse = (params)=>{
	return request('get','/api/pk/pkteach/select_grade_course_tree',params);
}

// 进度一致数据
export let otherData = (params)=>{
	return request('get','/api/pk/rule_other/select_rule_other',params);
}

// 
export let saveAndEditRule = (params)=>{
	return request('post','/api/pk/rule_other/save_or_upate',params);
}

