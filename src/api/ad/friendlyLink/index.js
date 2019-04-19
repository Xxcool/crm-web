// 新增菜单
import request from "../../../utils/request";

export default {
  update(data) {
    return request({
      url: "/advertising/friendlyLink/update",
      method: "post",
      data
    })
  },
  add(data){
    return request({
      url: "/advertising/friendlyLink/add",
      method: "post",
      data
    })
  },
  del(id) {
    return request({
      url: "/advertising/friendlyLink/del/" + id,
      method: "get",
    })
  },
  findById(id) {
    return request({
      url: "/advertising/friendlyLink/find/" + id,
      method: "get"
    })
  },
  // list() {
  //   return request({
  //     url: "/advertising/ad/getAll",
  //     method: "get"
  //   })
  // },
  list(data) {
    return request({
      url: "/advertising/friendlyLink/list",
      method: "post",
      data
    })
  },
  station(){
    return request({
      url: "/advertising/station/getStations",
      method: "get"
    })
  },

}
