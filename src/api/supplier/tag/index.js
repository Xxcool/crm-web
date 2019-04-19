// 新增菜单
import request from "../../../utils/request";

export default {
  add(data) {
    return request({
      url: "/api/supplier/tag/add",
      method: "post",
      data
    })
  },
  save(data) {
    return request({
      url: data.id ? "/supplier/tag/update" : "/supplier/tag/add",
      method: "post",
      data
    })
  },
  update(data) {
    return request({
      url: "/api/supplier/tag/update",
      method: "post",
      data
    })
  },
  del(id) {
    return request({
      url: "/api/supplier/tag/logic-del/" + id
    })
  },
  findById(id) {
    return request({
      url: "/api/supplier/tag/" + id
    })
  },
  list(data) {
    return request({
      url: "/api/supplier/tag/list",
      method: "post",
      data
    })
  }
}
