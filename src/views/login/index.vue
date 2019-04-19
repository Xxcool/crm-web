<template>
  <div class="login-container">
    <div class="login-bg">
      <div class="clear login-content">
        <div class="left"></div>
        <div class="right">
          <h1>Trade OSS</h1>
          <h2>电子商务平台运营支撑系统</h2>
          <el-form ref="loginForm" :model="loginForm" :rules="loginRules" class="login-form" auto-complete="on" label-position="left">
            <el-form-item prop="userName">
              <el-input
                v-model="loginForm.userName"
                placeholder="用户名"
                name="userName"
                type="text"
                size="login"
                prefix-icon="iconfont icon-yonghu"
                @keyup.enter.native="handleLogin"/>
            </el-form-item>
            <el-form-item prop="password">
              <el-input
                type="password"
                v-model="loginForm.password"
                placeholder="密码"
                name="password"
                autocomplete="on"
                prefix-icon="iconfont icon-mima"
                size="login"
                @keyup.enter.native="handleLogin"/>
            </el-form-item>
            <el-form-item class="verfiy-code clear" prop="verfiyCode">
              <el-input
                class="code-left"
                type="text"
                v-model="loginForm.verfiyCode"
                placeholder="验证码"
                name="verfiyCode"
                prefix-icon="iconfont icon-yanzhengma"
                size="login"
                @keyup.enter.native="handleLogin"/>
              <div class="code-right">1234</div>
            </el-form-item>
            <el-button round size="login" :loading="loading" type="primary" @click.native.prevent="handleLogin">登录</el-button>
          </el-form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

  export default {
    name: "Login",
    data() {
      const validateUsername = (rule, value, callback) => {
        if (value.length <= 0) {
          callback(new Error("请输入用户名"))
        } else {
          callback()
        }
      }
      const validatePassword = (rule, value, callback) => {
        if (value.length < 6) {
          callback(new Error("密码最少6位"))
        } else {
          callback()
        }
      }
      const validateVerfiyCode = (rule, value, callback) => {
        if (value.length <= 0) {
          callback(new Error("请输入验证码"))
        } else {
          callback()
        }
      }
      return {
        loginForm: {
          userName: "admin",
          password: "123456",
          verfiyCode: "code"
        },
        loginRules: {
          userName: [{required: true, trigger: "blur", validator: validateUsername}],
          password: [{required: true, trigger: "blur", validator: validatePassword}],
          verfiyCode: [{required: true, trigger: "blur", validator: validateVerfiyCode}]
        },
        loading: false,
        redirect: undefined
      }
    },
    watch: {
      $route: {
        handler(route) {
          this.redirect = route.query && route.query.redirect
        },
        immediate: true
      }
    },
    methods: {
      handleLogin() {
        this.$refs.loginForm.validate(valid => {
          if (valid) {
            this.loading = true
            this.$store.dispatch("authLogin", this.loginForm).then(() => {
              this.loading = false
              this.$router.push({path: this.redirect || "/"})
            }).catch(() => {
              this.loading = false
            })
          } else {
            console.log("检查登录信息")
            return false
          }
        })
      }
    }
  }
</script>

<style lang="scss">
  .login-container {
    .el-input--login {
      .el-input__inner {
        border-radius: 20px;
      }
      .iconfont {
        color: #409EFF;
      }
    }
    .el-button--login {
      width: 100%;
    }
    .verfiy-code {
      .code-left {
        width: 160px;
        float: left;
      }
      .code-right {
        float: right;
        width: 80px;
        height: 40px;
        border-radius: 20px;
        background: #262c3a;
        color: #fff;
        text-align: center;
        line-height: 40px;
        font-size: 18px;
      }
    }
  }
</style>

<style lang="scss" scoped>

  .login-container {
    position: relative;
    height: 100vh;
    min-height: 600px;
    width: 100%;
    overflow: hidden;
    background-image: -webkit-linear-gradient(-90deg, rgb(66, 84, 248) 0%, rgb(42, 130, 254) 100%);
    background-color: rgb(66, 84, 248);
    .login-bg {
      width: 100%;
      height: 100%;
      background: url("../../assets/img/login_bg.png") no-repeat center center / 1200px auto;
    }
    .login-content {
      border-radius: 20px;
      background-color: #ffffff;
      position: absolute;
      top: 50%;
      left: 50%;
      margin-top: -240px;
      margin-left: -390px;
      box-shadow: 0 0 40px 0 rgba(0, 28, 255, 0.5);
      width: 780px;
      height: 450px;
      overflow: hidden;
      .left {
        float: left;
        margin-top: 70px;
        width: 460px;
        height: 380px;
        overflow: hidden;
        background: url("../../assets/img/login_bg_content.png") no-repeat center center/70% auto;
      }
      .right {
        float: right;
        width: 260px;
        padding-right: 60px;
        padding-top: 10px;
        h1 {
          font-size: 36px;
          color: #fe9737;
        }
        h2 {
          white-space: nowrap;
          font-size: 22px;
        }
        .login-form {
          margin-top: 40px;
        }
      }
    }

  }
</style>
