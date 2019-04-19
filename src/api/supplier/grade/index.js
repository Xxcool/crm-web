// 新增菜单
import request from "../../../utils/request";

export default {
  del(id) {
    return request({
      url: "/api/supplier/grade/del/" + id
    })
  },
  findById(id) {
    return request({
      url: "/api/supplier/grade/" + id,
      method: "get"
    })
  },
  list(data) {
    return request({
      url: "/api/supplier/grade/list",
      method: "post",
      data
    })
  },
  save(data){
    return request({
      url:null == data.id ? "/api/supplier/grade/add" : "/api/supplier/grade/update",
      method: "post",
      data
    })
  },
  supplierList(data) {
    return request({
      url: "/api/supplier/grade/supplier-list",
      method: "post",
      data
    })
  },
  updateBySupplierId(data){
    return request({
      url: "/api/supplier/grade/update-supplier",
      method: "post",
      data
    })
  }

}
