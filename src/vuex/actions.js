import request from '../api';
var actions = {
    "CODE": function(store, param) {
        return new Promise(function(resolve, reject) {
            resolve("ok");
        })
    },
    "GET_USER_INFO": function(store, param) {
        return new Promise(function(resolve, reject) {
            resolve("ok");
        })
    },
}

export default actions