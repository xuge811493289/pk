import request from '../../../../api';

export let getBaseStageByUnitId = (unitId) => {
    return request('get', '/api/base/stage/unit', { unitId })
}

export let getCoursByStageId = (stageId) => {
    return request('get', '/api/base/top_course', { stageId })
}

export let getCatalogList = (data) => {
    return request('get', '/api/base/catalog/list', data)
}

export let checkName = (data) => {
    return request('get', '/api/base/catalog/exist_name', data)
}

export let saveCatalog = (data) => {
    return request('put', '/api/base/catalog/save', data)
}

export let updataCatalog = (data) => {
    return request('put', '/api/base/catalog/update', data)
}

export let deleteCatalog = (id) => {
    return request('post', '/api/base/catalog/delete', { id })
}