import request from "../../../utils/request";

export default {
  list(data) {
    return request({
      url: "/api/supplier/agent/list",
      method: "post",
      data
    })
  },
  listById(id) {
    return request({
      url: "/api/supplier/agent/list/" + id
    })
  },
  batchLogicDel(data) {
    return request({
      url: "/api/supplier/agent/logic-delete-ids",
      method: "post",
      data
    })
  },
  auditLogicDel(data) {
    return request({
      url: "/api/supplier/agent/logic-delete-audit",
      method: "post",
      data
    })
  },
  defaultAuditStatus() {
    return [
      {"value": 0, "label": "未审核"},
      {"value": 1, "label": "审核通过"},
      {"value": 2, "label": "审核不通过"}
    ]
  },
  save(data) {
    return request({
      url: "/api/supplier/agent/add",
      method: "post",
      data
    })
  }
  , update(data) {
    return request({
      url: "/api/supplier/agent/update",
      method: "post",
      type: "form",
      data
    })
  }
}
