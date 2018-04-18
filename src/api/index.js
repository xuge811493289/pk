// import axios from 'axios';
import axios from './http.js';
import qs from 'qs';
import _ from 'lodash';
import { Loading, Message } from 'element-ui';

let loadinginstace;

// 这块没有使用VUE原形中的工具函数
function isArray(obj) {
    return (Object.prototype.toString.call(obj) == '[object Array]');
}

function fetch(method = 'get', url, params, serializer = true) {
    if (!/^\//.test(url)) {
        url = '/' + url;
    }
    method = method.toLocaleLowerCase();
    let axiosConfig = {
        method: method, // 请求方法 默认为get
        // url: url, //`url`是请求的服务器地址
        //如果`url`不是绝对地址，那么`baseURL`将会加到`url`的前面
        //当`url`是相对地址的时候，设置`baseURL`会非常的方便
        // baseURL: config.base,
        //`headers`选项是需要被发送的自定义请求头信息
        headers: {
            
        },
        //`params`选项是要随请求一起发送的请求参数----一般链接在URL后面
        //他的类型必须是一个纯对象或者是URLSearchParams对象
        params: {},
        //`paramsSerializer`是一个可选的函数，起作用是让参数（params）序列化
        //例如(https://www.npmjs.com/package/qs,http://api.jquery.com/jquery.param)
        paramsSerializer: (params) => {
            var result = qs.stringify(params,{ allowDots: true });
            return result;
        },
        //`data`选项是作为一个请求体而需要被发送的数据
        //该选项只适用于方法：`put/post/patch`
        //当没有设置`transformRequest`选项时dada必须是以下几种类型之一
        //string/plain/object/ArrayBuffer/ArrayBufferView/URLSearchParams
        //仅仅浏览器：FormData/File/Bold
        //仅node:Stream
        data: {},
        //`withCredentails`选项表明了是否是跨域请求
        withCredentials: true, //default
        //返回数据的格式
        //其可选项是arraybuffer,blob,document,json,text,stream
        // responseType: 'json' //default
    };
    if (url && url.length > 0) {
        axiosConfig.url = url;
    }
    if (method === 'get') {
        axiosConfig.params = params;
    } else if (method === 'post' || method === 'put') {
        let _isArray = isArray(params);
        if (!serializer || _isArray) {
            axiosConfig.headers['Content-Type'] = 'application/json';
        }
        axiosConfig.data = ((!serializer || _isArray) ? params : qs.stringify(params,{ allowDots: true }));
    }
    return new Promise((resolve, reject) => {
        // loadinginstace = Loading.service({ fullscreen: true, text: '努力加载中···' })
        axios(axiosConfig)
            .then(response => {
                resolve(response);
            })
            .catch((error) => {
                reject(error);
            })
    })
}
export default (method, url, params, serializer) => {
    return fetch(method, url, params, serializer)
}