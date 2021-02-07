import request from '@/utils/request'

export function login(data) {
  return request({
    url: '/admin/auth',
    method: 'post',
    data
  })
}

export function getInfo(token) {
  return request({
    url: '/admin/auth',
    method: 'get'
  })
}

export function logout() {
  return request({
    url: '/admin/auth',
    method: 'delete'
  })
}

export function updatePassword(data) {
  return request({
    url: '/admin/auth/update_password',
    method: 'patch',
    data
  })
}
