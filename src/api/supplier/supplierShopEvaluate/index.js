// 新增菜单
import request from "../../../utils/request";

export default {
  findById(id) {
    return request({
      url: "/api/supplier/shop/evaluate/findById/" + id,
      method:"post"
    })
  },
  list(data) {
    return request({
      url: "/api/supplier/shop/evaluate/list",
      method: "post",
      data
    })
  },
  update(data){
    return request({
      url: "/api/product/review/config/add",
      method: "post",
      data
    })
  },
  supplierList(data){
    return request({
      url: "/api/supplier/selectIdsAndNames",
      method: "post",
      data
    })
  },
  selectData(){
    return request({
      url:"/api/product/review/config/select-data",
      method:"get"
    })
  }
  /*approval(data){
    return request({
      url: "/api/supplier/shop/evaluate/approval" ,
      method: "post",
      data
    })
  }*/
}
