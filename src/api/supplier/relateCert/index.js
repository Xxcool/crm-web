// 新增菜单
import request from "../../../utils/request";

export default {
  update(data) {
    return request({
      url: "/api/supplier/relate/cert/update",
      type: "form",
      method: "post",
      data
    })

  }
  , batchInsert(data) {
    return request({
      url: "/api/supplier/relate/cert/batch-insert",
      method: "post",
      data
    })

  },
  findById(id) {
    return request({
      url: "/api/supplier/relate/cert/" + id
    })
  },
  list(data) {
    return request({
      url: "/api/supplier/relate/cert/list",
      method: "post",
      data
    })
  }
}
