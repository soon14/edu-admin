import { DELETE_API, LIST_API } from '@/constants/fetch'
import {
  IOrderRequest,
  IOrderResponse,
  IDelateOrderRequest
} from './types/order'
import request from '@/utils/axios'

export default {
  // 订单列表
  [LIST_API](params: IOrderRequest) {
    return request.get<IOrderResponse>({
      url: '/admin/s/order',
      params
    })
  },
  // 删除订单
  [DELETE_API](data: IDelateOrderRequest) {
    return request.post({
      url: '/admin/s/order/delete',
      data
    })
  }
}
