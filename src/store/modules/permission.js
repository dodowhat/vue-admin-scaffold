// import store from '@/store'
import { asyncRoutes, constantRoutes } from '@/router'

function filterRecursive(routes, roles) {
  const filteredRoutes = routes.filter(route => {
    if (route.meta && route.meta.roles) {
      return roles.some(role => route.meta.roles.includes(role) || route.meta.roles.includes('root'))
    } else {
      return true
    }
  })
  filteredRoutes.forEach((route, index) => {
    if (route.children && route.children.length > 0) {
      filteredRoutes[index].children = filterRecursive(route.children, roles)
    }
  })
  return filteredRoutes
}

const state = {
  routes: []
}

const mutations = {
  SET_ROUTES: (state, routes) => {
    state.routes = constantRoutes.concat(routes)
  }
}

const actions = {
  filterRoutes({ commit }, roles) {
    return new Promise(resolve => {
      const routes = filterRecursive(asyncRoutes, roles)
      commit('SET_ROUTES', routes)
      resolve(routes)
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
