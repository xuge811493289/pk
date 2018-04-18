import api from '@/api';
export let request = (method, url, params, serializer = true) => {
    return api(method, url, params, serializer, {
        headers: {
            'Sy-Headers': 'device=pc;app=pk'
        }
    })
};
//删除固定课程
export let deleteCourse = (params) => {
  return request ('post','api/pk/fixed_course/delete',params)
};

//保存固定课程
export let save = (params) => {
  return request ('post','api/pk/fixed_course/save',params)
};

//按班级查询固定课程
export let selectByClass = (params) => {
  return request ('get','api/pk/fixed_course/select_by_class',params)
};

//按年级查询固定课程
export let selectByGrade = (params) => {
  return request ('get','api/pk/fixed_course/select_by_grade',params)
};

//按场地查询固定课程
export let selectByPlace = (params) => {
  return request ('get','api/pk/fixed_course/select_by_place',params)
};

//按老师查询固定课
export let selectByTeacher = (params) => {
  return request ('get','api/pk/fixed_course/select_by_teacher',params)
};

//根据班级查询固定课程表格
export let selectTableByClass = (params) => {
  return request ('get','api/pk/fixed_course/select_table_by_class',params)
};

//按年级和方案id查询固定课程列表
export let selectTableByGrade = (params) => {
  return request ('get','api/pk/fixed_course/select_table_by_grade',params)
};

//根据场地查询固定列表数据
export let selectTableByPlace = (params) => {
  return request ('get','api/pk/fixed_course/select_table_by_place',params)
};

//根据教师查询固定课程表格数据
export let selectTableByTeacher = (params) => {
  return request ('get','api/pk/fixed_course/select_table_by_teacher',params)
};

//修改固定课程
export let updata = (params) => {
  return request ('put','api/pk/fixed_course/update',params)
};

//根据方案Id查询年级
export let selectGradeBySolution = (params) =>{
  return request('get','api/pk/solution/select_pk_grade_by_s_type?solutionId='+params.solutionId+'&type=all')
}

// 根据年级获取班级
export let getClassList = (params) => {
  return request('get', '/api/base/clazz', params);
}

//根据单位查询节次列表
export let selectFestivlaByUnit = (params) => {
  return request('get','api/base/festival',params);
}

//根据类型查询国标
export let selectGB = () => {
  return request('get','api/base/codeitem/type/no_auth/XQ')
}