import request from '@/api';

// 查询单位头像
export let getUnitLogo = window.ShiYue.base + '/api/storage/show/unit/';

// 查询组织部门tree
export let updataPassword = (originalPassword, newPassword) => {
    return request('put', '/api/base/user/rest', { originalPassword, newPassword });
};

// 获取用户信息
export let getUsrMsg = (id) => {
    return request('get', '/api/base/nologin/user/find', { id });
};

// 更新个人信息
export let updataUsrMsg = (parmas) => {
    return request('post', '/api/base/desktop/update_self_info', parmas);
};

// 获取导航
export let getDesktopSelfprops = (parmas) => {
    return request('get', '/api/base/desktop/selfprops', parmas);
};

// 保存主题
export let updataThemeColor = (type = 'color', theme) => {
    return request('post', '/api/base/desktop/settheme', { type, theme });
};

// 校验Email是否存在
export let validataEmail = (email) => {
    return request('get', '/api/base/user/validata/email', { email });
};

// 校验手机号码是否存在
export let validataMobile = (mobile) => {
    return request('get', '/api/base/user/validata/mobile', { mobile });
};

// 上传头像地址
export let imgUrl = window.ShiYue.base + '/zuul/api/storage/upload/type';

// 显示头像
export let showImgUrl = window.ShiYue.base + '/api/storage/show/thumbnail/';

// 显示头像all
export let showImgUrlAll = window.ShiYue.base + '/api/storage/show/';

// 保存用户上传图片，包含自定义背景图片
export let submitPicturs = (parmas) => {
    return request('post', '/api/base/desktop/uploadtheme', parmas);
};

// 查询当前登录用户的照片数据
export let getUserPhotos = (parmas) => {
    return request('get', '/api/base/desktop/portallet/module_photos', parmas);
};

// 用户删除自己桌面上的模块
export let delete_self_module = (resourceIds) => {
    return request('post', '/api/base/desktop/delete_self_module', { resourceIds });
};

// 用户删除自己上传的照片、自定义背景图
export let delete_self_photo = (parmas) => {
    return request('post', '/api/base/desktop/delete_self_photo', parmas);
};

// 根据单位查询模块列表
export let getPortalletList = (unitId) => {
    return request('get', '/api/base/desktop/portallet', { unitId });
};

// 启用、停用单个模块
export let updataPortalletStatus = (id, parmas) => {
    return request('put', '/api/base/desktop/portallet/status/' + id, parmas);
};

//修改某个模块
export let editgPortallet = (parmas) => {
    return request('put', '/api/base/desktop/portallet', parmas)
};

// 查询桌面权限
export let findCodeList = () => {
    return request('get', '/api/base/resource/user/code?code=app_desktop_icon')
};