<template>
  <div class="main-wrapper">
    <transition v-if="$route.params.noKeep" name="fade-transform" mode="out-in">
      <router-view :key="key"/>
    </transition>
    <transition v-if="!$route.params.noKeep" name="fade-transform" mode="out-in">
      <keep-alive :include="cachedViews">
        <router-view :key="key"/>
      </keep-alive>
    </transition>
  </div>
</template>

<script>
  export default {
    name: "view-main",
    computed: {
      cachedViews() {
        return this.$store.getters.cachedViews
      },
      key() {
        return this.$route.fullPath
      }
    }
  }
</script>

<style lang="scss" scoped>
  .main-wrapper {
    padding: 10px;
  }
</style>
