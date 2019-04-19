
import request from "../../../utils/request";

export default{
  list(data){
    return request({
      url:"/api/repairbills/list",
      method:"post",
      data
    })
  },

  findById(id){
    return request({
      url:"/api/repairbills/"+id
    })
  }
}