import request from "../../../utils/request";

export default {
  list(data) {
    return request({
      url: "/api/supplier/engineer-category/list",
      method: "post",
      data
    })
  },
  del(data) {
    return request({
      url: "/api/supplier/engineer-category/del/" + data,
      method: "get"
    })
  },
  keyValueList() {
    return request({
      url: "/api/supplier/engineer-category/key-value-list",
      method: "get"
    })
  },
  get(data) {
    return request({
      url: "/api/supplier/engineer-category/get/" + data,
      method: "get"
    })
  },
  add(data) {
    return request({
      url: "/api/supplier/engineer-category/add/",
      method: "post",
      data
    })
  },
  update(data) {
    return request({
      url: "/api/supplier/engineer-category/update/",
      method: "post",
      data
    })
  }
}
