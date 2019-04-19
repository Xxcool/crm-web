// 新增菜单
import request from "../../../utils/request";

export default {
  update(data) {
    return request({
      url: "/advertising/notice/update",
      method: "post",
      data
    })
  },
  add(data){
    return request({
      url: "/advertising/notice/add",
      method: "post",
      data
    })
  },
  del(id) {
    return request({
      url: "/advertising/notice/del/" + id,
      method: "post",
    })
  },
  findById(id) {
    return request({
      url: "/advertising/notice/find/" + id,
      method: "get"
    })
  },
  list(data) {
    return request({
      url: "/advertising/notice/list",
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
  stationB() {
    return request({
      url: "/api/sys/station/selectAll",
      method: "get",
    })
  }

}
