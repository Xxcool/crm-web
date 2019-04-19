import request from "../../../utils/request";

export default {
  list(data) {
    return request({
      url: "/api/supplier/engineer/list",
      method: "post",
      data
    })
  },
  get(data) {
    return request({
      url: "/api/supplier/engineer/get/" + data,
      method: "get"
    })
  },
  updateAuditStatus(data) {
    return request({
      url: "/api/supplier/engineer/update-audit-status",
      method: "post",
      data
    })
  },
  keyValueList() {
    return request({
      url: "/api/supplier/engineer-category/key-value-list",
      method: "get"
    })
  },
  auditStatusOptions() {
    return [{
      value: 0,
      label: '待审核'
    }, {
      value: 1,
      label: '已审核'
    }, {
      value: 2,
      label: '审核不通过'
    }]
  }
}
