import { CREATE_API, DELETE_API, LIST_API, UPDATE_API } from '@/constants/fetch'
import request from '@/utils/axios'
import {
  ICashRequest,
  ICashResponse,
  ICashUpdateRequest,
  ICash
} from './types/cash'

export default {
  // 收款账户列表
  [LIST_API](params: ICashRequest) {
    return request.get<ICashResponse>({
      url: '/admin/s/cash',
      params
    })
  },
  // 更新收款账户
  [UPDATE_API](data: ICashUpdateRequest) {
    return request.post<ICash>({
      url: '/admin/s/cash/update',
      data
    })
  },
  // 新增收款账户
  [CREATE_API](data: Partial<ICash>) {
    return request.post({
      url: '/admin/s/cash/save',
      data
    })
  },
  // 删除收款账户
  [DELETE_API](data: { ids: number[] }) {
    return request.post({
      url: '/admin/s/cash/delete',
      data
    })
  }
}
