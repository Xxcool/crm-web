// 新增菜单
import request from "../../../utils/request";

export default {
  updateStatus(data) {
    return request({
      url: "/api/supplier/office/address/update-status",
      method: "post",
      data
    })
  },
  list(data) {
    return request({
      url: "/api/supplier/office/address/list",
      method: "post",
      data
    })
  }
}
