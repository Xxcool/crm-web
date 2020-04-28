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
    {
      path: "changePassword",
      name: "changePassword",
      component: () => import("../../views/sys/user/changePassword.vue"),
      meta: {title: "修改密码", nav: "sys"}
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
      path: "list/:tagType",
      name: "tag_list",
      tagType:0,
      component: () => import("../../views/sys/tag/list.vue"),
      meta: {title: "开发进度", nav: "sys"}
    },
    {
      path: "business/list/:tagType",
      name: "tag_business_list",
      tagType:1,
      component: () => import("../../views/sys/tag/list.vue"),
      meta: {title: "业务范围", nav: "sys"}
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

const institutes={
  path:"/institutes",
  component:layout,
  children:[
    {
      path:"list",
      name:"institutes_list",
      component:() => import("../../views/sys/institutes/list.vue"),
      meta:{title:"院所客户",nav:"sys"}
    },
    {
      path:"detail",
      name:"institutes_detail",
      component:() => import("../../views/sys/institutes/detail.vue"),
      meta:{title:"客户跟踪",nav:"sys"}
    },
    {
      path:"log",
      name:"institutes_log",
      component:() => import("../../views/sys/institutes/log.vue"),
      meta:{title:"客户跟踪日志",nav:"sys"}
    }

  ]
}

const supplier={
  path:"/supplier",
  component:layout,
  children:[
    {
      path:"list",
      name:"supplier_list",
      component:() => import("../../views/sys/supplier/list.vue"),
      meta:{title:"商家客户",nav:"sys"}
    },
    {
      path:"detail",
      name:"supplier_detail",
      component:() => import("../../views/sys/supplier/detail.vue"),
      meta:{title:"商家跟踪",nav:"sys"}
    },
    {
      path:"log",
      name:"supplier_log",
      component:() => import("../../views/sys/supplier/log.vue"),
      meta:{title:"商家跟踪日志",nav:"sys"}
    }

  ]
}

export default [
  menu, role, user,org,tag,job,institutes,supplier
]
