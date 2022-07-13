import {
  CREATE_API,
  DELETE_API,
  LIST_API,
  UPDATE_API,
  UPDATE_STATE_API
} from '@/constants/fetch'
import request from '@/utils/axios'
import {
  IBookDetailListReq,
  IBookDetailListRes,
  IBookDetailCreateReq,
  IBookDetailUpdateReq,
  IBookDetailDeleteReq,
  IBookDetailSortReq
} from './types/book-detail'

export default {
  // 电子书章节列表
  [LIST_API](params: IBookDetailListReq) {
    return request.get<IBookDetailListRes>({
      url: '/admin/s/book_detail',
      params
    })
  },
  // 新增电子书章节
  [CREATE_API](data: IBookDetailCreateReq) {
    return request.post({
      url: '/admin/s/book_detail/save',
      data
    })
  },
  // 更新电子书章节
  [UPDATE_API](data: IBookDetailUpdateReq) {
    return request.post({
      url: '/admin/s/book_detail/update',
      data
    })
  },
  // 删除电子书章节
  [DELETE_API](data: IBookDetailDeleteReq) {
    return request.post({
      url: '/admin/s/book_detail/delete',
      data
    })
  },
  // 电子书章节排序
  sortApi(data: IBookDetailSortReq) {
    return request.post({
      url: '/admin/s/book_detail/sort',
      data
    })
  }
}
