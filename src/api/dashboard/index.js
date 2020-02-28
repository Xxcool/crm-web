// 新增菜单
import request from "../../utils/request";

export default {
  releaseNum(){
    return request({
      url: "/api/client/institutes/release-num"
    })
  }
}
