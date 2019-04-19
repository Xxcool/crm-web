// 新增菜单
import request from "../../../utils/request";

export default {
  list(data) {
    return request({
      url: "/api/supplier/shop/css/list",
      method: "post",
      data
    })
  },
  del(id) {
    return request({
      url: "/api/supplier/shop/css/logic-del/" + id
    })
  },
  add(data) {
    return request({
      url: data.id ? "/api/supplier/shop/css/update" : "/api/supplier/shop/css/add",
      method: "post",
      data
    })
  },
  update(data) {
    return request({
      url: "/api/supplier/shop/css/update",
      method: "post",
      data
    })
  },
  view(id) {
    return request({
      url: "/api/supplier/shop/css/" + id
    })
  }
}

