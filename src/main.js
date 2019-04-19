import Vue from "vue"

import "normalize.css/normalize.css"
import "./assets/style/index.scss"
import elementUI from "element-ui"
import pagination from "./components/pagination"
import upload from "./components/upload"
import "element-ui/lib/theme-chalk/index.css"

import App from "./App.vue"
import router from "./router/index"
import store from "./store/index"
import "./permission"
import "./btn_permission"
import editor from './components/editor'

import moment from 'moment'

import "moment/locale/zh-cn"

Vue.filter('formatDate', function (value, rule) {
  return moment(value).format(rule);
})

Vue.use(elementUI, {
  size: "mini"
})
Vue.use(editor)
Vue.use(pagination)
Vue.use(upload)

Vue.config.productionTip = false
Vue.config.devtools = true

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app")
