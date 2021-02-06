import request from '@/utils/request'

export function fetchList() {
  return request({
    url: '/admin/admin_roles',
    method: 'get'
  })
}

export function destroyItem(id) {
  return request({
    url: '/admin/admin_roles/' + id,
    method: 'delete'
  })
}

export function assignActions(id, actionIds) {
  return request({
    url: '/admin/admin_roles/' + id + '/assign_actions',
    method: 'patch',
    data: { action_ids: actionIds }
  })
}

export function createItem(data) {
  return request({
    url: '/admin/admin_roles',
    method: 'post',
    data: data
  })
}
