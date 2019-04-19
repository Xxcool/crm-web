<template>
  <div>
    <div class="tools">
      <el-button type="primary" :v-has="'sys'" @click="handleCreate">添加</el-button>
    </div>
    <el-table
      :data="tableData"
      border
      stripe
      v-loading="loading"
      element-loading-text="拼命加载中..."
      @sort-change="tableSortChange"
      style="width: 100%">
      <el-table-column
        prop="id"
        label="ID"
        sortable
        width="120">
      </el-table-column>
      <el-table-column
        prop="name"
        label="角色名称">
      </el-table-column>
      <el-table-column
        label="操作"
        width="200">
        <template slot-scope="scope">
          <el-button type="text" @click="handleEditMenu(scope)">配置权限</el-button>
          <el-button type="text" @click="handleUpdate(scope)">编辑</el-button>
          <el-button type="text" @click="handleDel(scope)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <pagination v-show="total > filter.count" :total="total" :page.sync="filter.page"
                :pageSize.sync="filter.count" @pagination="loadData"/>
    <el-dialog :title="dialogTitle[dialogType]" :visible.sync="dialogFormVisible" width="30%">
      <el-form ref="detailForm" :rules="rules" :model="temp" label-position="left" label-width="80px">
        <el-form-item label="角色名称" prop="name">
          <el-input v-model="temp.name"/>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取消</el-button>
        <el-button type="primary" @click="save('detailForm')">提交
        </el-button>
      </div>
    </el-dialog>
    <el-dialog title="配置菜单" :visible.sync="dialogMenuVisible">
      <el-tree
        ref="menuTree"
        :data="menuList"
        show-checkbox
        node-key="id"
        :default-checked-keys="checkedIds"
        :props="props">
      </el-tree>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogMenuVisible = false">取 消</el-button>
        <el-button type="primary" @click="saveRoleMenu(roleId)">确 定</el-button>
      </div>
    </el-dialog>
  </div>
  <!--分页end-->
</template>

<script>
  import api from "../../../api/sys/role"

  export default {
    name: "list",
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
        dialogTitle: {
          update: '修改',
          create: '添加'
        },
        dialogFormVisible: false,
        dialogMenuVisible: false,
        dialogType: "edit", //create
        temp: {
          id: null,
          name: "系统管理",
        },
        rules: {
          name: [{required: true, message: '请输入角色名称', trigger: 'change'}],
        },
        menuList: [],
        checkedIds: [],
        roleId: null,
        props: {
          label: 'name'
        }
      }
    },
    created() {
      this.loadData()
    },
    watch: {
      dialogFormVisible(n) {
        if (!n) {
          this.$refs.detailForm.resetFields();
        }
      }
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
      handleDel(val) {
        console.log(val)
        this.$confirm('是否删除来源【' + val.row.name + '】?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          api.del(val.row.id).then(() => {
            this.$message.success("删除成功")
            this.loadData();
          }).catch(() => {
          })
        }).catch(() => {
        })
      },
      handleCreate(row) {
        this.dialogFormVisible = true
        this.dialogType = "create"
        this.temp = {
          name: "",
          path: "",
          type: null,
          permission: "",
          order: null,
        }
        if (row) {
          this.temp.parentId = row.id
        }
      },
      handleUpdate(val) {
        this.dialogFormVisible = true
        this.dialogType = "edit"
        this.temp.id = val.row.id
        this.temp.name = val.row.name
      },
      handleEditMenu(val) {
        api.getRoleMenuTree(val.row.id).then(res => {
          this.menuList = res.data
          this.roleId = val.row.id
          this.dialogMenuVisible = true
          let menuIds = [];
          for (let i = 0; i < res.data.length; i++) {
            let menu = res.data[i];
            if (menu.checked) {
              menuIds.push(menu.id);
              menuIds = menuIds.concat(this.getCheckedMenuIds(menu))
            }
          }
          this.checkedIds = menuIds
        }).catch(() => {
        })
      },
      tableSortChange(val) {
        console.log(val)
        if (val.prop != null) {
          if (val.order === 'descending') {
            this.filter.order = 'desc'
          } else {
            this.filter.order = 'asc'
          }
          this.filter.sort = val.prop;
        } else {
          this.filter.order = ''
        }
        this.loadData();
      },
      save(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            api.save(this.temp).then(() => {
              this.dialogFormVisible = false
              this.$message({
                type: 'success',
                message: '保存成功!'
              })
              this.loadData()
            }).catch(() => {
              this.dialogFormVisible = false
            })
          } else {
            return false;
          }
        });

      },
      saveRoleMenu(id) {
        this.dialogMenuVisible = false
        console.log(this.$refs.menuTree.getCheckedKeys())
        api.updateRoleMenu(id, this.$refs.menuTree.getCheckedKeys()).then(() => {
          this.$message.success("保存成功")
          this.loadData();
        }).catch(() => {
        })
      },
      getCheckedMenuIds(menu) {
        let menuIds = [];
        if (menu.checked) {
          if (menu.children && menu.children.length > 0) {
            for (let i = 0; i < menu.children.length; i++) {
              let sub = menu.children[i];
              menuIds = menuIds.concat(this.getCheckedMenuIds(sub))
            }
          }
        }
        return menuIds
      }
    }
  }
</script>

<style scoped>

</style>