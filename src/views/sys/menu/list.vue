<template>
  <div>
    <div class="tools">
      <el-button type="primary" v-has="'sys'" @click="handleCreate">添加</el-button>
    </div>
    <div class="container">
      <tree-table :data="data" :columns="columns" border :loading="loading">
        <el-table-column label="操作" width="210">
          <template slot-scope="scope">
            <el-button type="success" @click="handleCreate(scope.row)">添加</el-button>
            <el-button type="primary" @click="handleUpdate(scope.row)">编辑</el-button>
            <el-button type="danger" @click="handleDel(scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </tree-table>
    </div>
    <el-dialog :title="dialogTitle[dialogType]" :visible.sync="dialogFormVisible">
      <el-form ref="dataForm" :rules="rules" :model="temp" label-position="left" label-width="100px"
               style="width: 400px; margin-left:100px;">
        <el-form-item label="菜单名称" prop="name">
          <el-input v-model="temp.name"/>
        </el-form-item>
        <el-form-item label="path" prop="path">
          <el-input v-model="temp.path"/>
        </el-form-item>
        <el-form-item label="api">
          <el-input v-model="temp.api"/>
        </el-form-item>
        <el-form-item label="类型" prop="type">
          <el-select v-model="temp.type" class="filter-item" placeholder="请选择类型">
            <el-option label="菜单" value="0"/>
            <el-option label="按钮" value="1"/>
          </el-select>
        </el-form-item>
        <el-form-item label="权限" prop="permission">
          <el-input v-model="temp.permission"/>
        </el-form-item>
        <el-form-item label="排序" prop="order">
          <el-input v-model="temp.order"/>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取消</el-button>
        <el-button type="primary" @click="dataCommit">提交</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  import api from "../../../api/sys/menu"
  import treeTable from '../../../components/treeTable'

  export default {
    name: 'menu_list',
    components: {treeTable},
    data() {
      return {
        loading: true,
        columns: [
          {
            text: '菜单名称',
            value: 'name',
          },
          {
            text: 'path',
            value: 'path'
          },
          {
            text: '类型',
            value: 'typeText'
          },
          {
            text: '权限',
            value: 'permission'
          },
          {
            text: '排序',
            value: 'order'
          }
        ],
        data: [],
        dialogTitle: {
          edit: '修改',
          create: '添加'
        },
        dialogFormVisible: false,
        dialogType: "edit", //create
        temp: {
          id: null,
          name: "",
          order: 0,
          parentId: null,
          path: "",
          permission: "",
          type: "",
          api: ""
        },
        menuTypes: ["菜单", "按钮"],
        rules: {
          id: [{required: true, message: '不能为空', trigger: 'change'}],
          name: [{required: true, message: '不能为空', trigger: 'change'}],
          order: [{required: true, message: '不能为空', trigger: 'change'}],
          parentId: [{required: true, message: '不能为空', trigger: 'change'}],
          path: [{required: true, message: '不能为空', trigger: 'change'}],
          permission: [{required: true, message: '不能为空', trigger: 'change'}],
          type: [{required: true, message: '不能为空', trigger: 'change'}]
        }
      }
    },
    created() {
      this.menuList()
    },
    watch: {
      dialogFormVisible(n) {
        if (!n) {
          this.$refs.dataForm.resetFields();
        }
      }
    },
    methods: {
      menuList() {
        this.loading = true
        api.list().then(response => {
          for (let i of response.data) {
            i["typeText"] = this.menuTypes[i.type];
          }

          this.data = response.data
          this.loading = false
        }).catch(() => {
          this.loading = false
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
          order: 0,
          api: ""
        }
        if (row) {
          this.temp.parentId = row.id
        }
      },
      handleUpdate(row) {
        this.dialogFormVisible = true
        this.dialogType = "edit"
        this.temp = Object.assign({}, row)
        if (this.temp.parent) {
          delete this.temp.parent;
        }
        if (this.temp.children) {
          delete this.temp.children;
        }
      },
      dataCommit() {
        this.$refs.dataForm.validate(valid => {
          if (valid) {
            if (this.dialogType === 'create') {
              this.createData()
            } else {
              this.updateData()
            }
          } else {
            return false
          }
        })
      },
      handleDel(row) {
        this.$confirm(`是否删除 ${row.name} 菜单`, '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          api.delete(row.id).then(() => {
            this.$message({
              type: 'success',
              message: '删除成功!'
            })
            this.menuList()
          }).catch(() => {
            this.$message({
              type: 'error',
              message: '删除失败!'
            })
          })
        }).catch(() => {
        });
      },
      createData() {
        api.add(this.temp).then(() => {
          this.dialogFormVisible = false
          this.$message({
            type: 'success',
            message: '添加成功!'
          })
          this.menuList()
        }).catch(() => {
          this.dialogFormVisible = false
          this.$message({
            type: 'error',
            message: '添加失败!'
          })
        })
      },
      updateData() {
        console.log(this.temp)
        api.update(this.temp).then(() => {
          this.dialogFormVisible = false
          this.$message({
            type: 'success',
            message: '编辑成功!'
          })
          this.menuList()
        }).catch(() => {
          this.dialogFormVisible = false
          this.$message({
            type: 'error',
            message: '编辑失败!'
          })
        })
      }
    }
  }
</script>
