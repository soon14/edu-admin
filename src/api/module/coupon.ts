import {
  CREATE_API,
  LIST_API,
  UPDATE_API,
  UPDATE_STATE_API
} from '@/constants/fetch'
import request from '@/utils/axios'
import {
  ICouponRequest,
  ICouponResponse,
  ICouponUpdateRequest,
  ICoupon
} from './types/coupon'

export default {
  // 优惠券列表
  [LIST_API](params: ICouponRequest) {
    return request.get<ICouponResponse>({
      url: '/admin/s/coupon',
      params
    })
  },
  // 新增优惠券
  [CREATE_API](data: Partial<ICoupon>) {
    return request.post({
      url: '/admin/s/coupon/save',
      data
    })
  },
  // 上架/下架优惠券
  [UPDATE_STATE_API](data: ICouponUpdateRequest) {
    return request.post({
      url: '/admin/s/coupon/updatestatus',
      data
    })
  },
  // 更新优惠券
  [UPDATE_API](data: Partial<ICoupon>) {
    return request.post({
      url: '/admin/s/coupon/update',
      data
    })
  }
}
