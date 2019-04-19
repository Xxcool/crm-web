/**
 * Created by lijinfeng on 2019/1/26.
 */
import request from "../../../utils/request";

export default {
  // 新增菜单
  add(data) {
    return request({
      url: "/api/sys/menu/add",
      method: "post",
      data
    })
  },
  // 删除菜单
  delete(id){
    return request({
      url: "/api/sys/menu/del/" + id,
      method: "get"
    })
  },
  // 更新菜单
  update(data) {
    return request({
      url: "/api/sys/menu/update",
      method: "post",
      data
    })
  },
  // 更新菜单
  list(){
    return request({
      url: "/api/sys/menu/list",
      method: "post",
      data:{}
    })
  }
}
