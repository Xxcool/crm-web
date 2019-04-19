// 新增菜单
import request from "../../../utils/request";

export default {
  update(data) {
    return request({
      url: "/advertising/message/update",
      method: "post",
      data
    })
  },
  add(data){
    return request({
      url: "/advertising/message/add",
      method: "post",
      data
    })
  },
  del(id) {
    return request({
      url: "/advertising/message/del/" + id,
      method: "get",
    })
  },
  findById(id) {
    return request({
      url: "/advertising/message/find/" + id,
      method: "get"
    })
  },
  list(data) {
    return request({
      url: "/advertising/message/list",
      method: "post",
      data
    })
  },
  station() {
    return request({
      url: "/api/sys/station/selectAll",
      method: "get"
    })
  }
}
