
import request from "../../../utils/request";

export default {
  list(data){
    return request({
      url:"/api/client/supplier/log/list",
      method:"post",
      data
    })
  },

  getUsers() {
    return request({
      url:"/api/user/select-all",
      method:"post"
    })
  },

  supplierList(data){
    return request({
      url:"/api/client/supplier/list",
      method:"post",
      data
    })
  },

  add(data){
    return request({
      url:"/api/client/supplier/log/add",
      method: "post",
      data
    })
  },

  selectBysupplier(data){
    return request({
      url:"/api/client/supplier/log/selectBySupplier",
      method:"post",
      data
    })
  },

  exportData(data){
    return request({
      url:"/api/client/supplier/log/export",
      method:"post",
      responseType: "blob",
      data
    })
  }

}