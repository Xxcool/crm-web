
import request from "../../../utils/request";

export default {

  list(data){
    return request({
      url:"/api/client/institutes/contact/list",
      method:"post",
      data
    })
  },

  selectAll(id){
    return request({
      url:"/api/client/institutes/contact/selectAll/"+id,
      method:"post"
    })
  },

  add(data){
    return request({
      url :data.id ==null ? "/api/client/institutes/contact/add" :"/api/client/institutes/contact/update",
      method: "post",
      data
    })
  },

  addList(data){
    return request({
      url : "/api/client/institutes/contact/add-list",
      method: "post",
      data
    })
  },

  ossMemberList(id){
    return request({
      url : "/api/member/member/find-by-institutesId?institutesId="+id,
      method: "post",
    })
  },

  update(data){
    return request({
      url:"/api/client/institutes/contact/update",
      method: "post",
      data
    })
  },

  del(id){
    return request({
      url:"/api/client/institutes/contact/del/"+id
    })
  }
}