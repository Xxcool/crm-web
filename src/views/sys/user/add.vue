<template>
  <div>
    <el-tabs v-model="activeName" type="card">
      <el-tab-pane label="基本信息" name="first">
        <el-form ref="dataForm" :rules="rules" :model="form" label-position="right" label-width="100px">
          <el-form-item label="用户名" prop="name">
            <el-input v-model="form.name" :disabled="!!$route.query.id" maxlength="25"/>
          </el-form-item>
          <el-form-item label="邮箱" prop="email">
            <el-input v-model="form.email" maxlength="60"/>
          </el-form-item>
          <el-form-item label="密码" prop="password">
            <el-input type="password" v-model="form.password"/>
          </el-form-item>
          <el-form-item label="确认密码" prop="password_2">
            <el-input type="password" v-model="form.password_2"/>
          </el-form-item>
          <el-form-item label="启用状态" prop="status">
            <el-radio-group v-model="form.status">
              <el-radio :label="1">启用</el-radio>
              <el-radio :label="0">不启用</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="选择角色" prop="roles">
            <el-checkbox-group v-model="form.roles">
              <el-checkbox v-for="item in roles" :key="item.id" :label="item.id">{{item.name}}</el-checkbox>
            </el-checkbox-group>
          </el-form-item>

          <el-form-item label="选择部门：" prop="orgCode">
            <select-tree v-model="form.orgCode" :options="orgTree"
                         :props="{
                            parent: 'parentCode',
                            value: 'code',
                            label: 'name',
                            children: 'children',
                          }"
            />
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="onSubmit">{{$route.query.id?"保存":"创建"}}</el-button>
            <el-button @click="handleCancel">取消</el-button>
          </el-form-item>
        </el-form>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>
<script>
  import api from "../../../api/sys/user"
  import role from "../../../api/sys/role"
  import org from "../../../api/sys/org"
  import selectTree from '../../../components/selectTree/index.vue'


  export default {
    name: "add",
    components: {selectTree},
    data() {
      const validatePassword_2 = (rule, value, callback) => {
        if (this.form.password && value !== this.form.password) {
          callback(new Error("请输入相同的密码"))
        } else {
          callback()
        }
      }
      return {
        activeName: "first",
        form: {
          name: "",
          password: "",
          password_2: "",
          company: "",
          email:"",
          status: 1,
          orgCode:'',
          roles: [],
        },
        orgTree:[],
        roles: [],
        group: "",
        rules: {
          name: [{required: true, message: '用户名不能为空', trigger: 'change'}],
          email: [{required: true,trigger: 'blur', validator: this.isEmail}],
          roleId: [{required: true, message: '不能为空', trigger: 'change'}],
          password: [{required: true, min: 6, max:20,message: "密码最少6位,最多20位",trigger: "change"}],
          password_2: [{required: true,trigger: "change", validator: validatePassword_2}],
          roles: [{required: true, message: '请选择角色', trigger: 'change'}],
          orgCode: [{required: true, message: '请选择部门', trigger: 'change'}],
        }
      }
    },
    created() {
      this.loadData()
    },
    methods: {
      loadData() {
        role.findListById(0).then(res => {
          this.roles = res.data;
        }).catch(() => {
        })
        org.tree().then(res =>{
          this.orgTree=res.data;
        }).catch(()=>{

        })
        if (this.$route.query.id) {
          api.userDetail(this.$route.query.id).then(res => {
            res.data.password = "";
            console.log(res.data);
            this.form = {...this.form, ...res.data};
            let roles=[];
            this.form.roles.forEach((item)=>{
              roles.push(item.id);
            })
            this.form.roles = roles;
          }).catch(() => {
          })
        }
      },
      onSubmit() {
        this.$refs.dataForm.validate((valid) => {
          if(valid){
            let data={...this.form};
            let roles=[];
            if(this.form.roles.length<1){
              this.$message.warning("用户所属部门不能为空");
              return false;
            }
            if(data.orgCode==null ||data.orgCode==""){
              this.$message.warning("用户所属部门不能为空");
              return false;
            }
            this.form.roles.forEach((item)=>{
              roles.push({id:item});
            });
            data.roles=roles;
            api.save(data).then(() => {
              this.$message.success("保存成功")
              this.handleCancel(true)
            }).catch(() => {
            })
          }else{
            return false;
          }
        })
      },
      handleCancel(state) {
        this.$store.dispatch("delView", this.$route).then(() => {
          this.$router.push({name: "user_list",params:{noKeep:state}})
        })
      },
      isEmail(rule, value, callback) {
        if (value === '' || value === null) {
          callback(new Error('邮箱不可为空'));
        } else {
          if (value !== '') {
            var reg = /^[A-Za-z0-9\u4e00-\u9fa5]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/;
            if (!reg.test(value)) {
              callback(new Error('请输入有效的邮箱'));
            }
          }
          callback();
        }
      },
    }
  }
</script>

<style scoped>
  .form {
    width: 400px;
  }
</style>