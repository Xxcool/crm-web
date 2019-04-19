import request from "../../../utils/request";

export default {
  update(data) {
    return request({
      url: "/api/sys/config/update",
      method: "post",
      data
    })
  },
  findById(id) {
    return request({
      url: "/api/sys/config/" + id,
      method: "post"
    })
  },
  list(data) {
    return request({
      url: "/api/sys/config/list",
      method: "post",
      data
    })
  },
  searchParams() {
    return request({
      url: "/api/sys/config/searchParams",
      method: "get"
    })
  }
}
