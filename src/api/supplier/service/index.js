// 新增菜单
import request from "../../../utils/request";

export default {
  list(supplierId) {
    return request({
      url: "/api/supplier/service/rate/list/" + supplierId,
      method: "get",
    })
  },
  getDetail(rateId) {
    return request({
      url: "/api/supplier/service/rate/update/" + rateId,
      method: "get",
    })
  },
  save(data) {
    return request({
      url: data.id ? "/api/supplier/service/rate/update-rate" : "/api/supplier/service/rate/insert",
      method: "post",
      data
    })
  },
  update(data) {
    return request({
      url: '/api/supplier/service/rate/update-rate',
      method: 'post',
      data
    })
  },
  delete(id) {
    return request({
      url: '/api/supplier/service/rate/del/' + id,
      method: 'get',
    })
  }



}
