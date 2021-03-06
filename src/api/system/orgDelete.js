import request from '@/utils/request'

// 查询安委会列表
export function listOrg(query) {
  return request({
    url: '/system/org/list',
    method: 'get',
    params: query
  })
}

// 查询安委会详细
export function getOrg(id) {
  return request({
    url: '/system/org/' + id,
    method: 'get'
  })
}

// 新增安委会
export function addOrg(data) {
  return request({
    url: '/system/org',
    method: 'post',
    data: data
  })
}

// 修改安委会
export function updateOrg(data) {
  return request({
    url: '/system/org',
    method: 'put',
    data: data
  })
}

// 删除安委会
export function delOrg(id) {
  return request({
    url: '/system/org/' + id,
    method: 'delete'
  })
}

// 导出安委会
export function exportOrg(query) {
  return request({
    url: '/system/org/export',
    method: 'get',
    params: query
  })
}