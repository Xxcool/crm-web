// 新增菜单
import request from "../../../utils/request";

export default {
  list(data){
    return request({
      url: "/api/order/waste/cate/list",
      method: "post",
      data
    })
  },
  del(id){
    return request({
      url:"/api/order/waste/cate/logic-del/"+id
    })
  },
  add(data){
    return request({
      url:data.id ? "/api/order/waste/cate/update":"/api/order/waste/cate/add",
      method:"post",
      data
    })
  },
  update(data){
    return request({
      url:"/api/order/waste/cate/update",
      method:"post",
      data
    })
  },
  view(id){
    return request({
      url:"/api/order/waste/cate/"+id
    })
  }
}

