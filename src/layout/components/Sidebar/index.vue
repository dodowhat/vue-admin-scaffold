<template>
  <div :class="{'has-logo':showLogo}">
    <logo v-if="showLogo" :collapse="isCollapse" />
    <el-scrollbar wrap-class="scrollbar-wrapper">
      <el-menu
        :default-active="activeMenu"
        :collapse="isCollapse"
        :background-color="variables.menuBg"
        :text-color="variables.menuText"
        :unique-opened="false"
        :active-text-color="variables.menuActiveText"
        :collapse-transition="false"
        mode="vertical"
      >
        <sidebar-item v-for="(route, index) in permission_routes" :key="route.path + index" :item="route" :base-path="route.path" />
      </el-menu>
    </el-scrollbar>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import Logo from './Logo'
import SidebarItem from './SidebarItem'
import variables from '@/styles/variables.scss'

function hideNoPermissionRoutes(routes, roles) {
  const updatedRoutes = JSON.parse(JSON.stringify(routes))
  for (let i = 0; i < routes.length; i++) {
    const route = updatedRoutes[i]
    if (route.meta && route.meta.roles) {
      if (!roles.some(role => route.meta.roles.includes(role))) {
        route.hidden = true
      }
    }
    if (route.children && route.children.length > 0) {
      route.children = hideNoPermissionRoutes(route.children, roles)
    }
  }
  return updatedRoutes
}

export default {
  components: { SidebarItem, Logo },
  computed: {
    ...mapGetters([
      'sidebar',
      'permission_routes'
    ]),
    routes() {
      return hideNoPermissionRoutes(this.$router.options.routes, this.$store.getters.roles)
    },
    activeMenu() {
      const route = this.$route
      const { meta, path } = route
      // if set path, the sidebar will highlight the path you set
      if (meta.activeMenu) {
        return meta.activeMenu
      }
      return path
    },
    showLogo() {
      return this.$store.state.settings.sidebarLogo
    },
    variables() {
      return variables
    },
    isCollapse() {
      return !this.sidebar.opened
    }
  }
}
</script>

<style>
/* path { fill: inherit !important } */
</style>
