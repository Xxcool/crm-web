
import request from "../../../utils/request";

export default {
  tree(){
    return request({
      url:"/api/tag/tree",
      method:"post"
    })
  },

  add(data){
    return request({
      url: "/api/tag/add",
      method: "post",
      data
    })
  },

  update(data){
    return request({
      url: "/api/tag/update",
      method: "post",
      data
    })
  },

  allList(){
    return request({
      url:"/api/tag/allList",
      method:"post"
    })
  },

  del(code){
    return request({
      url:"/api/tag/del/"+code
    })
  },

  findByCode(code) {
    return request({
      url:"/api/tag/"+code
    })
  }

}