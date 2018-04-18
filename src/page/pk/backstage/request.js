import api from '@/api';
export let request = (method, url, params, serializer = true) => {
    return api(method, url, params, serializer, {
        headers: {
            'Sy-Headers': 'device=pc;app=pk'
        }
    })
};
import _ from 'lodash';
import { Notification } from 'element-ui';
import store from '@/vuex/store.js';
let unitId = store.state.unitId;

export let currentUnitId = unitId;

// 上传文件地址
export let uploadUrl = window.ShiYue.base + '/zuul/api/storage/upload';

// 显示上传文件地址
export let showAllUrl = window.ShiYue.base + '/api/storage/show/all?fileId=';

// 下载上传文件
export let downloadUrl = '/api/storage/download/';

// 下载成绩录入模板
export let downLoadImportUrl = '/api/sc/score/excel_download/class';

// 后台 ----------------------------------------------------------------------------------------------
export let getBankStage = (obj) => {
    let result = new Promise((resolve, reject) => {
        request('get', '/api/lib/lib_topic/bank_stage',obj).then((data) => {
            if (data && data.status == 200 && data.code == 'ok') {
                resolve(data.data)
            } else {
                reject(data.fieldErrors)
            }
        })
    })
    return result;
}

//年级 课程
export let getGradeCourse = (obj) => {
    let result = new Promise((resolve, reject) => {
        request('get', '/api/base/lib/grade_course_role',{}).then((data) => {
            if (data && data.status == 200 && data.code == 'ok') {
                resolve(data.data)
            } else {
                reject(data.fieldErrors)
            }
        })
    })
    return result;
}

//知识点
export let getKnowpointList = (obj) => {
    // console.log("kpoinnnnnnnt",obj);
    let result = new Promise((resolve, reject) => {
        request('get', '/api/base/knowpoint/find/tree', obj).then((data) => {
            // console.log("dsdsfssf",data)
            if (data && data.status == 200 && data.code == 'ok') {
                resolve(data.data)
            } else {
                reject(data.fieldErrors)
            }
        })
    })
    return result;
}

//删除题目
export let deleteSubject = (obj) => {
    let result = new Promise((resolve, reject) => {
        request('post', '/api/lib/topic/delete_topic', {id:obj}).then((data) => {
            if (data && data.status == 200 && data.code == 'ok') {
                resolve(data.data)
            } else {
                reject(data.fieldErrors)
            }
        })
    })
    return result;
}

//审核通过
export let passSubject = (obj) => {
    let result = new Promise((resolve, reject) => {
        request('put', '/api/lib/topic/passed_examination', {id:obj}).then((data) => {
            if (data && data.status == 200 && data.code == 'ok') {
                resolve(data.data)
            } else {
                reject(data.fieldErrors)
            }
        })
    })
    return result;
}

//审核不通过
export let notpassSubject = (obj) => {
    let result = new Promise((resolve, reject) => {
        request('put', '/api/lib/topic/passed_not_examination', {id:obj}).then((data) => {
            if (data && data.status == 200 && data.code == 'ok') {
                resolve(data.data)
            } else {
                reject(data.fieldErrors)
            }
        })
    })
    return result;
}

// 查询学科下拉
export let getBaseCourse = (obj) => {
    let result = new Promise((resolve, reject) => {
        request('get', '/api/base/rc/course', obj).then((data) => {
            if (data && data.status == 200 && data.code == 'ok') {
                resolve(data.data)
            } else {
                reject(data.fieldErrors)
            }
        })
    })
    return result;
}

// 查询年级下拉
export let getBaseGrade = (obj) => {
    let result = new Promise((resolve, reject) => {
        request('get', '/api/base/nologin/grade',{unitId}, obj).then((data) => {
            if (data && data.status == 200 && data.code == 'ok') {
                resolve(data.data)
            } else {
                reject(data.fieldErrors)
            }
        })
    })
    return result;
}

//按年级
export let getStatisticsByGrade = (obj) => {
    let result = new Promise((resolve, reject) => {
        request('get', '/api/lib/topic/discipline/statistics', obj).then((data) => {
            if (data && data.status == 200 && data.code == 'ok') {
                resolve(data.data)
            } else {
                reject(data.fieldErrors)
            }
        })
    })
    return result;
}
//按学科
export let getStatisticsByObject = (obj) => {
    let result = new Promise((resolve, reject) => {
        request('get', '/api/lib/topic/grade/statistics', obj).then((data) => {
            if (data && data.status == 200 && data.code == 'ok') {
                resolve(data.data)
            } else {
                reject(data.fieldErrors)
            }
        })
    })
    return result;
}
//按题型
export let getStatisticsByType = (obj) => {
    let result = new Promise((resolve, reject) => {
        request('get', '/api/lib/topic/statistics', obj).then((data) => {
            if (data && data.status == 200 && data.code == 'ok') {
                resolve(data.data)
            } else {
                reject(data.fieldErrors)
            }
        })
    })
    return result;
}
//------------------------------------------------------------------------------------------------
//根据id获取题库题目
export let getTopicById = (id) => {
    let result = new Promise((resolve, reject) => {
        request('get', '/api/lib/lib_topic/by_topic_id/' + id, {}).then((data) => {
            if (data && data.status == 200 && data.code == 'ok') {
                resolve(data.data)
            } else {
                reject(data.fieldErrors)
            }
        }).catch(err => { })
    })
    return result;
}
//获取编目
export let getCatelog = (obj) => {
    let result = new Promise((resolve, reject) => {
        request('get', '/api/base/lib/catalog/list', obj).then((data) => {
            if (data && data.status == 200 && data.code == 'ok') {
                resolve(data.data)
            } else {
                reject(data.fieldErrors)
            }
        }).catch(err => { })
    })
    return result;
}
//获取年份
export let getYear = (obj) => {
    let result = new Promise((resolve, reject) => {
        request('get', '/api/lib/nologin/get_year', obj).then((data) => {
            if (data && data.status == 200 && data.code == 'ok') {
                resolve(data.data)
            } else {
                reject(data.fieldErrors)
            }
        }).catch(err => { })
    })
    return result;
}
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

