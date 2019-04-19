
import request from "../../../utils/request";

export default {

  list(id) {
    return request({
      url: "/api/supplier/service/institutes/list/" + id,
    })
  }
}