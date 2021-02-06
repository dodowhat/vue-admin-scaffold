const RedirectIntermediateViewRoutePrefix = '/r'

const RedirectIntermediateViewRoutePath = RedirectIntermediateViewRoutePrefix + '/:path(.*)'

const RedirectIntermediateViewComponent = {
  created() {
    const { params, query } = this.$route
    const { path } = params
    this.$router.replace({ path: '/' + path, query })
  },
  render: function(h) {
    return h() // avoid warning message
  }
}

const RedirectIntermediateView = {
  install(Vue, options) {
    Vue.mixin({
      methods: {
        rPush(location) {
          if (location.path) {
            location.path = RedirectIntermediateViewRoutePrefix + location.path
          } else {
            location = RedirectIntermediateViewRoutePrefix + location
          }
          this.$router.push(location)
        },
        rReplace(location) {
          if (location.path) {
            location.path = RedirectIntermediateViewRoutePrefix + location.path
          } else {
            location = RedirectIntermediateViewRoutePrefix + location
          }
          this.$router.replace(location)
        }
      }
    })
  }
}

export {
  RedirectIntermediateView,
  RedirectIntermediateViewComponent,
  RedirectIntermediateViewRoutePrefix,
  RedirectIntermediateViewRoutePath
}
