<template>
  <el-breadcrumb class="breadcrumb">
    <transition-group name="breadcrumb">
      <el-breadcrumb-item v-for="(item,index) in levelList" :key="item.path">
        <span v-if="item.redirect==='noredirect'||index===levelList.length-1" class="no-redirect">{{item.meta.title}}</span>
        <a v-else @click.prevent="handleLink(item)">{{item.meta.title}}</a>
      </el-breadcrumb-item>
    </transition-group>
  </el-breadcrumb>
</template>

<script>
  import pathToRegexp from "path-to-regexp"

  export default {
    name: "breadcrumb",
    data() {
      return {
        levelList: null
      }
    },
    watch: {
      $route() {
        this.getBreadcrumb()
      }
    },
    created() {
      this.getBreadcrumb()
    },
    methods: {
      getBreadcrumb() {
        let matched = this.$route.matched.filter(item => item.name)
        this.levelList = matched.filter(item => item.meta && item.meta.title !== false)
      },
      pathCompile(path) {
        const {params} = this.$route
        let toPath = pathToRegexp.compile(path)
        return toPath(params)
      },
      handleLink(item) {
        const {redirect, path} = item
        if (redirect) {
          this.$router.push(redirect)
          return
        }
        this.$router.push(this.pathCompile(path))
      }
    }
  }
</script>

<style lang="scss" scoped>
  .breadcrumb{
    margin: 10px 10px 0 10px;
  }
</style>
