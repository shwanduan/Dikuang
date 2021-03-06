import request from '@/utils/request'

// 查询工程设备列表
export function listEquipment(query) {
  return request({
    url: '/equipment/equipment/list',
    method: 'get',
    params: query
  })
}

// 查询工程设备详细
export function getEquipment(id) {
  return request({
    url: '/equipment/equipment/' + id,
    method: 'get'
  })
}

// 新增工程设备
export function addEquipment(data) {
  return request({
    url: '/equipment/equipment',
    method: 'post',
    data: data
  })
}

// 修改工程设备
export function updateEquipment(data) {
  return request({
    url: '/equipment/equipment',
    method: 'put',
    data: data
  })
}

// 删除工程设备
export function delEquipment(id) {
  return request({
    url: '/equipment/equipment/' + id,
    method: 'delete'
  })
}

// 导出工程设备
export function exportEquipment(query) {
  return request({
    url: '/equipment/equipment/export',
    method: 'get',
    params: query
  })
}