import api from '@/api';
export let request = (method, url, params, serializer = true) => {
    return api(method, url, params, serializer, {
        headers: {
            'Sy-Headers': 'device=pc;app=pk'
        }
    })
};
/* 获得年度 */
export let getYear = (params) => {
    return request('GET', '/api/base/years', params);
};
/* 获得学期 */
export let getTerm = (params) => {
    return request('GET', '/api/base/term', params);
};
/* 获得周 */
export let getWeeks = (params) => {
    return request('GET', '/api/pk/solution/select_week', params);
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

/* 获得表格数据 */
export let getPlaceTable = (params) => {
    return request('POST', '/api/pk/sheet/place_sheet', params);
};