
import request from "../../../utils/request";

export default {
  tree(tagType){
    return request({
      url:"/api/tag/tree/"+tagType,
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

  allList(tagType){
    return request({
      url:"/api/tag/allList/"+tagType,
      method:"post"
    })
  },

  del(code,tagType){
    return request({
      url:"/api/tag/del/"+code+"/"+tagType
    })
  },

  findByCode(code) {
    return request({
      url:"/api/tag/"+code
    })
  },

  getOrgTagTree(code,tagType){
    return request({
      url:"/api/tag/org-tag-tree/"+code+"/"+tagType
    })
  },
  getOrgTagTreeByInstitutesId(id,tagType){
    return request({
      url:"/api/tag/org-tag-tree/institutes/"+id+"/"+tagType
    })
  },

  findOrgTag(code){
    return request({
      url:"/api/tag/getTagTreeByOrg/"+code
    })
  }

}
