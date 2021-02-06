import store from '@/store'
import { asyncRoutes } from '@/router'

function filterRecursive(routes, roles) {
  const filteredRoutes = routes.filter(route => {
    if (route.meta && route.meta.roles) {
      return roles.some(role => route.meta.roles.includes(role))
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
    state.routes = routes
  }
}

const actions = {
  filterRoutes({ commit }) {
    return new Promise(resolve => {
      commit('SET_ROUTES', filterRecursive(asyncRoutes, store.getters.roles))
      resolve()
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
