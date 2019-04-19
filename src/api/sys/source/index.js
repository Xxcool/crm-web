// 新增菜单
import request from "../../../utils/request";

export default {
  add(data) {
    return request({
      url: "/api/sys/sources/add",
      method: "post",
      data
    })
  },
  save(data) {
    return request({
      url: data.id ? "/sys/sources/update" : "/sys/sources/add",
      method: "post",
      data
    })
  },
  update(data) {
    return request({
      url: "/api/sys/sources/update",
      method: "post",
      data
    })
  },
  del(id) {
    return request({
      url: "/api/sys/sources/del/" + id
    })
  },
  findById(id) {
    return request({
      url: "/api/sys/sources/" + id
    })
  },
  list(data) {
    return request({
      url: "/api/sys/sources/list",
      method: "post",
      data
    })
  }
}
