// 新增菜单
import request from "../../../utils/request";

export default {
  list(data) {
    return request({
      url: "/api/supplier/shop/list",
      method: "post",
      data
    })
  },
  updateById(data) {
    return request({
      url: "/api/supplier/shop/update",
      method: 'post',
      data
    })
  },
  updateByType(data) {
    return request({
      url: "/api/supplier/shop/updateType",
      method: 'post',
      data
    })
  },
  findById(id){
    return request({
      url: "/api/supplier/shop/"+id,
      method: 'get'
    })
  }

}
