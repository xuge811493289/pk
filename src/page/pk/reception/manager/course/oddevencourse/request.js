
import api from '@/api';
export let request = (method, url, params, serializer = true) => {
    return api(method, url, params, serializer, {
        headers: {
            'Sy-Headers': 'device=pc;app=pk'
        }
    })
};
// 删除单双周课程
export let deleteCourse = (params) => {
  return request('post', 'api/pk/single_double_course/delete',params);
};

//保存单双周课程
export let saveCourse = (params) => {
  return request('post','api/pk/single_double_course/save',params)
};

//根据方案id查询单双周课程
export let selectBySolution = (params) => {
  return request('get','api/pk/single_double_course/select_all_by_solution',params)
};

//根据id查询单双周课程
export let selectById = (params) => {
  return request('get','api/pk/single_double_course/select_by_id',params)
};

//根据班级课时查询年级班级课程
export let selectCourseByWeekHour = (params) => {
  return request('get','api/pk/pkteach/select_course_by_week_hour',params)
}

//修改单双周课程
export let update = (params) => {
  return request('put','api/pk/single_double_course/update',params)
};

//根据方案id获取年级
export let selectGradeBySolution = (params) =>{
  return request('get','api/pk/solution/select_pk_grade_by_s_type?solutionId='+params.solutionId+'&type=all')
}

// 获取年级
// export let getGradeList = (params) => {
//   return request('get', '/api/base/grade', params);
// };

// 根据年级获取班级
export let getClassList = (params) => {
  return request('get', '/api/base/clazz', params);
};

//根据班级id集合和周课时数，查询这些班级的公有课程
export let weekHour = (params) => {
  return request('get','api/base/class_course_r/class_ids/week_hour',params)
}
