import request from '@/utils/request'

export function fetchList(data) {
  return request({
    url: '/admin/admin_users',
    method: 'get',
    data: data
  })
}

export function createItem(data) {
  return request({
    url: '/admin/admin_users',
    method: 'post',
    data: data
  })
}

export function destroyItem(id) {
  return request({
    url: '/admin/admin_users/' + id,
    method: 'delete'
  })
}

export function fetchItem(id) {
  return request({
    url: '/admin/admin_users/' + id,
    method: 'get'
  })
}

export function resetPassword(id) {
  return request({
    url: '/admin/admin_users/' + id + '/reset_password',
    method: 'patch'
  })
}

export function assignRoles(id, roleIds) {
  return request({
    url: '/admin/admin_users/' + id + '/assign_roles',
    method: 'patch',
    data: { role_ids: roleIds }
  })
}
