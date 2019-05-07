
import request from "../../../utils/request";
import {Message} from "element-ui";

export default {

  list(data){
    return request({
      url:"/api/client/supplier/contact/list",
      method:"post",
      data
    })
  },

  selectAll(id){
    return request({
      url:"/api/client/supplier/contact/selectAll/"+id,
      method:"post"
    })
  },

  add(data){
    return request({
      url :data.id ==null ? "/api/client/supplier/contact/add" :"/api/client/supplier/contact/update",
      method: "post",
      data
    })
  },

  ossMemberList(id){
    return request({
      url : "/api/supplier/"+id,
    })
  },

  update(data){
    return request({
      url:"/api/client/supplier/contact/update",
      method: "post",
      data
    })
  },

  del(id){
    return request({
      url:"/api/client/supplier/contact/del/"+id
    })
  },


  download(params) {
    let data = params.data;
    request({
      method: params.method || 'post',
      url: params.url,
      responseType: 'blob',
      data
    }).then((response) => {
      if (params.callback) {
        params.callback();
      }
      if (!response) {
        return
      }
      let url = window.URL.createObjectURL(response.data)
      let link = document.createElement('a')
      link.style.display = 'none'
      link.href = url
      link.setAttribute('download', params.fileName);

      document.body.appendChild(link)
      link.click()
    }).catch(() => {
      Message({
        message: "下载文件出错",
        type: "error",
        duration: 3 * 1000
      });
      if (params.callback) {
        params.callback();
      }
    })
  }
}