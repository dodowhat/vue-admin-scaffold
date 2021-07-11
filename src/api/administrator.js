import request from '@/utils/request'

const basePath = '/admin/administrators'

export function fetchList(data) {
  return request({
    url: basePath,
    method: 'get',
    data: data
  })
}

export function createItem(data) {
  return request({
    url: basePath,
    method: 'post',
    data: data
  })
}

export function destroyItem(id) {
  return request({
    url: `${basePath}/${id}`,
    method: 'delete'
  })
}

export function fetchItem(id) {
  return request({
    url: `${basePath}/${id}`,
    method: 'get'
  })
}

export function resetPassword(id) {
  return request({
    url: `${basePath}/${id}/password/reset`,
    method: 'patch'
  })
}
