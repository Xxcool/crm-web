import Vue from "vue"
import Vuex from "vuex"
import getters from "./getters"
import app from "./modules/app"
import tagsBar from "./modules/tagsBar"

Vue.use(Vuex)

export default new Vuex.Store({
  modules:{
    app,
    tagsBar
  },
  getters
})