/* 获得年度 */
export let getYearList = (params) => {
    return request('GET', '/api/base/years', params);
};
/* 获得学期 */
export let getTermList = (params) => {
    return request('GET', '/api/base/term', params);
};
// GET /adjustInfo/select_adjustinfo 调代课列表查询
export let selectAdjustinfoList = (unitId, year, term, state, keyWord) => {
    let result = new Promise((resolve, reject) => {
        request('get', '/api/pk/adjustInfo/select_adjustinfo', { unitId, year, term, state, keyWord}).then((data) => {
            if (data.code == 'ok') {
                resolve(data.data);
            } else {
                reject(data.message);
            }
        });
    })
    return result
};

/* 获得国标星期 */
export let getBb = (params) => {
    return request('GET', '/api/base/codeitem/type/no_auth/' + params, {});
};

/* 根据单位查询节次列表 */
export let getFestival = (params) => {
    return request('GET', '/api/base/festival', params);
};

// 年级班级
export let getGradeClazzList = (obj) => {
    return new Promise((resolve, reject) => {
        request("get", "/api/base/gradeClassTree/no_auth",obj).then( data => {
            if (data && data.status == 200 && data.code == "ok") {
                resolve(data.data);
            } else {
                reject(data.fieldErrors);
            }
        });
    });
};

// 根据班级查询科目 /course/class
export let getCourseByClassId = (obj) => {
    return new Promise((resolve, reject) => {
        request("get", "/api/base/course/class",obj).then( data => {
            if (data && data.status == 200 && data.code == "ok") {
                resolve(data.data);
            } else {
                reject(data.fieldErrors);
            }
        });
    });
};

//GET /adjustInfo/select_adjustinfo_sheet 查询调代课课表
export let getAdjustinfoSheet = (obj) => {
    return new Promise((resolve, reject) => {
        request("get", "/api/pk/adjustInfo/select_adjustinfo_sheet",obj).then( data => {
            if (data && data.status == 200 && data.code == "ok") {
                resolve(data.data);
            } else {
                reject(data.fieldErrors);
            }
        });
    });
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

//GET /adjustInfo/select_teacher_course 根据方案和班级查询教师课程
export let selectTeacherCourse = (obj) => {
    return new Promise((resolve, reject) => {
        request("get", "/api/pk/adjustInfo/select_teacher_course",obj).then( data => {
            if (data && data.status == 200 && data.code == "ok") {
                resolve(data.data);
            } else {
                reject(data.fieldErrors);
            }
        });
    });
};

// GET /role/user/{userId} 查询用户角色
export let getUserRoleById = (id) => {
    return new Promise((resolve, reject) => {
        request("get", "/api/base/role/user/"+id,{}).then( data => {
            if (data && data.status == 200 && data.code == "ok") {
                resolve(data.data);
            } else {
                reject(data.fieldErrors);
            }
        });
    });
};

//POST /adjustInfo/save 调代课保存
export let saveAdjustInfo = (arr) => {
    let result = new Promise((resolve, reject) => {
        request('post', '/api/pk/adjustInfo/save', arr, false).then((data) => {
            if (data.code == 'ok') {
                resolve(data.data);
            } else {
                reject(data.message);
            }
        });
    })
    return result
};

//POST /adjustInfo/update_state 修改调代课状态
export let updateStates = (adjustInfoId, state) => {
    let result = new Promise((resolve, reject) => {
        request('post', '/api/pk/adjustInfo/update_state', {adjustInfoId, state}).then((data) => {
            if (data.code == 'ok') {
                resolve(data.data);
            } else {
                reject(data.message);
            }
        });
    })
    return result
};

//POST /adjustInfo/update_adjust_info 调代课修改
export let updateAdjustInfo = (obj) => {
    let result = new Promise((resolve, reject) => {
        request('post', '/api/pk/adjustInfo/update_adjust_info', obj).then((data) => {
            if (data.code == 'ok') {
                resolve(data.data);
            } else {
                reject(data.message);
            }
        });
    })
    return result
};

// GET /term/selectTermMessage  查询年度学期的完整数据
export let getTermAllData = (obj) => {
    let result = new Promise((resolve, reject) => {
        request('get', '/api/base/term/selectTermMessage', obj).then((data) => {
            if (data.code == 'ok') {
                resolve(data.data);
            } else {
                reject(data.message);
            }
        });
    })
    return result
};
// POST /sheet/course_count 课时统计
export let getCourseCount = (obj) => {
    let result = new Promise((resolve, reject) => {
        request('post', '/api/pk/sheet/course_count', obj).then((data) => {
            if (data.code == 'ok') {
                resolve(data.data);
            } else {
                reject(data.message);
            }
        });
    })
    return result
};