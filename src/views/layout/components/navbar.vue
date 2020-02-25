<template>
  <div class="header-nav clear">
    <router-link :to="{path :'/'}" @click="$route.meta.title = 'test'" tag="div" class="logo">
      <img src="../../../assets/img/cas_logo.jpg"/>
    </router-link>
    <hamburger :toggle-click="toggleSideBar" :is-active="sidebar.opened" class="hamburger-container"/>
    <el-menu :default-active="activeNav" class="nav-menu" mode="horizontal" @select="handleSelect">
      <el-menu-item v-for="item in menu" :key="item.permission" :index="item.permission">{{item.name}}
      </el-menu-item>
    </el-menu>
    <div class="right clear">
      <el-dropdown class="notice-container">
        <div class="notice-wrapper">
          <i class="iconfont icon-tongzhi"></i>
        </div>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item>
            通知列表1
          </el-dropdown-item>
          <el-dropdown-item>
            通知列表2
          </el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
      <el-dropdown class="avatar-container">
        <div class="avatar-wrapper">
          <img src="https://img.zcool.cn/community/019a585645483e6ac7259e0fc672a7.jpg@1280w_1l_2o_100sh.jpg" class="user-avatar">
        </div>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item>
            <span>{{userInfo.name}}</span>
          </el-dropdown-item>
          <el-dropdown-item>
            <span @click="logout">登出</span>
          </el-dropdown-item>
          <el-dropdown-item>
            <router-link to="/user/changePassword" tag="span">修改密码</router-link>
          </el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </div>
</template>

<script>
  import {mapGetters} from "vuex"
  import hamburger from "../../../components/hamburger"

  export default {
    name: "navbar",
    components: {hamburger},
    computed: {
      ...mapGetters([
        "sidebar",
        "userInfo",
        "menu"
      ]),
    },
    watch: {
      $route(to) {
        this.activeNav = to.matched.length > 1 && to.matched[1].meta && to.matched[1].meta.nav ? to.matched[1].meta.nav : this.activeNav
        this.handleSelect(this.activeNav)
      }
    },
    data() {
      return {
        activeNav: this.$route.matched.length > 1 && this.$route.matched[1].meta && this.$route.matched[1].meta.nav ? this.$route.matched[1].meta.nav : this.$store.getters.activeNav
      }
    },
    mounted() {
      this.handleSelect(this.activeNav)
    },
    methods: {
      handleSelect(index) {
        this.$store.dispatch("set_activeNav", index)
      },
      toggleSideBar() {
        this.$store.dispatch("toggleSideBar")
      },
      logout() {
        this.$store.dispatch("logOut")
      }
    }
  }
</script>

<style lang="scss" scoped>
  .header-nav {
    .logo {
      float: left;
      width: 200px;
      height: 50px;
      font-size: 40px;
      font-weight: bold;
      text-align: center;
      line-height: 50px;
      color: #409EFF;
      cursor: pointer;
      img{
        display: block;
        width: 160px;
        margin-left: 20px;
        margin-top: 10px;
      }
    }
    .hamburger-container {
      float: left;
    }
    .nav-menu {
      float: left;
    }
    .right {
      float: right;
      .notice-container {
        float: left;
        height: 30px;
        margin: 10px;
        line-height: 30px;
        cursor: pointer;
        .notice-wrapper{
          width: 30px;
          text-align: center;
          font-size: 20px;
        }
      }
      .avatar-container {
        float: left;
        height: 30px;
        margin: 10px;
        cursor: pointer;
        .avatar-wrapper {
          height: 30px;
          .user-avatar {
            width: 30px;
            height: 30px;
            border-radius: 50%;
          }
        }
      }
    }
  }
</style>