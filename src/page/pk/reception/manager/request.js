import api from '@/api';
export let request = (method, url, params, serializer = true) => {
    return api(method, url, params, serializer, {
        headers: {
            'Sy-Headers': 'device=pc;app=pk'
        }
    })
};
/* 获得国标星期 */
export let getBb = (params) => {
    return request('GET', '/api/base/codeitem/type/no_auth/' + params);
};

/* 根据单位查询节次列表 */
export let getFestival = (params) => {
    return request('GET', '/api/base/festival', params);
};

// 查询场地类型
export let getPlaceTypes = (unitId) => {
    return new Promise((resolve, reject) => {
        request('get', '/api/base/placeType', { unitId}).then((data) => {
            if (data && data.code === 'ok') {
                resolve(data.data);
            } else {
                reject('error');
            }
        });
    })
}

// 根据类型查场地
export let getPlaceByTypeId = (placeTypeId) => {
    return new Promise((resolve, reject) => {
        request('get', '/api/base/place/no_auth/by_type', { placeTypeId }).then((data) => {
            if (data && data.code === 'ok') {
                resolve(data.data);
            } else {
                reject('error');
            }
        });
    })
}

// 查询科目
export let getCourseList = (obj) => {
    return new Promise((resolve, reject) => {
        request('post', '/api/pk/sheet/course_list', obj).then((data) => {
            if (data && data.code === 'ok') {
                resolve(data.data);
            } else {
                reject('error');
            }
        });
    })
}

// 查询教师
export let getTeacherList = (obj) => {
    return new Promise((resolve, reject) => {
        request('post', '/api/pk/sheet/teacher_list', obj).then((data) => {
            if (data && data.code === 'ok') {
                resolve(data.data);
            } else {
                reject('error');
            }
        });
    })
}

// 查询班级课表
export let getClassSheetsById = (obj) => {
    return new Promise((resolve, reject) => {
        request('post', '/api/pk/sheet/class_sheet', obj).then((data) => {
            if (data && data.code === 'ok') {
                resolve(data.data);
            } else {
                reject('error');
            }
        });
    })
}

// 查询教师课表
export let getTeacherSheetsById = (obj) => {
    return new Promise((resolve, reject) => {
        request('post', '/api/pk/sheet/teacher_sheet', obj).then((data) => {
            if (data && data.code === 'ok') {
                resolve(data.data);
            } else {
                reject('error');
            }
        });
    })
}

// 查询场地课表
export let getPlaceSheetsById = (obj) => {
    return new Promise((resolve, reject) => {
        request('post', '/api/pk/sheet/place_sheet', obj).then((data) => {
            if (data && data.code === 'ok') {
                resolve(data.data);
            } else {
                reject('error');
            }
        });
    })
}


// 通过方案id获取年级
export let getGradeListByPlan = (id) => {
    return new Promise((resolve, reject) => {
        request('get', '/api/pk/solution/select_pk_grade_by_s_type', { solutionId:id, type: 'all' }).then((data) => {
            if (data && data.code === 'ok') {
                resolve(data.data);
            } else {
                reject('error');
            }
        });
    })
}

// 通说年级id 单位id 查询班级
export let getClazzByGradeId = (obj) => {
    return new Promise((resolve, reject) => {
        request('get', '/api/base/clazz/grade_unit', obj).then((data) => {
            if (data && data.code === 'ok') {
                resolve(data.data);
            } else {
                reject('error');
            }
        });
    })
}

// 获得左侧栏目
export let getBaseUserCode = (params) => {
    return request('get', '/api/base/resource/user/code/tree?code=base', '');
}

// 保存主题
export let updataThemeColor = (type = 'color', theme) => {
    return request('post', '/api/base/desktop/settheme', { type, theme });
};

// 获得权限
export let getRcCodeList = (code, obj) => {
    let result = new Promise((resolve, reject) => {
        request('get', '/api/base/resource/user/code', { code }).then((data) => {
            if (data && data.code === 'ok') {
                Object.keys(obj).forEach((_rc, i) => {
                    if (_.find(data.data, { code: _rc })) {
                        obj[_rc] = true;
                    }
                })
                resolve(true);
            } else {
                reject('error');
            }
        });
    })
    return result
};

//  查询未安排作务
export let getPkWaitHandle = (solutionId) => {
    let result = new Promise((resolve, reject) => {
        request('get', '/api/pk/optimizeadjust/select_wait_handle', { solutionId }).then((data) => {
            if(data.code == 'ok'){
                resolve(data.data);
            }else{
                reject(data.message);
            }
        });
    })
    return result
};

