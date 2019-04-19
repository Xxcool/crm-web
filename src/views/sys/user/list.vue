<template>
  <div>
    <el-table
      :data="tableData"
      border
      stripe
      v-loading="loading"
      element-loading-text="拼命加载中...">
      <el-table-column
        prop="name"
        label="用户名">
      </el-table-column>
      <el-table-column
        prop="email"
        label="邮箱">
      </el-table-column>
      <el-table-column
        prop="roleName"
        label="角色">
      </el-table-column>
      <el-table-column
        prop="orgName"
        label="部门">
      </el-table-column>
      <el-table-column
        label="启用状态">
        <template slot-scope="scope">
            <span v-if="scope.row.status===1">
              启用
            </span>
            <span v-if="scope.row.status===0">
              未启用
            </span>
        </template>
      </el-table-column>
      <el-table-column
        label="操作"
        width="200">
        <template slot-scope="scope">
          <el-button type="primary" @click="handleUpdate(scope.row)">编辑</el-button>
          <el-button type="danger" @click="handleDel(scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <pagination v-show="total > filter.count" :total="total" :page.sync="filter.page"
                :pageSize.sync="filter.count" @pagination="loadData"/>
  </div>
  <!--分页end-->
</template>

<script>
  import api from "../../../api/sys/user"

  export default {
    name: "user_list",
    data() {
      return {
        tableData: [],
        filter: {
          count: 10, // 页大小
          page: 1, // 当前页
          sorts: '',
          order: '',
          params: {
            // 自定义参数
          }
        },
        total: 0,
        loading: true,
      }
    },
    created() {
      this.loadData()
    },
    methods: {
      loadData() {
        this.loading = true;
        api.list(this.filter).then(res => {
          this.tableData = res.data.results
          this.total = res.data.count
          this.loading = false
        }).catch(() => {
          this.loading = false
        })
      },
      handleDel(row) {
        this.$confirm('是否删除来源【' + row.name + '】?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          api.del(row.id).then(() => {
            this.$message.success("删除成功")
            this.loadData();
          }).catch(() => {
          })
        }).catch(() => {
        })
      },
      handleUpdate(row) {
        this.$router.push({path: "/user/edit", query: {id: row.id}})
      }
    }
  }
</script>

<style scoped>

</style>