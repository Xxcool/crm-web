
import request from "../../../utils/request";

export default {
  save(params) {
    debugger
    return request({
      url: "/api/supplier/settle/institutes/save",
      method: "post",
      type:"form",
      params,
    })
  },
  list(id) {
    return request({
      url: "/api/supplier/settle/institutes/list/" + id,
    })
  },
  institutesList(data) {
    return request({
      url: "/api/supplier/institutes/orders-limit/select-limit-institutes",
      method: "post",
      data
    })
  }
}