import request from "../../../utils/request";

export default {
  list(data) {
    return request({
      url: "/api/supplier/agent-apply/list",
      method: "post",
      data
    })
  },
  defaultAuditStatus() {
    return [
      {"value": 0, "label": "未审核"},
      {"value": 2, "label": "审核不通过"}
    ]
  },
  defaultStationOptions() {
    return request({
      url: "/api/sys/station/selectAll",
      method: "get"
    })
  },
  batchUpdateAudit(data){
    return request({
      url: "/api/supplier/agent-apply/update",
      method: "post",
      data
    })
  }
}
