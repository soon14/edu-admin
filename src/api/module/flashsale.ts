import {
  CREATE_API,
  LIST_API,
  UPDATE_API,
  UPDATE_STATE_API
} from '@/constants/fetch'
import request from '@/utils/axios'
import {
  IFlashsaleRequest,
  IFlashsaleResponse,
  IFlashsaleUpdateRequest,
  IFlashsale
} from './types/flashsale'

export default {
  // 秒杀列表
  [LIST_API](params: IFlashsaleRequest) {
    return request.get<IFlashsaleResponse>({
      url: '/admin/s/flashsale',
      params
    })
  },
  // 新增秒杀
  [CREATE_API](data: Partial<IFlashsale>) {
    return request.post({
      url: '/admin/s/flashsale/save',
      data
    })
  },
  // 上架/下架秒杀
  [UPDATE_STATE_API](data: IFlashsaleUpdateRequest) {
    return request.post({
      url: '/admin/s/flashsale/updatestatus',
      data
    })
  },
  // 更新秒杀
  [UPDATE_API](data: Partial<IFlashsale>) {
    return request.post({
      url: '/admin/s/flashsale/update',
      data
    })
  }
}
