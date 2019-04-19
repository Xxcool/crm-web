// 新增菜单
import request from "../../../utils/request";

export default {
  list(data){
    return request({
      url: "/api/supplier/message/list",
      method: "post",
      data
    })
  },
  del(id){
    return request({
      url:"/supplier/message/del/"+id
    })
  },
  add(data){
    return request({
      url:data.id ? "/supplier/message/update":"/supplier/message/add",
      method:"post",
      data
    })
  },
  update(data){
    return request({
      url:"/supplier/message/update",
      method:"post",
      data
    })
  },
  view(id){
    return request({
      url:"/supplier/message/"+id
    })
  }
}

