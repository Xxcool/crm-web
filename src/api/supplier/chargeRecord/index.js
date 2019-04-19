import request from "../../../utils/request";

export default {
  list(data) {
    return request({
      url: "/api/supplier/charge-record/list",
      method: "post",
      data
    })
  },
  loadSupplierOptions() {
    return request({
      url: "/api/supplier/select-option",
      method: "get"
    })
  },
  findById(id) {
    return request({
      url: "/api/supplier/charge-record/get/" + id,
      method: "get"
    })
  },
  update(data) {
    return request({
      url: "/api/supplier/charge-record/update",
      method: "post",
      data
    })
  },
  add(data) {
    return request({
      url: "/api/supplier/charge-record/add",
      method: "post",
      data
    })
  },
  defaultCateTypes() {
    return [{
      value: 1,
      label: '入驻合同(年费)'
    }, {
      value: 2,
      label: '续签合同'
    }, {
      value: 3,
      label: '技术服务费合同'
    }, {
      value: 4,
      label: '广告合同'
    }, {
      value: 5,
      label: '入驻合同(保证金)'
    }]
  }, defaultCateStatus() {
    return [{
      value: 0,
      label: "未提交"
    }, {
      value: 1,
      label: "处理中"
    }, {
      value: 2,
      label: "已完成"
    }]
  }

  , defaultPaymentStatus() {
    return [{
      value: 0,
      label: '未到账'
    }, {
      value: 1,
      label: '已到账'
    }]
  }, defaultInvoiceStatus() {
    return [{
      value: 0,
      label: '未申请'
    }, {
      value: 1,
      label: '已申请'
    }, {
      value: 2,
      label: '已开票'
    }]
  },
}
