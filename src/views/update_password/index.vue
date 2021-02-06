<template>
  <div class="app-container">
    <el-form
      ref="passwordForm"
      :model="formData"
      label-width="150px"
      :rules="rules"
      style="width: 500px"
    >
      <el-form-item label="Current Password" prop="password">
        <el-input v-model="formData.password" show-password />
      </el-form-item>
      <el-form-item label="New Password" prop="new_password">
        <el-input v-model="formData.new_password" show-password />
      </el-form-item>
      <el-form-item>
        <el-button @click="submit">
          Submit
        </el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { updatePassword } from '@/api/auth'

export default {
  data() {
    return {
      formData: {
        password: '',
        new_password: ''
      },
      rules: {
        password: [
          { required: true, trigger: 'blur' }
        ],
        new_password: [
          { required: true, trigger: 'blur' },
          { min: 8, message: 'at least 8 characters', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    submit() {
      this.$refs.passwordForm.validate(isValid => {
        if (isValid) {
          updatePassword(this.formData).then(() => {
            this.$notify.success({
              title: 'Success',
              message: 'Success'
            })
              this.$store.dispatch('user/logout').then(() => {
                this.$router.push(`/login`)
              })
          })
        }
      })
    }
  }
}
</script>