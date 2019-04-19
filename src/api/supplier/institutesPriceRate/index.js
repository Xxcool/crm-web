// 新增菜单
import request from "../../../utils/request";

export default {
  update(params) {
    return request({
      url: "/api/supplier/price-rate/update",
      type:"form",
      method: "post",
      params
    })
  },
  list(data) {
    return request({
      url: "/api/supplier/price-rate/list",
      method: "post",
      data
    })
  }
}
