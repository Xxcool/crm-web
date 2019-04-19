<template>
  <el-menu :default-active="activeIndex" class="sidebar-nav" router background-color="#545c64" text-color="#fff"
           active-text-color="#409EFF" :collapse="isCollapse">
    <div v-for="m in menu" :key="m.permission" v-show="m.permission === activeNav">
      <el-submenu v-for="item in m.children" :key="item.path" :index="item.path">
        <template slot="title">
          <i class="el-icon-location"></i>
          <span slot="title">{{item.name}}</span>
        </template>
        <el-menu-item v-for="i in item.children" :key="i.path" :index="i.path">{{i.name}}</el-menu-item>
      </el-submenu>
    </div>
  </el-menu>
</template>

<script>
  export default {
    name: "sidebar",
    computed: {
      isCollapse() {
        return !this.$store.getters.sidebar.opened
      },
      menu() {
        return this.$store.getters.menu
      },
      activeNav() {
        return this.$store.getters.activeNav
      }
    },
    watch: {
      $route(to) {
        this.activeIndex = to.fullPath
      },
      activeNav() {
        this.activeIndex = this.$route.fullPath
      }
    },
    data() {
      return {
        activeIndex: this.$route.fullPath,
      }
    }
  }
</script>
