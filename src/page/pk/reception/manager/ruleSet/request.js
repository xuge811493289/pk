import api from '@/api';
export let request = (method, url, params, serializer = true) => {
    return api(method, url, params, serializer, {
        headers: {
            'Sy-Headers': 'device=pc;app=pk'
        }
    })
};
// 查询组织年级班级tree
export let getClassCourseTree = (params) => {
    return request('get', '/api/base/gradeClassTree', params);
};


// 查询教师tree
export let getTeacherTree = (params) => {
    return request('get', '/teacher/org_gro', params);
};

//查询场地类型
export let getPlaceType =(params) =>{
	return request('get', '/placeType', params);
}

