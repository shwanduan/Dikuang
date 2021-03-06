import request from '@/utils/request'
// import { praseStrEmpty } from "@/utils/ruoyi";

// 查询项目列表
export function listProject(query) {
  return request({
    url: 'system/project/list',
    method: 'get',
    params: query
  })
}

// 获取项目类别数据 
export function getProjectType (query) {
  return request({
    url: 'system/dict/data/list',
    method: 'get',
    params: query
  })
}

// 新增项目
export function addProject(data) {
  return request({
    url: 'system/project/add',
    method: 'post',
    data: data
  })
}

// 根据id获取列表详情
export function getProjectDet(id) {
  return request({
    url: `system/project/project/${id}`,
    method: 'get',
  })
}

// 修改项目
export function updateProject(data) {
  return request({
    url: 'system/project/edit',
    method: 'post',
    data: data
  })
}

// 删除项目
export function delProject(userId) {
  return request({
    url: 'system/project/delete/' + userId,
    method: 'get'
  })
}

// 导出项目
export function exportProject(query) {
  return request({
    url: '/project/project/export',
    method: 'get',
    params: query
  })
}

// 用户密码重置
// export function resetUserPwd(userId, password) {
//   const data = {
//     userId,
//     password
//   }
//   return request({
//     url: '/system/user/resetPwd',
//     method: 'put',
//     data: data
//   })
// }

// 用户状态修改
// export function changeUserStatus(userId, status) {
//   const data = {
//     userId,
//     status
//   }
//   return request({
//     url: '/system/user/changeStatus',
//     method: 'put',
//     data: data
//   })
// }

// 查询用户个人信息
// export function getUserProfile() {
//   return request({
//     url: '/system/user/profile',
//     method: 'get'
//   })
// }

// // 修改用户个人信息
// export function updateUserProfile(data) {
//   return request({
//     url: '/system/user/profile',
//     method: 'put',
//     data: data
//   })
// }

