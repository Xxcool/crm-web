import Vue from "vue"
import Router from "vue-router"

import layout from "../views/layout/index.vue"

import app from "./modules/app"
import sys from "./modules/sys"

Vue.use(Router)

/**
 * meta.noKeep：true 不缓存
 * meta.title："" tagbar 显示的标题
 * name 有值则会在tabbar上显示
 * meta.nav navtab 的 permission
 */

const routerMap = [
  app,
  ...sys,
  {
    path: "redirect",
    component: layout,
    children: [
      {
        path: "/redirect/:path*",
        name: "redirect",
        component: () => import("./../views/redirect")
      }
    ]
  },
  {
    path: "/login",
    component: () => import("./../views/login"),
  },
  {
    path: "/404",
    component: () => import("./../views/error/404"),
  },
  {
    path: "/401",
    component: () => import("./../views/error/401"),
  },
  {path: "*", redirect: "/404"}
]

export default new Router({
  mode:'history',
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      return {x: 0, y: 0}
    }
  },
  routes: routerMap
})