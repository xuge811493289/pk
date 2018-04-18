import request from '../../../api';


// 日志查询
export let getlogList = (params) => {
    return request('GET', '/api/logging/logging', params);
};