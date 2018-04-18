import request from '../../../api';


// 查询备份分页
export let getSYScopyList = (code) => {
    return request('get', '/api/base/backup/info', code);
};

// 保存备份
export let saveSYScopy = (code) => {
    return request('post', '/api/base/backup/info', code);
};

// 删除备份
export let deleteSYScopy = (id) => {
    return request('delete', '/api/base/backup/info/' + id);
};