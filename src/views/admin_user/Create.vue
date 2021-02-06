<template>
  <div class="app-container">
    <admin-user-form :form-data="user" @submit="submit" />
  </div>
</template>

<script>
import AdminUserForm from './AdminUserForm.vue'
import { createItem } from '@/api/admin_user'

export default {
  components: {
    AdminUserForm
  },
  data() {
    return {
      user: {
        username: '',
        password: ''
      }
    }
  },
  created() {
  },
  methods: {
    submit(user) {
      createItem(user).then(response => {
        this.$router.push('/admin_users')
      })
    }
  }
}
</script>
