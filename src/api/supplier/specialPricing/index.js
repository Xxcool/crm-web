
import request from "../../../utils/request";

export default {
  save(params) {
    return request({
      url: "/api/supplier/price-institutes/update",
      method: "post",
      type:"form",
      params,
    })
  },
  list(id) {
    return request({
      url: "/api/supplier/price-institutes/list/" + id,
    })
  },
}