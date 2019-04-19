/**
 * Created by lijinfeng on 2019/1/16.
 */
import Vue from 'vue'
// import store from "./store"

/**权限指令**/
Vue.directive('has', {
  bind: function() {
    // el.style.display = 'none'
  },
  inserted:function () {
    // el.parentNode.removeChild(el)
  }
});