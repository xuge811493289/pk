export let findSchools = (params) => {
    return $.get(window.ShiYue.base + '/api/base/selectusers/schools', params);
};

export let findUserGroups = (params) => {
    return $.get(window.ShiYue.base + '/api/base/selectusers/userGroups', params);
};

export let findUserByGroup = (params) => {
    return $.get(window.ShiYue.base + '/api/base/selectusers/userByGroup', params);
};

export let findUserById = (params) => {
    return $.get(window.ShiYue.base + '/api/base/nologin/user/find?id=' + params);
};