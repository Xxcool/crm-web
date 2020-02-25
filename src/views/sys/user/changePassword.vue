<template>
  <el-form ref="detailForm" class="form" :model="user" :rules="rules" label-width="100px">
    <el-form-item label="用户名" prop="name">
      <span v-text="userInfo.name"></span>
    </el-form-item>
    <el-form-item label="新密码" prop="password">
      <el-input v-model="user.password" type="password"></el-input>
    </el-form-item>
    <el-form-item label="重复密码" prop="repeatPassword">
      <el-input v-model="user.repeatPassword" type="password"></el-input>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="onSubmit('detailForm')">保存</el-button>
      <el-button @click="resetForm('detailForm')">取消</el-button>
    </el-form-item>
  </el-form>
</template>
<script>
  import api from "../../../api/sys/user"
  import {mapGetters} from "vuex"

  export default {
    name: "changePassword",
    data() {
      const validatePassword = (rule, value, callback) => {
        if (value !== this.user.password) {
          callback(new Error("请输入相同的密码"))
        } else {
          callback()
        }
      }
      return {
        user: {
          id: null,
          name: '',
          password: '',
          repeatPassword: ""
        },
        rules: {
          password: [{required: true, message: '请输入密码', trigger: 'change'}],
          repeatPassword: [{required: true, validator: validatePassword, trigger: 'change'}]
        }
      }
    },
    computed: {
      ...mapGetters([
        "userInfo"
      ])
    },
    created() {
      this.user.id = this.userInfo.id
    },
    methods: {
      onSubmit(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            api.changePassword(this.user).then(() => {
              this.$message.success("保存成功")
              this.$router.push({path: "/dashboard"});
            }).catch(() => {
            })
          } else {
            return false;
          }
        });
      },
      resetForm() {
        this.$store.dispatch("delView", this.$route).then(() => {
          this.$router.push({path: "/user/list"})
        })
      }
    }
  }
</script>
