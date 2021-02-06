<template>
  <div class="app-container">
    <el-table
      v-loading="loading"
      :data="list.data"
      style="width:100%"
    >
      <el-table-column
        prop="id"
        label="ID"
      />
      <el-table-column
        prop="username"
        label="Username"
      />
      <el-table-column
        label="Roles"
      >
        <template slot-scope="scope">
          {{ scope.row.roles | roleNames }}
        </template>
      </el-table-column>
      <el-table-column
        prop="created_at"
        label="Created At"
      />
      <el-table-column
        prop="updated_at"
        label="Updated At"
      />
      <el-table-column>
        <template slot="header">
          <el-button
            size="mini"
            type="primary"
            @click="showCreateItemDialog"
          >
            Create
          </el-button>
        </template>
        <template slot-scope="scope">
          <el-button-group>
            <el-button
              size="mini"
              type="primary"
              @click="showRoles(scope.row)"
            >
              Roles
            </el-button>
            <el-button
              size="mini"
              type="warning"
              icon="el-icon-refresh-right"
              @click="resetPassword(scope.row.id)"
            />
            <el-button
              size="mini"
              type="danger"
              icon="el-icon-delete"
              @click="destroyItem(scope.row.id)"
            />
          </el-button-group>
        </template>
      </el-table-column>
    </el-table>

    <br>
    <pagination
      v-if="list.data"
      :total="list.total"
      :page.sync="list.current_page"
      :limit.sync="list.per_page"
      layout="total, prev, pager, next, jumper"
      @pagination="pageChange"
    />

    <el-dialog
      :title="`Assigning roles for ${user.username}`"
      :visible.sync="rolesVisible"
      @closed="hideRoles"
    >
      <el-tree
        ref="roleTree"
        v-loading="roleTreeLoading"
        node-key="id"
        :data="roles"
        :props="roleTreeProps"
        :default-checked-keys="roleTreeDefaultChecked"
        show-checkbox
      />
      <div slot="footer">
        <el-button type="primary" @click="assignRoles">Submit</el-button>
      </div>
    </el-dialog>

    <el-dialog
      title="Create User"
      :visible.sync="createItemDialogVisible"
      @closed="hideCreateItemDialog"
    >
      <admin-user-form :form-data="user" @submit="storeItem" />
    </el-dialog>
  </div>
</template>

<script>
import {
  fetchList,
  destroyItem,
  resetPassword,
  assignRoles,
  createItem
} from '@/api/admin_user'
import { fetchList as fetchRoles } from '@/api/admin_role'

import Pagination from '@/components/Pagination'
import AdminUserForm from './AdminUserForm.vue'

export default {
  components: {
    Pagination,
    AdminUserForm
  },
  filters: {
    roleNames(roles) {
      return roles.map(role => role.name)
    }
  },
  data() {
    return {
      loading: true,
      list: {},
      query: {},
      rolesVisible: false,
      roles: [],
      roleTreeProps: {
        label: 'name'
      },
      user: {},
      roleTreeDefaultChecked: [],
      roleTreeLoading: false,
      createItemDialogVisible: false
    }
  },
  created() {
    this.query.page = this.$route.query ? Number(this.$route.query) : 1
    fetchList(this.query).then(response => {
      this.loading = false
      this.list = response.data
    })
  },
  methods: {
    pageChange(data) {
      this.query.page = data.page
      this.$root.rPush({
        path: this.$route.path,
        query: this.query
      })
    },
    destroyItem(id) {
      this.$confirm('Delete this item ?', 'Confirm', {
        confirmButtonText: 'Confirm',
        cancelButtonText: 'Candel',
        type: 'warning'
      }).then(() => {
        destroyItem(id).then(response => {
          this.$notify.success({
            title: 'Success',
            message: 'Success'
          })
          this.$root.rReplace(this.$route.fullPath)
        })
      }).catch(() => {})
    },
    resetPassword(id) {
      this.$confirm('Reset password ?', 'Confirm', {
        confirmButtonText: 'Confirm',
        cancelButtonText: 'Candel',
        type: 'warning'
      }).then(() => {
        resetPassword(id).then(response => {
          this.$notify.success({
            title: 'Success',
            message: 'New Password: ' + response.data.password,
            duration: 0
          })
        })
      })
    },
    showRoles(user) {
      this.rolesVisible = true
      this.rolesLoading = true
      this.user = Object.assign({}, user)
      fetchRoles().then(response => {
        this.rolesLoading = false
        this.roles = response.data
        this.roleTreeDefaultChecked = this.user.roles.map(role => role.id)
      })
    },
    hideRoles() {
      this.rolesVisible = false
      this.user = {}
      this.roles = []
    },
    assignRoles() {
      const roleIds = this.$refs.roleTree.getCheckedKeys()
      assignRoles(this.user.id, roleIds).then(() => {
        this.hideRoles()
        this.$notify.success({
          title: 'Success',
          message: 'Success'
        })
        this.$root.rReplace(this.$route.fullPath)
      })
    },
    showCreateItemDialog() {
      this.createItemDialogVisible = true
    },
    hideCreateItemDialog() {
      this.createItemDialogVisible = false
      this.user = {}
    },
    storeItem(user) {
      createItem(user).then(response => {
        this.hideCreateItemDialog()
        this.$root.rReplace(this.$route.fullPath)
      })
    }
  }
}
</script>
