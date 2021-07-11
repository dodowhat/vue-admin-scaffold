import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'

import {
  RedirectIntermediateViewRoutePrefix,
  RedirectIntermediateViewRoutePath,
  RedirectIntermediateViewComponent
} from '@/plugins/RedirectIntermediateView'

/**
 * Note: sub-menu only appear when route children.length >= 1
 * Detail see: https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 *
 * hidden: true                   if set true, item will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu
 *                                if not set alwaysShow, when item has more than one children route,
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noRedirect           if set noRedirect will no redirect in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    roles: ['admin','editor']    control the page roles (you can set multiple roles)
    title: 'title'               the name show in sidebar and breadcrumb (recommend set)
    icon: 'svg-name'/'el-icon-x' the icon show in the sidebar
    breadcrumb: false            if set false, the item will hidden in breadcrumb(default is true)
    activeMenu: '/example/list'  if set path, the sidebar will highlight the path you set
  }
 */

/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed
 */
export const constantRoutes = [
  {
    path: RedirectIntermediateViewRoutePrefix,
    component: Layout,
    hidden: true,
    // children: [RedirectIntermediateViewRoute]
    children: [{
      path: RedirectIntermediateViewRoutePath,
      component: RedirectIntermediateViewComponent
    }]
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('@/views/Login/index'),
    hidden: true
  },

  {
    path: '/404',
    name: 'NotFound',
    component: () => import('@/views/404'),
    hidden: true
  },

  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    children: [{
      path: 'dashboard',
      name: 'Dashboard',
      component: () => import('@/views/Dashboard/index'),
      meta: { title: 'Dashboard', icon: 'dashboard' }
    }]
  },

  {
    path: '/password/edit',
    component: Layout,
    hidden: true,
    children: [{
      path: '',
      name: 'EditPassword',
      component: () => import('@/views/EditPassword/index'),
      meta: { title: 'Edit Password', icon: 'dashboard' }
    }]
  }

]

const createRouter = () => new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

// <router-view :key="$route.fullPath" />
// router.beforeEach((to, from, next) =>{
//   to.query.t = Date.now()
//   next()
// })

export const asyncRoutes = [
  {
    path: '/rbac',
    component: Layout,
    meta: { roles: ['root'] },
    children: [{
      path: '',
      name: 'Rbac',
      component: () => import('@/views/Rbac/index'),
      meta: { title: 'RBAC', icon: 'list', roles: ['root'] }
    }]
  },
  {
    path: '/administrators',
    component: Layout,
    meta: { roles: ['root'] },
    children: [
      {
        path: '',
        name: 'Administrator',
        component: () => import('@/views/Administrator/index'),
        meta: { title: 'Administrator', icon: 'user', roles: ['root'] }
      }
    ]
  },

  // 404 page must be placed at the end !!!
  { path: '*', name: 'Any', redirect: '/404', hidden: true }
]

export default router
