import {
  CREATE_API,
  DELETE_API,
  INFO_API,
  LIST_API,
  UPDATE_API
} from '@/constants/fetch'
import request from '@/utils/axios'
import {
  IRenovationRequest,
  IRenovationResponse,
  IRenovationUpdateRequest,
  IRenovationListRequest,
  IRenovationListResponse
} from './types/renovation'

export default {
  // 新增页面
  [CREATE_API](data: IRenovationRequest) {
    return request.post<IRenovationResponse>({
      url: '/admin/s/renovation/save',
      data
    })
  },
  // 更新页面
  [UPDATE_API](data: IRenovationUpdateRequest) {
    return request.post({
      url: '/admin/s/renovation/update',
      data
    })
  },
  // 页面列表
  [LIST_API](params: IRenovationListRequest) {
    return request.get<IRenovationListResponse>({
      url: '/admin/s/renovation',
      params
    })
  },
  // 删除页面
  [DELETE_API](data: { ids: any[] }) {
    return request.post({
      url: '/admin/s/renovation/delete',
      data
    })
  },
  // 查看模板详情
  [INFO_API](id: any) {
    return request.get<IRenovationUpdateRequest>({
      url: '/admin/s/renovation/read',
      params: { id }
    })
  }
}
