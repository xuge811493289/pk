import api from '@/api';
export let request = (method, url, params, serializer = true) => {
    return api(method, url, params, serializer, {
        headers: {
            'Sy-Headers': 'device=pc;app=pk'
        }
    })
};

// 单位tree
export let getUnitTree = (params) => {
    return request('get', '/api/base/unitTree', params);
};

export let getStages = (params) => {
    return request('get', '/api/base/stage/unit?unitId=' + params);
};

export let getGradeList = (params) => {
    return request('get', '/api/base/grade', params);
};

export let getGrade = (params) => {
    return request('get', '/api/base/grade/' + params);
};

export let gradeNameExist = (params) => {
    return request('get', '/api/base/grade/name', params);
};

export let saveGrade = (params) => {
    return request('post', '/api/base/grade', params);
};

export let updateGrade = (params) => {
    return request('put', '/api/base/grade', params);
};

export let classNameExist = (params) => {
    return request('post', '/api/base/clazz/nameExist', params);
};

export let getClassList = (params) => {
    return request('get', '/api/base/clazz', params);
};

export let getClass = (params) => {
    return request('get', '/api/base/clazz/' + params.classId, params);
};

export let getYearList = (params) => {
    return request('get', '/api/base/years?unitId=' + params);
};

export let getTermList = (params) => {
    return request('get', '/api/base/term', params);
};

export let saveClass = (params) => {
    return request('post', '/api/base/clazz', params);
};

export let deleteClass = (classId, params) => {
    return request('post', '/api/base/clazz/' + classId, params);
};

export let beachSaveClass = (params) => {
    return request('post', '/api/base/clazz/batch', params);
};

export let updateClass = (params) => {
    return request('put', '/api/base/clazz', params);
};

export let getClassName = (params) => {
    return request('get', '/api/base/clazz_sort', params);
};

export let getPlaceType = (params) => {
    return request('get', '/api/base/placeType?unitId=' + params);
};

export let getPlace = (params) => {
    return request('get', '/api/base/place?unitId=' + params.unitId + '&placeTypeId=' + params.placeTypeId + '&start=1&size=500');
};

export let getClassStudent = (params) => {
    return request('post', '/api/base/student/clazz', params);
};
