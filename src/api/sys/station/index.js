// 配送区 API
import request from "../../../utils/request";

export default {
  findById(id) {
    return request({
      url: "/api/basic/station/" + id,
      method: "get",
    })
  },
  save(data) {
    return request({
      url: data.id ? "/sys/basic/update" : "/sys/basic/add",
      method: "post",
      data: data
    })
  },
  list(data) {
    return request({
      url: "/api/basic/station/list",
      method: "post",
      data: data
    })
  },
  del(id) {
    return request({
      url: "/api/basic/station/del/" + id,
      method: "get",
    })
  },
  allList(query) {
    return request({
      url: `/api/basic/station/allList?name=${query}`,
      method: "post",
    })
  }

}
