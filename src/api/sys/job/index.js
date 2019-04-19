
import request from "../../../utils/request";

export default {

  tree(){
    return request({
      url:"/api/job/tree",
      method:"post"
    })
  },

  add(data){
    return request({
      url:"/api/job/add",
      method: "post",
      data
    })
  },

  update(data){
    return request({
      url:"/api/job/update",
      method:"post",
      data
    })
  },

  del(code){
    return request({
      url:"/api/job/del/"+code
    })
  },

  findByCode(code){
    return request({
      url:"/api/job/"+code
    })
  },

  allList() {
    return request({
      url:"/api/job/allList"
    })
  }
}