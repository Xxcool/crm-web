
import request from "../../../utils/request";

export  default {
  list(id){
    return request({
         url:"/api/repairbills/log/list/"+id,
         method:"post"
    })
  }
}