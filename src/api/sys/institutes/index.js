
import request from "../../../utils/request";

export default {

  list(data){
    return request({
      url:"/api/client/institutes/list",
      method:"post",
      data
    })
  },

  add(data){
    return request({
      url:"/api/client/institutes/add",
      method: "post",
      data
    })
  },

  update(data){
    return request({
      url:"/api/client/institutes/update",
      method:"post",
      data
    })
  },

  findById(id) {
    return request({
      url:"/api/client/institutes/"+id
    })
  },
  institutesById(id) {
    return request({
      url:"/api/basic/institutes/"+id
    })
  },
  selectGradeByIns(data) {
    return request({
      url:"/api/member/member/select-grade-by-institutes/",
      method:"post",
      data
    })
  },
  //获取当前用户有权限的用户ID
  checkList(id) {
    return request({
      url: "/api/user/list-check-user/" + id,
      method: "get"
    })
  },

  /**
   * 分配院所
   * @param data
   */
  updateStatusById(data){
    return request({
      url:"/api/client/institutes/updateStatusById",
      method:"post",
      data
    })
  },

  /**
   * 批量分配院所
   * @param data
   */
  updateStatusByIds(data){
    return request({
      url:"/api/client/institutes/updateStatusByIds",
      method:"post",
      data
    })
  },

  /**
   * 释放院所
   * @param data
   */
  updateStatus(data){
    return request({
      url:"/api/client/institutes/updateStatus",
      method:"post",
      data
    })
  },

  institutesList(data){
    return request({
      url:"/api/basic/institutes/list",
      method:"post",
      data
    })
  },

  relevance(data){
    return request({
      url:"/api/client/institutes/relevance",
      method:"post",
      data
    })
  },

  updateByOnLine(data){
    return request({
      url:"/api/client/institutes/updateByOnLine",
      method:"post",
      data
    })
  },

  typeList(){
    return [
      {"id":1,"value":"科研院所"},
      {"id":2,"value":"高校"},
      {"id":3,"value":"医疗机构"},
      {"id":4,"value":"研发型企业"},
      {"id":5,"value":"其他"},
    ]
  },

  download(){
    return request({
      url:"/api/client/institutes/download-template",
      method:"get",
      responseType: "blob",
    })
  },

  mul_import(data){
    return request({
      url:"/api/client/institutes/import",
      method:"post",
      data
    })
  },
  import(filePath){
    return request({
      url:"/api/client/institutes/importData?filePath="+filePath,
    })
  },
  selectUserIdsByInstitutesId(id) {
    return request({
      url:"/api/client/institutes/selectUserIdsByInstitutesId/"+id,
      method: "get"
    })
  },
  sameName(name){
    return request({
      url:"/api/client/institutes/same-name?name="+name,
      method: "get"
    })
  },
  institutesTagTree(id){
    return request({
      url:"/api/client/institutes/tag/tree/"+id,
      method: "get"
    })
  },
  addTagTree(data){
    return request({
      url:"/api/client/institutes/add/tag",
      method:"post",
      data
    })
  },
  trackTag(id){
    return request({
      url:"/api/client/institutes/track/tag/"+id,
      method:"get"
    })
  }
}
