// 新增菜单
import request from "../../../utils/request";

export default {
  update(data) {
    return request({
      url: "/api/supplier/offline-institutes/update",
      method: "post",
      data
    })
  },
  list(data) {
    return request({
      url: "/api/supplier/offline-institutes/list",
      method: "post",
      data
    })
  }
}
