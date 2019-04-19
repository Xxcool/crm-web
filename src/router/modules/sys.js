/**
 * Created by lijinfeng on 2019/1/17.
 */
import layout from "../../views/layout/index.vue"

export const menu = {
  path: "/menu",
  component: layout,
  children: [
    {
      path: "list",
      name: "menu_list",
      component: () => import("../../views/sys/menu/list.vue"),
      meta: {title: "权限管理", nav: "sys"}
    }
  ]
}

const role = {
  path: "/role",
  component: layout,
  children: [
    {
      path: "list",
      name: "role_list",
      component: () => import("../../views/sys/role/list.vue"),
      meta: {title: "角色管理", nav: "sys"}
    }
  ]
}

const user = {
  path: "/user",
  component: layout,
  children: [
    {
      path: "list",
      name: "user_list",
      component: () => import("../../views/sys/user/list.vue"),
      meta: {title: "管理用户", nav: "sys"}
    },
    {
      path: "add",
      name: "user_add",
      component: () => import("../../views/sys/user/add.vue"),
      meta: {title: "添加用户", nav: "sys"}
    },
    {
      path: "edit",
      name: "user_edit",
      component: () => import("../../views/sys/user/add.vue"),
      meta: {title: "修改用户", nav: "sys"}
    },
  ]
}

const org={
  path:"/org",
  component: layout,
  children: [
    {
      path: "list",
      name: "org_list",
      component: () => import("../../views/sys/org/list.vue"),
      meta: {title: "组织机构列表", nav: "sys"}
    }
  ]

}

const tag={
  path:"/tag",
  component: layout,
  children: [
    {
      path: "list",
      name: "tag_list",
      component: () => import("../../views/sys/tag/list.vue"),
      meta: {title: "客户标签列表", nav: "sys"}
    }
  ]

}

const job={
  path:"/job",
  component:layout,
  children: [
    {
      path:"list",
      name:"job_list",
      component:() => import("../../views/sys/job/list.vue"),
      meta:{title:"职务管理",nav:"sys"}
    }
  ]
}

export default [
  menu, role, user,org,tag,job
]