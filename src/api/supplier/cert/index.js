// 新增菜单
import request from "../../../utils/request";

export default {
  add(data) {
    return request({
      url: "/api/supplier/cert/add",
      method: "post",
      data
    })
  },
  save(data) {
    return request({
      url: data.id ? "/supplier/cert/update" : "/supplier/cert/add",
      method: "post",
      data
    })
  },
  update(data) {
    return request({
      url: "/api/supplier/cert/update",
      method: "post",
      data
    })
  },
  del(id) {
    return request({
      url: "/api/supplier/cert/del/" + id
    })
  },
  findById(id) {
    return request({
      url: "/api/supplier/cert/" + id
    })
  },
  list(data) {
    return request({
      url: "/api/supplier/cert/list",
      method: "post",
      data
    })
  }
}
