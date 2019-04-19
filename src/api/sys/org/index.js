
import request from "../../../utils/request";

export default {
  tree(){
    return request({
      url:"/api/org/tree",
      method:"post"
    })
  },

  add(data){
    return request({
      url: "/api/org/add",
      method: "post",
      data
    })
  },

  update(data){
    return request({
      url: "/api/org/update",
      method: "post",
      data
    })
  },

  allList(){
    return request({
      url:"/api/org/allList",
      method:"post"
    })
  },

  del(code){
    return request({
      url:"/api/org/del/"+code
    })
  },

  findByCode(code) {
    return request({
      url:"/api/org/"+code
    })
  }

}