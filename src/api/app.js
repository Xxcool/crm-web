/**
 * Created by lijinfeng on 2019/1/16.
 */
import request from "./../utils/request"

export default {
  // 登录 todo:验证码
  login(data) {
    return request({
      url: "/api/auth/login",
      method: "post",
      data
    })
  },
  // 退出登录 todo:需要测试
  logout() {
    return request({
      url: "/api/auth/logout"
    })
  },
  // 获取菜单 todo:接口地址需要更换
  menu() {
    return request({
      url: "/api/sys/auth-menu",
      data: {}
    })
  },
  userInfo() {
    return request({
      url: "/api/user/info"
    })
  },
  // 上传文件
  fileUpload(data) {

    let param = new FormData();
    param.append('file', data.file);
    console.log(param)

    return request({
      url: `/api/common/upload/1`,
      method: "post",
      data: param,
      headers: {'Content-Type': 'multipart/form-data'}
    })
  },
  /***
   * 模糊搜索商家
   * @param query 关键词
   */
  searchSupplier(query) {
    return request({
      url: `/api/supplier/search?search=${query}&count=20`,
      method: "get"
    })
  },
  /**
   * 搜索院所，研究所
   * @param query 关键词，最多返回50条
   */
  searchInstitutes(query) {
    return request({
      url: `/api/member/institutes/search?search=${query}`,
      method: "get"
    })
  },
  /**
   * 搜索会员
   * @param query 关键词，最多返回20条
   */
  searchMember(query) {
    return request({
      url: `/api/member/search?search=${query}`,
      method: "get"
    })
  },
  /**
   * 省市区
   */
  cascader() {
    return request({
      url: '/api/basic/region',
      method: "get"
    })
  },
  /**
   * 省市(二级)
   */
  provinces() {
    return request({
      url: '/api/basic/provinces',
      method: "get"
    })
  }
}
