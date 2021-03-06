// 课位管理
import api from '@/api';
export let request = (method, url, params, serializer = true) => {
    return api(method, url, params, serializer, {
        headers: {
            'Sy-Headers': 'device=pc;app=pk'
        }
    })
};
// 通过当前登录用户的单位获取年级数据
export let getGradeList = (params) => {
    return request('get', '/api/base/grade/active/no_auth', params);
};
// 获取弹出框中的时间表
export let showTableTime = (unitId) =>{
	return request('get','/api/base/festival?unitId='+unitId)
}
// 保存方案
export let saveSolution = (gradeIds,solutionName) =>{
	return request("post","/api/pk/solution/save",{gradeIds:gradeIds,solutionName:solutionName})
}
// 通过单位查找方案
export let selectSolutionByUnitId = (unitId)=>{
	return request("get",'/api/pk/solution/select_by_unitid?unitId='+unitId)
}
// 通过方案id删除   
export let deleteSolutionById = (solutionId)=>{
	return request("post","/api/pk/solution/delete_by_solution",{solutionId:solutionId})
}
// 停用排课
export let disableSolution = (solutionId)=>{
	return request("post","/api/pk/solution/disable_solution",{solutionId:solutionId})
}
// 开启排课
export let enableSolution = (params)=>{
	return request("post","/api/pk/solution/enable_solution",params);
}
// 通过单位id获取年级
export let getGradeListByUnitId = (params) => {
    return request('get', '/api/base/grade', params);
};
// 通过方案id获取年级
export let getGradeListByPlan = (params)=>{
	return request("get","/api/pk/solution/select_pk_grade_by_s_and_type?solutionId="+params.solutionId+"&type=all");
}
// 修改方案
export let updatePlan = (params)=>{
	return request('put','/api/pk/solution/update',params);
}
// 通过id获取方案
export let solutionSelectById = (solutionId) => {
    return request('get', '/api/pk/solution/select_by_id?solutionId=' + solutionId);
};

// 导入新方案
export let importNewPkMethods = (obj) => {
	let result = new Promise((resolve, reject) => {
		request('post', '/api/pk/solution/impt', obj).then((data) => {
			if (data && data.code === 'ok') {
				resolve(data.data);
			} else {
				reject('error');
			}
		});
	})
	return result
};

// 导入新方案名称重名校验
export let checkeName = (obj) => {
	let result = new Promise((resolve, reject) => {
		request('post', '/api/pk/solution/name_exsit', obj).then((data) => {
			if (data && data.code === 'ok') {
				resolve(data.data);
			} else {
				reject('error');
			}
		});
	})
	return result
};

// 查询当前学年学期
export let getCurrentYearTerm = (id) => {
	let result = new Promise((resolve, reject) => {
		request('get', '/api/base/term/current/'+ id).then((data) => {
			if (data && data.code === 'ok') {
				resolve(data.data);
			} else {
				reject('error');
			}
		});
	})
	return result
};

// 下载总课表导入模板
export let downloadKbModel = '/api/pk/sheet/clazz_sheet_tem';

// 总课表导入
export let importKbModel = window.ShiYue.base + '/zuul/api/pk/sheet/import_clazz_sheet';

// 下载选修班导入模板
export let downloadxxModel = '/api/pk/position_manage/download';

// 选修班导入
export let importxxModel = window.ShiYue.base + '/zuul/api/pk/position_manage/import_el_classsheet';
// 复制方案
export let copySolution = (params)=>{
	return request('post','/api/pk/solution/copy',params);
}
