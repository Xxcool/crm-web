<template>
  <div class="hamburger">
    <div class="hamburger-icon" :class="{'is-active':!isActive}" @click="toggleClick"><i class="iconfont icon-caidan"></i></div>
  </div>
</template>

<script>
  export default {
    name: "hamburger",
    props: {
      isActive: {
        type: Boolean,
        default: false
      },
      toggleClick: {
        type: Function,
        default: null
      }
    }
  }
</script>

<style lang="scss" scoped>
  .hamburger {
    padding: 15px 10px;
    width: 20px;
    .hamburger-icon {
      display: block;
      cursor: pointer;
      width: 20px;
      height: 20px;
      transition: .3s;
      transform-origin: 50% 50%;
      color: #409EFF;
      &.is-active {
        transform: rotate(-90deg);
      }
    }
  }
</style>
