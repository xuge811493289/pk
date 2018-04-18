import request from '../../../../api'


//  获取班级信息
export function getClass(param) {
  let url = `/api/base/clazz`
  const params = Object.assign({}, {
    gradeId: param.gradeId,
    year: param.year,
    schoolterm: param.schoolTerm
  })
  return request('get', url, params)
}

//  获取分班学生信息
export function getClassStu(param) {
  let url = `/api/base/student/clazz`
  const params = Object.assign({}, {
    unitId: param.unitId,
    clazz: param.clazz,
    year: param.year,
    term: param.term
  })
  return request('post', url, params)
}

//  获取未分班学生信息
export function getNoClassStu(param) {
  let url = `/api/base/student/notclazz`
  const params = Object.assign({}, {
    unitId: param.unitId,
    year: param.year,
    term: param.term
  })
  return request('post', url, params)
}

//  删除行政班学生分班
export function delClassStu(param) {
  let url = `/api/base/clazz_student_r/batch/delete`
  const params = Object.assign({}, {
    classId: param.classId,
    studentIds: param.studentIds,
    yearValue: param.yearValue,
    termValue: param.termValue,
    unitId: param.unitId
  })
  return request('post', url, params)
}

//  导入行政班学生分班
export function addClassStu(param) {
  let url = `/api/base/clazz_student_r/batch/insert`
  const params = Object.assign({}, {
    classId: param.classId,
    studentIds: param.studentIds,
    yearValue: param.yearValue,
    termValue: param.termValue,
    unitId: param.unitId
  })
  return request('post', url, params)
}

