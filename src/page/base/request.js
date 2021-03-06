import request from '../../api';

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