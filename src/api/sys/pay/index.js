import request from "../../../utils/request";

export default {
  allList(){
    return request({
      url:"/api/sys/pay/all-list",
      method:"post"
    })
  }
}