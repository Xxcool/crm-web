// 新增菜单
import request from "../../../utils/request";

export default {
  update(data) {
    return request({
      url: "/advertising/adVisitDetail/update",
      method: "post",
      data
    })
  },
  add(data){
    return request({
      url: "/advertising/adVisitDetail/add",
      method: "post",
      data
    })
  },
  del(id) {
    return request({
      url: "/advertising/adVisitDetail/del/" + id,
      method: "get",
    })
  },
  findById(id) {
    return request({
      url: "/advertising/adVisitDetail/find/" + id,
      method: "get"
    })
  },
  list(data) {
    return request({
      url: "/advertising/adVisitDetail/list",
      method: "post",
      data
    })
  },
  listDetail(data) {
    return request({
      url: "/advertising/adVisitDetail/listDetail",
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
