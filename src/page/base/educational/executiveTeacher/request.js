import request from '../../../../api';

// 查询组织年级树
export let getGradeTree = (params) => {
    return request('get', '/api/base/gradeTree', params);
};

// 查询学年
export let getYearList = (unitId) => {
    return request('get', '/api/base/years', { unitId });
};

// 查询学期
export let getTermList = (unitId, year) => {
    return request('get', '/api/base/term', { unitId, year });
};

// 行政班任教查询
export let getClazzTeachersList = (params) => {
    return request('get', '/api/base/administrationTeach/selectTeacher', params);
};

// 查询教师用户
export let getTheacherList = (unitId) => {
    return request('get', '/api/base/teacher', { unitId });
};

// 指定任教
export let administrationTeach = (params) => {
    return request('post', '/api/base/administrationTeach', params);
};


// 删除任教
export let deleteistrationTeach = (params) => {
    return request('post', '/api/base/administrationTeach/delete', params);
};

// 下载行政班任教下载模版
export let administrationTeachDownload = {
    base: '/api/base/administrationTeachDownload',
    params: {
        gradeId: '',
        yearValue: '',
        termValue: '',
        unitId: ''
    }
}

// 导入
export let administrationTeachUpload = {
    base: '/zuul/api/base/administrationTeachUpload',
    params: {
        gradeId: '',
        yearValue: '',
        termValue: '',
        unitId: ''
    }
}