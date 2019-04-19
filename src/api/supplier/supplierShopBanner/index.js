// 新增菜单
import request from "../../../utils/request";

export default {
  add(data) {
    return request({
      url: data.id ? "/api/supplier/shop/banner/update":"/api/supplier/shop/banner/save",
      method: "post",
      data
    })
  },
  findById(id) {
    return request({
      url: "/api/supplier/shop/banner/selectById/" + id
    })
  },
  delete(id) {
    return request({
      url: "/api/supplier/shop/banner/del/" + id
    })
  },
  list(data) {
    return request({
      url: "/api/supplier/shop/banner/list",
      method: "post",
      data
    })
  }
}
