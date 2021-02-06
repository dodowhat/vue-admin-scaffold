import request from '@/utils/request'

export function fetchList() {
  return request({
    url: '/admin/admin_actions',
    method: 'get'
  })
}
