import upload from "./upload.vue"

// 导出组件
export default {
  install: function (Vue) {
    Vue.component('upload', upload)
  }
}