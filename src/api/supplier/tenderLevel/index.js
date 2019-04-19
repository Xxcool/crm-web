// 新增菜单
import request from "../../../utils/request";

export default {
  save(data) {
    return request({
      url: "/api/supplier/tender/level/add",
      method: "post",
      data
    })
  },
  list(data) {
    return request({
      url: "/api/supplier/tender/level/select-by-supplier-id/"+data,
      method: "post"
    })
  },
  del(id) {
    return request({
      url: "/api/supplier/tender/level/delete/" + id
    })
  },
}
