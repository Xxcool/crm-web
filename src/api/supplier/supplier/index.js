// 新增菜单
import request from "../../../utils/request";

export default {
  searchParams() {
    return request({
      url: "/api/supplier/index"
    })
  },
  list(data) {
    return request({
      url: "/api/supplier/list",
      method: "post",
      data
    })
  },
  update(data) {
    return request({
      url: '/api/supplier/update',
      method: 'post',
      data
    })
  },
  updateById(data) {
    return request({
      url: '/api/supplier/update-by-id',
      method: 'post',
      data
    })
  },
  updateSal(data) {
    return request({
      url: '/api/supplier/update-sal',
      method: 'post',
      data
    })
  },
  updateStations(data) {
    return request({
      url: '/api/supplier/update-stations',
      method: 'post',
      type: 'form',
      data
    })
  },
  getStations(data) {
    return request({
      url: '/api/supplier/get-stations',
      method: 'post',
      type: 'form',
      data
    })
  },
  detailInfo(id) {
    return request({
      url: '/api/supplier/detail/' + id,
    })
  },
  findDetailById(id) {
    return request({
      url: '/api/supplier/find-detail-by-id/' + id,
    })
  },
  simpleInfo(id) {
    return request({
      url: '/api/supplier/' + id,
    })
  },
  deleteByIds(ids) {
    request({
      url: '/api/supplier/del?ids=' + ids,
    })
  },
  resetPwd(data) {
    return request({
      url: '/api/supplier/update-password/',
      method: 'post',
      data
    })
  }
}
