// 配送区 API
import request from "../../../utils/request";

export default {
  findById(id) {
    return request({
      url: "/api/sys/station/" + id,
      method: "get",
    })
  },
  save(data) {
    return request({
      url: data.id ? "/sys/station/update" : "/sys/station/add",
      method: "post",
      data: data
    })
  },
  list(data) {
    return request({
      url: "/api/sys/station/list",
      method: "post",
      data: data
    })
  },
  del(id) {
    return request({
      url: "/api/sys/station/del/" + id,
      method: "get",
    })
  },
  allList() {
    return request({
      url: "/api/sys/station/selectAll",
      method: "get",
    })
  }

}
