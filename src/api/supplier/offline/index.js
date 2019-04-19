// 新增菜单
import request from "../../../utils/request";

export default {
  update(data) {
    return request({
      url: "/api/supplier/offline/update",
      method: "get",
      params:data
    })
  },
  list(data) {
    return request({
      url: "/api/supplier/offline/list",
      method: "post",
      data
    })
  },
  state() {
    return [
      {"value": 3, "label": "全部"},
      {"value": 0, "label": "待审核"},
      {"value": 1, "label": "审核通过"},
      {"value": 2, "label": "审核未通过"}
    ]
  }
}
