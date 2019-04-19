
import request from "../../../utils/request";

export default {
  save(params) {
    debugger
    return request({
      url: "/api/supplier/bidding/batch-insert",
      method: "post",
      type:"form",
      params,
    })
  },
  list(id) {
    return request({
      url: "/api/supplier/bidding/index/" + id,
    })
  },
  tree() {
    return request({
      url: "/api/supplier/bidding/bid-category-tree"
    })
  },
  getId() {
    return request({
      url: "/api/supplier/bidding/bid-category"
    })
  }
}