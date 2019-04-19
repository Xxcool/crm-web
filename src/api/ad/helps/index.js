// 新增菜单
import request from "../../../utils/request";

export default {
  updateCate(data) {
    return request({
      url: "/advertising/helpCate/update",
      method: "post",
      data
    })
  },
  updateHelp(data) {
    return request({
      url: "/advertising/help/update",
      method: "post",
      data
    })
  },
  addCate(data){
    return request({
      url: "/advertising/helpCate/add",
      method: "post",
      data
    })
  },
  addHelp(data){
    return request({
      url: "/advertising/help/add",
      method: "post",
      data
    })
  },
  delCate(id) {
    return request({
      url: "/advertising/helpCate/del/" + id,
      method: "get",
    })
  },
  delHelp(id) {
    return request({
      url: "/advertising/help/del/" + id,
      method: "get",
    })
  },
  findByIdCate(id) {
    return request({
      url: "/advertising/helpCate/find/" + id,
      method: "get"
    })
  },
  findByIdHelp(id) {
    return request({
      url: "/advertising/help/find/" + id,
      method: "get"
    })
  },
  listCate(data) {
    return request({
      url: "/advertising/helpCate/list",
      method: "post",
      data
    })
  },
  listCateTable() {
    return request({
      url: "/advertising/helpCate/listTable",
      method: "get"
    })
  },
  listHelp(data) {
    return request({
      url: "/advertising/help/list",
      method: "post",
      data
    })
  },
}
