<template>
  <div>
    <div class="tools">
      <el-button type="primary" v-has="'sys:role:list:_add'" @click="handleCreate">添加</el-button>
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
        width="240">
        <template slot-scope="scope">
          <el-button type="success" v-has="'sys:role:list:_config'" @click="handleEditMenu(scope)">配置权限</el-button>
          <el-button type="primary" v-has="'sys:role:list:_edit'" @click="handleUpdate(scope)">编辑</el-button>
          <el-button type="danger" v-has="'sys:role:list:_del'" @click="handleDel(scope)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <pagination :total="total" :page.sync="filter.page"
                :pageSize.sync="filter.count" @pagination="loadData"/>
    <el-dialog :title="dialogTitle[dialogType]" :visible.sync="dialogFormVisible" width="400px">
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
    <el-dialog title="配置菜单" :visible.sync="dialogMenuVisible" width="400px">
      <div style="max-height: 400px;overflow-y: auto">
        <tree v-if="menuList.length > 0"  v-model="checkedIds" :tree-data="menuList" :options="options"></tree>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogMenuVisible = false">取 消</el-button>
        <el-button type="primary" @click="saveRoleMenu(roleId)">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  import api from "../../../api/sys/role"
  import tree from '../../../components/tree/index.vue'

  export default {
    name: "list",
    components: {tree},
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
        options: {
          label: 'name',
          depthOpen: 1
        },
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
        this.menuList = [];
        this.checkedIds = []
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
        api.updateRoleMenu(id, this.checkedIds).then(() => {
          this.$message.success("保存成功")
          this.loadData();
          this.dialogMenuVisible = false
        }).catch(() => {
        })
      },
      getCheckedMenuIds(menu) {
        let menuIds = [];
        if (menu.checked) {
          if (menu.children && menu.children.length > 0) {
            for (let i = 0; i < menu.children.length; i++) {
              let sub = menu.children[i];
              if (sub.checked) {
                menuIds.push(sub.id);
                menuIds = menuIds.concat(this.getCheckedMenuIds(sub))
              }
            }
          }
        }
        return menuIds
      }
    }
  }
</script>
