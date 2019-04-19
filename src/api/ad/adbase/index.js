// 新增菜单
import request from "../../../utils/request";

export default {
  update(data) {
    return request({
      url: "/advertising/ad/update",
      method: "post",
      data
    })
  },
  add(data){
    return request({
      url: "/advertising/ad/add",
      method: "post",
      data
    })
  },
  del(id) {
    return request({
      url: "/advertising/ad/del/" + id,
      method: "get",
    })
  },
  findById(id) {
    return request({
      url: "/advertising/ad/find/" + id,
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
      url: "/advertising/ad/list",
      method: "post",
      data
    })
  },
  channel(){
    return request({
      url: "/advertising/adPositionChannel/getAdPositionChannels",
      method: "get"
    })
  },
  position(id){
    return request({
      url: "/advertising/adPosition/getPositionByChannel/" + id,
      method: "get"
    })
  },
  station(){
    return request({
      url: "/advertising/station/getStations",
      method: "get"
    })
  },

}
