<template>
  <div>
    <div class="tools">
      <el-button type="primary" v-has="'sys:org:list:_add'" @click="handleCreate">添加</el-button>
    </div>
    <div class="container">
      <el-table :data="data" border row-key="code" :loading="loading">
        <el-table-column v-for="item in columns" :key="item.id" :label="item.text" :prop="item.value">
        </el-table-column>
        <el-table-column label="操作" width="210">
          <template slot-scope="scope">
            <el-button type="success" v-has="'sys:org:list:_addChild'" @click="handleCreate(scope.row)">添加</el-button>
            <el-button type="primary" v-has="'sys:org:list:_edit'" @click="handleUpdate(scope.row)">编辑</el-button>
            <el-button type="danger" v-has="'sys:org:list:_del'" @click="handleDel(scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <el-dialog :title="dialogTitle[dialogType]" :visible.sync="dialogFormVisible">
      <el-form ref="dataForm" :rules="rules" :model="temp" label-position="left" label-width="100px"
               style="width: 400px; margin-left:100px;">
        <el-form-item label="机构名称" prop="name">
          <el-input v-model="temp.name"/>
        </el-form-item>
        <!-- <el-form-item label="客户标签">
          <el-tree
            ref="tagTree"
            :data="tagList"
            show-checkbox
            node-key="code"
            :default-checked-keys="tagCodes"
            :props="props">
          </el-tree>
        </el-form-item> -->

      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取消</el-button>
        <el-button type="primary" @click="dataCommit">提交</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  import api from "../../../api/sys/org"
  // import tag from "../../../api/sys/tag"

  export default {
    name: 'menu_list',
    data() {
      return {
        loading: true,
        columns: [
          {
            text: '机构名称',
            value: 'name',
          }
        ],
        data: [],
        // tagList:[],
        tagCodes:[],
        props:{
          label:"name"
        },
        dialogTitle: {
          edit: '修改',
          create: '添加'
        },
        dialogFormVisible: false,
        dialogType: "edit", //create
        temp: {
          code: null,
          name: "",
          parentCode: null,
          tagCodes:[]
        },
        menuTypes: ["菜单", "按钮"],
        rules: {
          name: [{required: true, message: '不能为空', trigger: 'change'}],
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
        api.tree().then(response => {
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
        // tag.getOrgTagTree(row.code).then(res=>{
        //   this.tagList=res.data;
        //   this.tagCodes=[];
        // });
       this.dialogFormVisible = true
        this.dialogType = "create"
        this.temp = {
          code: null,
          name: "",
          parentCode: null
        }
        if (row) {
          this.temp.parentCode = row.code
        }
      },
      handleUpdate(row) {
        // tag.getOrgTagTree(row.code).then(res=>{
        //   this.tagList=res.data;
        //   let tagCodes=[];
        //   for (let i=0;i<res.data.length;i++){
        //     let tag=res.data[i];
        //     if(tag.checked){
        //       tagCodes.push(tag.code);
        //     }
        //     tagCodes=tagCodes.concat(this.getCheckedTagCodes(tag))
        //   }
        //   console.log(tagCodes);
        //   this.tagCodes=tagCodes;
        // });
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
      getCheckedTagCodes(tag){
        let tagCodes=[];
        if (tag.children && tag.children.length > 0) {
          for (let i = 0; i < tag.children.length; i++) {
            let orgTag = tag.children[i];
            if(orgTag.checked){
              tagCodes.push(orgTag.code);
            }
            tagCodes = tagCodes.concat(this.getCheckedTagCodes(orgTag))
          }
        }
        return tagCodes;
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
        this.$confirm(`是否删除 ${row.name} 组织机构`, '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          api.del(row.code).then(() => {
            this.$message({
              type: 'success',
              message: '删除成功!'
            })
            this.menuList()
          }).catch(() => {
          })
        }).catch(() => {
        });
      },
      createData() {
       // this.temp.tagCodes=this.$refs.tagTree.getCheckedKeys();
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
        // this.temp.tagCodes=this.$refs.tagTree.getCheckedKeys();
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
