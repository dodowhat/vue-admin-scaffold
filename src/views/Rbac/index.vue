<template>
  <div class="app-container">
    <el-table
      :data="list"
      style="width:100%"
    >
      <el-table-column
        prop="name"
        label="Name"
      />
      <el-table-column>
        <template slot="header">
          <el-button
            size="mini"
            type="primary"
            @click="createItem"
          >
            Create
          </el-button>
        </template>
        <template slot-scope="scope">
          <el-button-group v-if="scope.row.name != 'admin'">
            <el-button
              size="mini"
              type="primary"
              @click="showPermissions(scope.row)"
            >
              Permissions
            </el-button>
            <el-button
              size="mini"
              type="danger"
              icon="el-icon-delete"
              @click="destroyItem(scope.row.name)"
            />
          </el-button-group>
        </template>
      </el-table-column>
    </el-table>

    <el-dialog
      :title="`Assigning permissions for ${role.name}`"
      :visible.sync="permissionsVisible"
      @closed="hidePermissions"
    >
      <el-tree
        ref="permissionTree"
        v-loading="permissionTreeLoading"
        node-key="permission"
        :data="permissionTreeData"
        :props="{ label: 'summary', children: 'children' }"
        show-checkbox
        accordion
      />
      <div slot="footer">
        <el-button type="primary" @click="assignPermissions">Submit</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import {
  fetchRoles,
  destroyRole,
  createRole,
  fetchPermissions,
  fetchPermissionsForRole,
  assignPermissionsForRole
} from '@/api/rbac'

export default {
  components: {
  },
  data() {
    return {
      list: [],
      query: {},
      permissionsVisible: false,
      permissionTreeData: [],
      permissionTreeLoading: false,
      role: {}
    }
  },
  created() {
    fetchRoles().then(response => {
      const roles = []
      response.data.forEach(role => {
        roles.push({ name: role })
      })
      this.list = roles
    })
  },
  methods: {
    treeDataFormat(data) {
      const treeData = []
      const tags = []
      for (const [path, methods] of Object.entries(data)) {
        for (const [method, note] of Object.entries(methods)) {
          note.tags.forEach(tag => {
            if (!tags.includes(tag)) {
              tags.push(tag)
              treeData.push({
                permission: `tag,${tag}`,
                summary: tag,
                children: []
              })
            }
            const index = tags.indexOf(tag)
            treeData[index].children.push({
              permission: `${method},${path}`,
              summary: note.summary
            })
          })
        }
      }
      return treeData
    },
    fetchPermissionsForRole() {
      fetchPermissionsForRole(this.role.name).then(response => {
        const keys = response.data.map(permission => {
          permission.shift()
          return permission.reverse().join(',')
        })
        this.$refs.permissionTree.setCheckedKeys(keys)
        this.permissionTreeLoading = false
      })
    },
    showPermissions(role) {
      this.permissionsVisible = true
      this.permissionTreeLoading = true
      this.role = Object.assign({}, role)
      if (this.permissionTreeData.length > 0) {
        this.fetchPermissionsForRole()
      } else {
        fetchPermissions().then(response => {
          this.permissionTreeData = this.treeDataFormat(response.data)
          this.fetchPermissionsForRole()
        })
      }
    },
    hidePermissions() {
      this.permissionsVisible = false
      this.role = {}
    },
    assignPermissions() {
      const keys = this.$refs.permissionTree.getCheckedKeys()
      const permissions = {}
      for (const key of keys) {
        if (!key.startsWith('tag')) {
          const permission = key.split(',')
          const method = permission[0]
          const path = permission[1]
          if (!permissions[path]) permissions[path] = {}
          permissions[path][method] = true
        }
      }
      assignPermissionsForRole(this.role.name, permissions).then(() => {
        this.hidePermissions()
        this.$notify.success({
          title: 'Success',
          message: 'Success'
        })
        this.$root.rReplace(this.$route.fullPath)
      }).catch(error => { return error })
    },
    createItem() {
      this.$prompt('Role Name', 'Create Role', {
        confirmButtonText: 'Submit',
        inputPattern: /^[A-Za-z0-9]{3,}$/,
        inputErrorMessage: 'at least 3 alphabetas or alphabetas + numbers'
      }).then(({ value }) => {
        createRole({ name: value }).then(response => {
          this.$notify.success({
            title: 'Success',
            message: 'Success'
          })
          this.$root.rReplace(this.$route.fullPath)
        })
      }).catch(() => {})
    },
    destroyItem(name) {
      this.$confirm('Delete this item ?', 'Confirm', {
        confirmButtonText: 'Confirm',
        cancelButtonText: 'Candel',
        type: 'warning'
      }).then(() => {
        destroyRole(name).then(response => {
          this.$notify.success({
            title: 'Success',
            message: 'Success'
          })
          this.$root.rReplace(this.$route.fullPath)
        })
      }).catch(() => {})
    }
  }
}
</script>
