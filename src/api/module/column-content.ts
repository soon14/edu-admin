import { CREATE_API, DELETE_API, LIST_API, SORT_API } from '@/constants/fetch'
import request from '@/utils/axios'
import {
  IColumnContentsRequest,
  IColumnContentsSortRequest,
  IColumnContentsDeleteRequest,
  IColumnContentsListRequest,
  IColumnContentsListResponse
} from './types/column-content'

export default {
  // 新增专栏目录
  [CREATE_API](data: IColumnContentsRequest) {
    return request.post({
      url: '/admin/s/column_course/save',
      data
    })
  },
  // 专栏目录排序
  [SORT_API](data: IColumnContentsSortRequest) {
    return request.post({
      url: '/admin/s/column_course/sort',
      data
    })
  },
  // 删除专栏目录
  [DELETE_API](data: IColumnContentsDeleteRequest) {
    return request.post({
      url: '/admin/s/column_course/delete',
      data
    })
  },
  // 专栏目录列表
  [LIST_API](params: IColumnContentsListRequest) {
    return request.get<IColumnContentsListResponse>({
      url: '/admin/s/column_course',
      params
    })
  }
}
