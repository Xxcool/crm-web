
import request from "../../../utils/request";

export default {
  list(data){
    return request({
      url:"/api/client/institutes/log/list",
      method:"post",
      data
    })
  },

  add(data){
    return request({
      url:"/api/client/institutes/log/add",
      method: "post",
      data
    })
  },

  selectByInstitutes(data){
    return request({
      url:"/api/client/institutes/log/selectByInstitutes",
      method:"post",
      data
    })
  }

}