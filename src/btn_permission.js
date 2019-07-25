/**
 * Created by lijinfeng on 2019/1/16.
 */
import Vue from 'vue'
 import store from "./store"

/**权限指令**/
Vue.directive('has', {
  inserted: function (el, binding, vnode) {
    let permissions = [...store.getters.permissions]
    if('admin' !== store.getters.userInfo.name && permissions.indexOf(binding.value) === -1){
      el.parentNode.removeChild(el);
    }
  }
});