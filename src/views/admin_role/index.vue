<template>
  <div class="app-container">
    <el-table
      :data="list"
      style="width:100%"
    >
      <el-table-column
        prop="id"
        label="ID"
      />
      <el-table-column
        prop="name"
        label="Name"
      />
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
              @click="showActions(scope.row)"
            >
              Actions
            </el-button>
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

    <el-dialog
      :title="`Assigning actions for ${role.name}`"
      :visible.sync="actionsVisible"
      @closed="hideActions"
    >
      <el-tree
        ref="actionTree"
        v-loading="actionTreeLoading"
        node-key="id"
        :data="actionTreeData"
        :props="actionTreeProps"
        :default-checked-keys="actionTreeDefaultChecked"
        show-checkbox
      />
      <div slot="footer">
        <el-button type="primary" @click="assignActions">Submit</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import {
  fetchList,
  destroyItem,
  assignActions,
  createItem
} from '@/api/admin_role'
import { fetchList as fetchActions } from '@/api/admin_action'

export default {
  components: {
  },
  data() {
    return {
      list: [],
      query: {},
      actionsVisible: false,
      actionTreeData: [],
      actionTreeProps: {
        label: 'name',
        children: 'actions'
      },
      actionTreeDefaultChecked: [],
      actionTreeLoading: false,
      role: {}
    }
  },
  created() {
    this.query.page = this.$route.query ? Number(this.$route.query) : 1
    fetchList(this.query).then(response => {
      this.list = response.data
    })
  },
  methods: {
    pageChange(data) {
      this.query.page = data.page
      this.redirect()
    },
    redirect() {
      this.$route.push({
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
    showActions(role) {
      this.actionsVisible = true
      this.actionTreeLoading = true
      this.role = Object.assign({}, role)
      fetchActions().then(response => {
        this.actionTreeLoading = false
        this.actionTreeData = response.data.map(group => {
          group.id = null
          return group
        })
        this.actionTreeDefaultChecked = this.role.actions.map(action => action.id)
      })
    },
    hideActions() {
      this.actionsVisible = false
      this.role = {}
      this.actions = []
    },
    assignActions() {
      const actionIds = this.$refs.actionTree.getCheckedKeys().filter(id => id !== null)
      assignActions(this.role.id, actionIds).then(() => {
        this.hideActions()
        this.$notify.success({
          title: 'Success',
          message: 'Success'
        })
        this.$root.rReplace(this.$route.fullPath)
      })
    },
    createItem() {
      this.$prompt('Role Name', 'Create Role', {
        confirmButtonText: 'Submit',
        inputPattern: /^[A-Za-z0-9]{3,}$/,
        inputErrorMessage: 'at least 3 alphabetas or alphabetas + numbers'
      }).then(({ value }) => {
        createItem({ name: value }).then(response => {
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
