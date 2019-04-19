/**
 * Created by lijinfeng on 2019/1/17.
 */
import layout from "../../views/layout/index.vue"


export default {
  path: "",
  component: layout,
  redirect: "dashboard",
  children: [
    {
      path: "dashboard",
      name: "dashboard",
      component: () => import("../../views/dashboard/index.vue"),
      meta: {noKeep: true, title: "工作台"}
    }
  ]
}
