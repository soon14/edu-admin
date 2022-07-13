import {
  CREATE_API,
  DELETE_API,
  LIST_API,
  UPDATE_API,
  UPDATE_STATE_API
} from '@/constants/fetch'
import request from '@/utils/axios'
import {
  IBookCreateReq,
  IBookUpdateReq,
  IBookListReq,
  IBookListRes,
  IBookStateReq
} from './types/book'

export default {
  // 新增电子书
  [CREATE_API](data: IBookCreateReq) {
    return request.post({
      url: '/admin/s/book/save',
      data
    })
  },
  // 更新电子书
  [UPDATE_API](data: IBookUpdateReq) {
    return request.post({
      url: '/admin/s/book/update',
      data
    })
  },
  // 电子书列表
  [LIST_API](params: IBookListReq) {
    return request.get<IBookListRes>({
      url: '/admin/s/book',
      params
    })
  },
  // 上架/下架电子书
  [UPDATE_STATE_API](data: IBookStateReq) {
    return request.post({
      url: '/admin/s/book/updatestatus',
      data
    })
  }
}
