// 新增菜单
import request from "../../../utils/request";

export default {
  update(data) {
    return request({
      url: "/advertising/adPositionChannel/update",
      method: "post",
      data
    })
  },
  add(data){
    return request({
      url: "/advertising/adPositionChannel/add",
      method: "post",
      data
    })
  },
  del(id) {
    return request({
      url: "/advertising/adPositionChannel/del/" + id
    })
  },
  findById(id) {
    return request({
      url: "/advertising/adPositionChannel/find/" + id,
      method: "get"
    })
  },
  list(data){
    return request({
      url: "/advertising/adPositionChannel/list",
      method: "post",
      data
    })
  }
}