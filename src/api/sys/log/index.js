
import request from "../../../utils/request";

export default {
  list(data){
    return request({
      url:"/api/client/institutes/log/list",
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

  institutesList(data){
    return request({
      // url:"/api/basic/institutes/list",
      url:"/api/client/institutes/list",
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
  },

  exportData(data){
    return request({
      url:"/api/client/institutes/log/export",
      method:"post",
      data
    })
  }

}