// 新增菜单
import request from "../../../utils/request";

export default {
  list(data) {
    return request({
      url: "/api/supplier/shopping-ask/list",
      method: "post",
      data
    })
  },
  get(id) {
    return request({
      url: "/api/supplier/shopping-ask/get/" + id,
    })
  },
  update(params) {
    return request({
      url: "/api/supplier/shopping-ask/update-status",
      type:"form",
      method: "post",
      params
    })
  },
  del(id) {
    return request({
      url: "/api/supplier/shopping-ask/logic-del/" + id,
    })
  },
  isCheck() {
    return [
      {"value": "", "label": "全部"},
      {"value": 0, "label": "未审核"},
      {"value": 1, "label": "已审核"}
    ]
  },
  isReply() {
    return [
      {"value": "", "label": "全部"},
      {"value": 0, "label": "未回复"},
      {"value": 1, "label": "已回复"}
    ]
  }
}
