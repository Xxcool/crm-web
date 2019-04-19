/**
 * Created by lijinfeng on 2019/1/16.
 */

import router from "./router"
import store from "./store"
import NProgress from "nprogress"
import "nprogress/nprogress.css"
import {cookie_getToken} from "./utils/auth"

NProgress.configure({showSpinner: false})

// 登录注册
const whiteList = ["/login", "/404", "/401","/redirect"]

function hasPermission(to) {
  const path = to.path
  return new Promise((resolve, reject) => {
    if (store.getters.purview.some(role => path === role) || whiteList.some(role => path === role) || to.name === "redirect"||1===1) {
      resolve()
    } else {
      reject()
    }
  })
}

router.beforeEach((to, from, next) => {
  NProgress.start()
  if (cookie_getToken()) {
    if (to.path === "/login") {
      next({path: "/"})
      NProgress.done()
    } else {
      if (store.getters.userInfo.name) {
        hasPermission(to).then(() => {
          next()
        }).catch(() => {
          next({path: "/401"})
        })
      } else {
        store.dispatch("set_userInfo").then(() => {
          hasPermission(to).then(() => {
            next()
          }).catch(() => {
            next({path: "/401"})
          })
        }).catch(() => {
          store.dispatch("logOut")
          next({path: "/"})
        })
      }
    }
  } else {
    // 如果有token
    if (whiteList.indexOf(to.path) !== -1) { // 在免登录白名单，直接进入
      next()
    } else {
      next(`/login?redirect=${to.path}`)
      NProgress.done()
    }
  }
})

router.afterEach(() => {
  NProgress.done()
})
