<template>
  <div>
    <div class="tools">
      <el-button type="primary" @click="handleCreate">添加</el-button>
    </div>
    <div class="container">
      <tree-table :data="data" :columns="columns" border :loading="loading">
          <el-table-column label="操作" width="210">
            <template slot-scope="scope">
              <el-button type="success" @click="handleCreate(scope.row)">添加</el-button>
              <el-button type="primary" @click="handleUpdate(scope.row)">修改</el-button>
              <el-button type="danger" @click="handleDel(scope.row)">删除</el-button>
            </template>
          </el-table-column>
      </tree-table>
    </div>

    <el-dialog :title="dialogTitle[dialogType]" :visible.sync="dialogFormVisible">
      <el-form ref="dataForm" :rules="rules" :model="job" label-position="left" label-width="100px"
               style="width: 400px; margin-left:100px;">
        <el-form-item label="职务名称" prop="name">
          <el-input v-model="job.name"/>
        </el-form-item>
        <el-form-item label="所属机构：" prop="orgCode">
          <select-tree v-model="job.orgCode" :options="orgTree"
                       :props="{
                            parent: 'parentCode',
                            value: 'code',
                            label: 'name',
                            children: 'children',
                          }"
          />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取消</el-button>
        <el-button type="primary" @click="dataCommit()">提交</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>

    import api from "../../../api/sys/job"
    import orgApi from "../../../api/sys/org"
    import selectTree from '../../../components/selectTree/index.vue'
    import treeTable from '../../../components/treeTable'

    export default {
      name:'job_list',
      components: {treeTable,selectTree},
      data(){
        return{
          loading:true,
          data:[],
          orgTree:[],
          columns:[
            {
              text:'职务名称',
              value:'name'
            },
            {
              text:'所属机构',
              value:'orgName'
            }
          ],
          job:{
            code:null,
            name:"",
            parentCode:null,
            orgCode:""
          },
          rules:{
            name:[{required:true,message:"不能为空",trigger:'change'}],
            orgCode:[{required:true,message:"不能为空",trigger:'change'}]
          },
          dialogType:"create",
          dialogTitle:{
            edit:'修改',
            create:'添加'
          },
          dialogFormVisible: false
        }
      },
      created(){
        this.loadData();
        this.loadOrgData();
      },
      methods:{
        loadData(){
          this.loading=true;
          api.tree().then(res=>{
              this.data=res.data;
            console.log(this.data);
              this.loading=false
          }).catch(()=>{
              this.loading=false
          });
          orgApi.tree().then(res=>{
            this.orgTree=res.data;
            this.loading=false
          });
        },
        loadOrgData(){
          this.loading=true;
          orgApi.tree().then(res=>{
            this.orgTree=res.data;
            this.loading=false
          }).catch(()=>{
            this.loading=false
          })
        },

        handleCreate(row){
          this.dialogFormVisible=true
          this.dialogType="create"
          this.job = {
            code:null,
            name:"",
            parentCode:null,
            orgCode:""
          }
          if(row){
            this.job.parentCode=row.code;
          }
        },

        handleUpdate(row){
          this.dialogFormVisible=true;
          this.dialogType="edit";
          this.job=Object.assign({},row);
          if (this.job.parent) {
            delete this.job.parent;
          }
          if (this.job.children) {
            delete this.job.children;
          }
        },

        dataCommit(){
          this.$refs.dataForm.validate(valid =>{
              if(valid){
                if(this.dialogType==='create'){
                  this.createData();
                }else{
                  this.updateData();
                }
              }
          })
        },

        createData(){
          api.add(this.job).then(()=>{
            this.dialogFormVisible=false
            this.$message({
              type:'success',
              message:'添加成功!'
            })
            this.loadData();
          }).catch(()=>{
            this.$message({
              type:'error',
              message:'添加失败!'
            })
          })
        },

        updateData(){
            api.update(this.job).then(()=>{
              this.dialogFormVisible=false
              this.$message({
                type:'success',
                message:'修改成功!'
              })
              this.loadData();
            }).catch(()=>{
              this.$message({
                type:'error',
                message:'修改失败!'
              })
            })
        },

        handleDel(row){
          this.$confirm(`是否删除${row.name}职务`,'提示',{
            confirmButtonText:'确定',
            cancelButtonText:'取消',
            type:'warning'
          }).then(()=>{
            api.del(row.code).then(() =>{
              this.$message({
                type:'success',
                message:'删除成功!'
              });
              this.loadData()
            }).catch(()=>{
              this.$message({
                type:'error',
                message:'删除失败!'
              })
            })
          }).catch(() =>{

          })
        }
      }
    }
</script>