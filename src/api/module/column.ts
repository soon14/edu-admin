import {
  CREATE_API,
  DELETE_API,
  INFO_API,
  LIST_API,
  UPDATE_API,
  UPDATE_STATE_API
} from '@/constants/fetch'
import request from '@/utils/axios'
import {
  IColumnRequest,
  IColumnListRequest,
  IColumnDeleteRequest,
  IColumnUpdateStateRequest,
  IColumnUpdateSendStateRequest,
  IColumnListResponse,
  IColumnDescResponse
} from './types/column'

export default {
  // 创建专栏
  [CREATE_API](data: IColumnRequest) {
    return request.post({
      url: '/admin/s/column/save',
      data
    })
  },
  // 更新专栏
  [UPDATE_API](data: IColumnRequest) {
    return request.post({
      url: '/admin/s/column/update',
      data
    })
  },
  // 专栏列表
  [LIST_API](params: IColumnListRequest) {
    return request.get<IColumnListResponse>({
      url: '/admin/s/column',
      params
    })
  },
  // 删除专栏
  [DELETE_API](data: IColumnDeleteRequest) {
    return request.post({
      url: '/admin/s/column/delete',
      data
    })
  },
  // 上架/下架专栏
  updateColumnStateApi(data: IColumnUpdateStateRequest) {
    return request.post({
      url: '/admin/s/column/updatestatus',
      data
    })
  },
  // 修改专栏更新状态
  updateColumnSendStateApi(data: IColumnUpdateSendStateRequest) {
    return request.post({
      url: '/admin/s/column/updateend',
      data
    })
  },
  // 查询专栏详细信息
  [INFO_API](id: number) {
    return request.get<IColumnDescResponse>({
      url: '/admin/s/column/read',
      params: { id }
    })
  }
}
