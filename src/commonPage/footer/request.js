import request from '@/api';

export let getLoginConfig = () => {
    let result = new Promise((resolve, reject) => {
        request('get', '/api/uaa/oauth/login/config').then(((data) => {
            if (data && data.code === 'ok') {
                resolve(data)
            } else {
                reject(data);
            }

        }))
    })
    return result
}