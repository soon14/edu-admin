import { CREATE_API, DELETE_API, LIST_API, UPDATE_API } from '@/constants/fetch'
import request from '@/utils/axios'
import {
  ICashconfirmRequest,
  ICashconfirmResponse,
  IGetCashRequest,
  IGetCashResponse
} from './types/cashconfirm'

export default {
  // 申请提现列表
  [LIST_API](params: ICashconfirmRequest) {
    return request.get<ICashconfirmResponse>({
      url: '/admin/s/cashconfirm',
      params
    })
  },
  // 申请提现
  getCashApi(params: IGetCashRequest) {
    return request.post<IGetCashResponse>({
      url: '/admin/s/cashconfirm/save',
      params
    })
  }
}
