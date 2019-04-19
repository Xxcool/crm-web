// 新增菜单
import request from "../../../utils/request";

export default {
  updateStatus(data) {
    return request({
      url: "/api/supplier/shop/apply/update-status",
      method: "post",
      data
    })

  },
  findById(id) {
    return request({
      url: "/api/supplier/shop/apply/" + id
    })
  },
  list(data) {
    return request({
      url: "/api/supplier/shop/apply/list",
      method: "post",
      data
    })
  }
}
