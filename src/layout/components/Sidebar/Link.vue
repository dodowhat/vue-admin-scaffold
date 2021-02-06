
<template>
  <!-- eslint-disable vue/require-component-is -->
  <component v-bind="linkProps(to)" @click="handleClick(to)">
    <slot />
  </component>
</template>

<script>
import { isExternal } from '@/utils/validate'

export default {
  props: {
    to: {
      type: String,
      required: true
    }
  },
  methods: {
    linkProps(url) {
      return {
        is: 'div'
      }
    },
    handleClick(url) {
      if (url === this.$route.path || this.$route.path.includes(url)) {
        this.$root.rReplace(url)
      } else if (isExternal(url)) {
        window.open(url, '_blank')
      } else {
        this.$router.push({
          path: url
        })
      }
    }
  }
}
</script>
