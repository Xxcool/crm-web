// 新增菜单
import request from "../../../utils/request";

export default {
  findById(id) {
    return request({
      url: "/api/supplier/shop/article/view/" + id
    })
  },
  delete(id) {
    return request({
      url: "/api/supplier/shop/article/delete/" + id,
      method:"post"
    })
  },
  list(data) {
    return request({
      url: "/api/supplier/shop/article/list",
      method: "post",
      data
    })
  },
  approval(data){
    return request({
      url: "/api/supplier/shop/article/approval" ,
      method: "post",
      data
    })
  }
}
