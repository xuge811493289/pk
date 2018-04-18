import api from '@/api';
export let request = (method, url, params, serializer = true) => {
    return api(method, url, params, serializer, {
        headers: {
            'Sy-Headers': 'device=pc;app=pk'
        }
    })
};

// POST /solution/syn_base_databy_solution 同步基础数据
export let syn_base_databy_solution = (solutionId) => {
    return new Promise((resolve, reject) => {
        request('post', '/api/pk/solution/syn_base_databy_solution', { solutionId}).then((data) => {
            if (data && data.code === 'ok') {
                resolve(data.data);
            } else {
                reject('error');
            }
        });
    })
}

export default {
    methods: {
        synBaseDataById(id){
            syn_base_databy_solution(id).then((res)=>{
                console.log(res);
            })
        }
    }
}