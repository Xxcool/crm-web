// 新增菜单
import request from "../../../utils/request";

export default {
  findById(id) {
    return request({
      url: "/api/supplier/shop/pages/view/" + id
    })
  },
  delete(id) {
    return request({
      url: "/api/supplier/shop/pages/delete/" + id,
      method:"post"
    })
  },
  list(data) {
    return request({
      url: "/api/supplier/shop/pages/list",
      method: "post",
      data
    })
  },
  approval(data){
    return request({
      url: "/api/supplier/shop/pages/approval" ,
      method: "post",
      data
    })
  }
}
