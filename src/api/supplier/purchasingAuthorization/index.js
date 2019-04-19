
import request from "../../../utils/request";

export default {
  save(params) {
    return request({
      url: "/api/supplier/service/institutes/save",
      method: "post",
      type:"form",
      params,
    })
  },
  del(id) {
    return request({
      url: "/api/supplier/service/institutes/logic-del/" + id
    })
  },
  list(id) {
    return request({
      url: "/api/supplier/service/institutes/list/" + id,
    })
  },
  institutesList(id) {
    return request({
      url: "/api/supplier/service/institutes/institutesList/" + id,
    })
  }
}