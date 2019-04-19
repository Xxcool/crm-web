// 新增菜单
import request from "../../../utils/request";

export default {
  list(data) {
    return request({
      url: "/api/supplier/growth/config/log/list",
      method: "post",
      data
    })
  },
  statusList() {
    return [
      {"value": 0, "label": "使用中"},
      {"value": 1, "label": "已禁用"},
    ]
  },
  typeList() {
    return [
      {"value": 1, "label": "平台费用缴纳"},
      {"value": 2, "label": "品牌代理级别"},
      {"value": 3, "label": "店铺类型"},
      {"value": 4, "label": "商品评价"},
      {"value": 5, "label": "店铺评价"},
      {"value": 6, "label": "售后"},
      {"value": 7, "label": "价格投诉"},
      {"value": 8, "label": "服务质量投诉"},
      {"value": 9, "label": "订单数"},
      {"value": 10, "label": "首次开通店铺"},
      {"value": 11, "label": "线下活动激励"},
      {"value": 12, "label": "线上活动激励"},
      {"value": 13, "label": "每月订单交易金额"},
      {"value": 14, "label": "商品完善度"},
    ]
  },

}
