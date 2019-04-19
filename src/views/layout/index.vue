<template>
  <div class="layout" :class="sidebar?'show-side':'hide-side'">
    <header class="header">
      <navbar/>
    </header>
    <aside class="sidebar">
      <sidebar/>
    </aside>
    <section class="view-main">
      <tagbar/>
      <!--<breadcrumb/>-->
      <viewmain/>
    </section>
  </div>
</template>

<script>

  // import breadcrumb from "./components/breadcrumb"
  import viewmain from "./components/viewmain"
  import navbar from "./components/navbar"
  import sidebar from "./components/sidebar"
  import tagbar from "./components/tagbar"

  export default {
    name: "layout",
    components: {/*breadcrumb,*/ viewmain, navbar, sidebar, tagbar},
    computed: {
      sidebar() {
        return this.$store.getters.sidebar.opened
      }
    }
  }
</script>

<style lang="scss" scoped>
  .layout {
    min-width: 880px;
    .header {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      z-index: 1999;
      background: #ffffff;
      min-width: 880px;
    }
    .sidebar {
      position: fixed;
      top: 50px;
      left: 0;
      z-index: 10;
      height: calc(100% - 50px);
      background-color: #545c64;
      overflow-x: hidden;
      overflow-y: auto;
      transition: width .3s ease-in-out;
    }
    .view-main {
      position: relative;
      padding-top: 50px;
      height: calc(100vh - 50px);
      transition: margin-left .3s ease-in-out;
    }
    &.show-side {
      .sidebar {
        width: 200px;
      }
      .view-main {
        margin-left: 200px;
      }
    }
    &.hide-side {
      .sidebar {
        width: 64px;
      }
      .view-main {
        margin-left: 64px;
      }
    }
  }
</style>