/**
 * Created by lijinfeng on 2019/1/16.
 */
import api_app from "./../../api/app"
import {cookie_getToken, cookie_removeToken} from "../../utils/auth"
import Cookies from "js-cookie"

const app = {
  state: {
    userInfo: {name: ""},
    sidebar: {
      opened: Cookies.get("sidebarStatus") ? !!+Cookies.get("sidebarStatus") : true,
      menu: []
    },
    activeNav: "",
    purview: ["/login", "/dashboard", "/orders/list"],
    menu: []
  },
  mutations: {
    SET_USERINFO: (state, userInfo) => {
      state.userInfo = userInfo
    },
    TOGGLE_SIDEBAR: state => {
      state.sidebar.opened = !state.sidebar.opened
      if (state.sidebar.opened) {
        Cookies.set("sidebarStatus", 1)
      } else {
        Cookies.set("sidebarStatus", 0)
      }
    },
    SET_MENU: (state, menu) => {
      state.menu = menu
    },
    SET_ACTIVENAV: (state, activeNav) => {
      state.activeNav = activeNav
    },
    SET_PERMISSIONS: (state, permissions) => {
      state.permissions = permissions
    }
  },
  actions: {
    authLogin({dispatch}, userInfo) {
      return new Promise((resolve, reject) => {
        api_app.login(userInfo).then(() => {
          dispatch("set_userInfo")
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    },
    set_userInfo({dispatch, commit}) {
      return new Promise((resolve, reject) => {
        if (cookie_getToken()) {
          api_app.userInfo().then(response => {
            commit("SET_USERINFO", response.data)
            dispatch("get_menu").then(() => {
              resolve()
            })
          }).catch(error => {
            reject(error)
          })
        } else {
          reject()
        }
      })
    },
    get_menu({commit}) {
      function compare(property) {
        return function (a, b) {
          let s = 0
          for (let item of property) {
            if (a[item] - b[item] !== 0) {
              s = a[item] - b[item]
              break
            }
          }
          return s;
        }
      }

      function arrSort(arr, child) {
        if (arr.length > 0) {
          arr.sort(compare(["order", "id"]))
          for (let i in arr) {
            if (arr[i][child] && arr[i][child].length > 0) {
              arrSort(arr[i][child], child)
            }
          }
        }
        return arr
      }

      return new Promise((resolve, reject) => {
        api_app.menu().then(response => {
          let menu = arrSort(response.data.menuTrees, "children")
          commit("SET_MENU", menu)
          debugger
          commit("SET_PERMISSIONS", response.data.permissions)
          if (menu.length > 0) {
            commit("SET_ACTIVENAV", menu[0].permission)
          }
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    },
    set_activeNav({commit}, activeNav) {
      commit("SET_ACTIVENAV", activeNav)
    },
    logOut() {
      return new Promise((resolve) => {
        cookie_removeToken()
        window.location.href = "/"
        resolve()
      })
    },
    toggleSideBar({commit}) {
      commit("TOGGLE_SIDEBAR")
    }
  }
}

export default app
