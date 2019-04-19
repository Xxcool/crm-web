// 新增菜单
import request from "../../../utils/request";

export default {
  add(data) {
    return request({
      url: "/api/user-group/create",
      method: "post",
      data
    })
  },
  update(data) {
    return request({
      url: "/api/user-group/update",
      method: "post",
      data
    })
  },
  del(id) {
    return request({
      url: "/api/user-group/delete/" + id,
      method: "get"
    })
  },
  findById(id) {
    return request({
      url: "/api/user-group/find-by-id/" + id
    })
  },
  list(data) {
    return request({
      url: "/api/user-group/find-page",
      method: "post",
      data
    })
  },
  allList() {
    return request({
      url: "/api/user-group/find-all",
      method: "get"
    })
  }
}
