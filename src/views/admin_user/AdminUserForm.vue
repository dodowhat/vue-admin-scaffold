<template>
  <div>
    <el-form
      ref="userForm"
      :model="formData"
      label-width="100px"
      :rules="rules"
    >
      <el-form-item label="Username" prop="username">
        <el-input v-model="formData.username" />
      </el-form-item>
      <el-form-item label="Password" prop="password">
        <el-input v-model="formData.password" show-password />
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
export default {
  name: 'AdminUserForm',
  props: {
    formData: {
      type: Object,
      default() {
        return {
          username: '',
          password: ''
        }
      }
    }
  },
  data() {
    return {
      rules: {
        username: [
          { required: true, trigger: 'blur' },
          { pattern: /^[A-Za-z0-9]{3,}$/, message: 'at least 3 alphabetas or alphabetas + numbers', trigger: 'blur' }
        ],
        password: [
          { required: true, trigger: 'blur' },
          { min: 8, message: 'at least 8 characters', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    submit() {
      this.$refs.userForm.validate(isValid => {
        if (isValid) {
          this.$emit('submit', this.formData)
        }
      })
    }
  }
}
</script>
