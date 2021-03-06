
import request from "../../../utils/request";

export default {

  list(data){
    return request({
      url:"/api/client/supplier/list",
      method:"post",
      data
    })
  },

  add(data){
    return request({
      url:"/api/client/supplier/add",
      method: "post",
      data
    })
  },

  update(data){
    return request({
      url:"/api/client/supplier/update",
      method:"post",
      data
    })
  },

  updateInfo(data){
    return request({
      url:"/api/client/supplier/update-info",
      method:"post",
      data
    })
  },



  findById(id) {
    return request({
      url:"/api/client/supplier/"+id
    })
  },

  /**
   * 分配院所
   * @param data
   */
  updateStatusById(data){
    return request({
      url:"/api/client/supplier/updateStatusById",
      method:"post",
      data
    })
  },

  /**
   * 批量分配院所
   * @param data
   */
  updateStatusByIds(data){
    return request({
      url:"/api/client/supplier/updateStatusByIds",
      method:"post",
      data
    })
  },

  /**
   * 释放院所
   * @param data
   */
  updateStatus(data){
    return request({
      url:"/api/client/supplier/updateStatus",
      method:"post",
      data
    })
  },

  supplierList(data){
    return request({
      url:"/api/supplier/list",
      method:"post",
      data
    })
  },

  contractList(data){
    return request({
      url:"/api/supplier/contract-list",
      method:"post",
      data
    })
  },
  contractType(){
    return request({
      url:"/api/supplier/contract-type",
      method:"get"
    })
  },

  supplierById(id){
    return request({
      url:"/api/supplier/"+id,
      method:"get",
    })
  },
  shopSupplierId(id){
    return request({
      url:"/api/supplier/shop/"+id,
      method:"get",
    })
  },

  relevance(data){
    return request({
      url:"/api/client/supplier/relevance",
      method:"post",
      data
    })
  },

  typeList(){
    return [
      {"id":1,"value":"科研院所"},
      {"id":2,"value":"高校"},
      {"id":3,"value":"医疗机构"},
      {"id":4,"value":"研发型企业"},
      {"id":5,"value":"其他"},
    ]
  },

  batchExcelTemplate() {
    return request({
      url: "/api/client/supplier/batchExcelTemplate",
      method: "get",
      responseType: "blob"
    })
  },
  //获取当前用户有权限的用户ID
  checkList(id) {
    return request({
      url: "/api/user/list-check-user/" + id,
      method: "get"
    })
  },


}