//  查询排课方案下的年级
export let getPkGradeList = (solutionId) => {
    let result = new Promise((resolve, reject) => {
        request('get', '/api/pk/solution/select_pk_grade_by_s_type', { solutionId, type: 'all' }).then((data) => {
            if (data.code == 'ok') {
                resolve(data.data);
            } else {
                reject(data.message);
            }
        });
    })
    return result
};

//  查询班级
export let getClazzListByGradeId = (gradeId) => {
    let result = new Promise((resolve, reject) => {
        request('get', '/api/base/clazz', { gradeId }).then((data) => {
            if (data.code == 'ok') {
                resolve(data.data);
            } else {
                reject(data.message);
            }
        });
    })
    return result
};

//  根据方案id和年级id查询课程教师集合
export let getSelectGradeCourseTeacher = (solutionId,gradeId) => {
    let result = new Promise((resolve, reject) => {
        request('get', '/api/pk/pkteach/select_grade_course_teacher', { solutionId,gradeId }).then((data) => {
            if (data.code == 'ok') {
                resolve(data.data);
            } else {
                reject(data.message);
            }
        });
    })
    return result
};

//  查询排课方案下的课表
export let selectCoursesheetvm = (solutionId) => {
    let result = new Promise((resolve, reject) => {
        request('get', '/api/pk/optimizeadjust/select_coursesheetvm', { solutionId }).then((data) => {
            if (data.code == 'ok') {
                resolve(data.data);
            } else {
                reject(data.message);
            }
        });
    })
    return result
};

//  查询排课方案下的冲突
export let selectConflictById = (solutionId) => {
    let result = new Promise((resolve, reject) => {
        request('get', '/api/pk/optimizeadjust/select_conflict', { solutionId }).then((data) => {
            if (data.code == 'ok') {
                resolve(data.data);
            } else {
                reject(data.message);
            }
        });
    })
    return result
};

//  规则查询
export let selectAllRule = (solutionId) => {
    let result = new Promise((resolve, reject) => {
        request('get', '/api/pk/optimizeadjust/select_all_rule', { solutionId }).then((data) => {
            if (data.code == 'ok') {
                resolve(data.data);
            } else {
                reject(data.message);
            }
        });
    })
    return result
};

//  查询排课方案下的冲突
export let selectAdjustVeryNiceIndex = (arr) => {
    let result = new Promise((resolve, reject) => {
        request('post', '/api/pk/optimizeadjust/adjust_very_nice_index', arr, false).then((data) => {
            if (data.code == 'ok') {
                resolve(data.data);
            } else {
                reject(data.message);
            }
        });
    })
    return result
};

//  调整课位
export let changePKweek = (arr) => {
    let result = new Promise((resolve, reject) => {
        request('post', '/api/pk/optimizeadjust/adjust_very_nice', arr, false).then((data) => {
            if (data.code == 'ok') {
                resolve(data.data);
            } else {
                reject(data.message);
            }
        });
    })
    return result
};

//  检测冲突
export let sheckedPKweek = (arr) => {
    let result = new Promise((resolve, reject) => {
        request('post', '/api/pk/optimizeadjust/find_conflict', arr, false).then((data) => {
            if (data.code == 'ok') {
                resolve(data.data);
            } else {
                reject(data.message);
            }
        });
    })
    return result
};

//  保存调整课位
export let saveCoursesheetvm = (arr) => {
    let result = new Promise((resolve, reject) => {
        request('post', '/api/pk/optimizeadjust/save_coursesheetvm', arr, false).then((data) => {
            if (data.code == 'ok') {
                resolve(data.data);
            } else {
                reject(data.message);
            }
        });
    })
    return result
};

//  获取任教老师
export let getTeacherListByGrade = (solutionId, gradeId) => {
    let result = new Promise((resolve, reject) => {
        request('get', '/api/pk/pkteach/select_teacher_by_grade', { solutionId, gradeId}).then((data) => {
            if (data.code == 'ok') {
                resolve(data.data);
            } else {
                reject(data.message);
            }
        });
    })
    return result
};

//POST /optimizeadjust/add_wait_handle 待排课程添加到课表
export let saveAddWaitHandle = (arr) => {
    let result = new Promise((resolve, reject) => {
        request('post', '/api/pk/optimizeadjust/add_wait_handle', arr, false).then((data) => {
            if (data.code == 'ok') {
                resolve(data.data);
            } else {
                reject(data.message);
            }
        });
    })
    return result
};

// POST /optimizeadjust/romve_wait_handle 移除排课课程
export let saveRomveWaitHandle = (arr) => {
    let result = new Promise((resolve, reject) => {
        request('post', '/api/pk/optimizeadjust/romve_wait_handle', arr, false).then((data) => {
            if (data.code == 'ok') {
                resolve(data.data);
            } else {
                reject(data.message);
            }
        });
    })
    return result
};
