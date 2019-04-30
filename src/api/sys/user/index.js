// 新增菜单
import request from "../../../utils/request";

export default {
  add(data) {
    return request({
      url: "/api/user/create",
      method: "post",
      data
    })
  },
  save(data) {
    return request({
      url: data.id ? "/api/user/update" : "/api/user/create",
      method: "post",
      data
    })
  },
  del(id) {
    return request({
      url: "/api/user/delete/" + id,
      method: "get"
    })
  },
  list(data) {
    return request({
      url: "/api/user/find-page",
      method: "post",
      data
    })
  },
  selectAll(){
    return request({
      url:'/api/user/select-all',
      method:"post"
    })
  },
  changePassword(data) {
    return request({
      url: "/api/user/change-password",
      method: "post",
      data
    })
  },
  userDetail(id) {
    return request({
      url: "/api/user/detail/" + id,
      method: "get"
    })
  }
}
