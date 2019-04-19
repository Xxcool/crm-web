// 新增菜单
import request from "../../../utils/request";

export default {
  update(data) {
    return request({
      url: "/advertising/adPosition/update",
      method: "post",
      data
    })
  },
  add(data){
    return request({
      url: "/advertising/adPosition/add",
      method: "post",
      data
    })
  },
  del(id) {
    return request({
      url: "/advertising/adPosition/del/" + id,
      method: "post"
    })
  },
  findById(id) {
    return request({
      url: "/advertising/adPosition/find/" + id,
      method: "get"
    })
  },
  list(data){
    return request({
      url: "/advertising/adPosition/list",
      method: "post",
      data
    })
  },
  // list(){
  //   return request({
  //     url: "/advertising/adPosition/getAdPositions",
  //     method: "get"
  //   })
  // },
  channel(){
    return request({
      url: "/advertising/adPositionChannel/getAdPositionChannels",
      method: "get"
    })
  }
}