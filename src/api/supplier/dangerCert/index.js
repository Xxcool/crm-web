// 新增菜单
import request from "../../../utils/request";

export default {
  update(params) {
    return request({
      url: "/api/supplier/danger-cert/update-audit-status",
      type:"form",
      method: "post",
      params
    })
  },
  updateStatusNote(params) {
    return request({
      url: "/api/supplier/danger-cert/update-status-note",
      type:"form",
      method: "post",
      params
    })
  },
  list(data) {
    return request({
      url: "/api/supplier/danger-cert/list",
      method: "post",
      data
    })
  },
  get(id) {
    return request({
      url: "/api/supplier/danger-cert/get/" + id,
    })
  }
}
