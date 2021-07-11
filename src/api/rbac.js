import request from '@/utils/request'

const basePath = '/admin/rbac'

export function fetchRoles() {
  return request({
    url: `${basePath}/roles`,
    method: 'get'
  })
}

export function destroyRole(name) {
  return request({
    url: `${basePath}/roles/${name}`,
    method: 'delete'
  })
}

export function createRole(data) {
  return request({
    url: `${basePath}/roles`,
    method: 'post',
    data: data
  })
}

export function assignRolesForAdministrator(username, roles) {
  return request({
    url: `${basePath}/administrators/${username}/roles`,
    method: 'put',
    data: roles
  })
}

export function fetchPermissions() {
  return request({
    url: `${basePath}/permissions`,
    method: 'get'
  })
}

export function fetchPermissionsForRole(name) {
  return request({
    url: `${basePath}/roles/${name}/permissions`,
    method: 'get'
  })
}

export function assignPermissionsForRole(name, permissions) {
  return request({
    url: `${basePath}/roles/${name}/permissions`,
    method: 'put',
    data: permissions
  })
}
