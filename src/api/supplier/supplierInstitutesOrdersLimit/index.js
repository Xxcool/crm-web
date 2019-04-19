
import request from "../../../utils/request";

export default {
  save(params) {
    debugger
    return request({
      url: "/api/supplier/institutes/orders-limit/add",
      method: "post",
      type:"form",
      params,
    })
  },
  del(id) {
    return request({
      url: "/api/supplier/institutes/orders-limit/del" + id
    })
  },
  list(id) {
    return request({
      url: "/api/supplier/institutes/orders-limit/list/" + id,
      method: "post",

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