import {
  CREATE_API,
  DELETE_API,
  LIST_API,
  UPDATE_API,
  UPDATE_STATE_API
} from '@/constants/fetch'
import request from '@/utils/axios'
import {
  IGroupRequest,
  IGroupResponse,
  IGroupUpdateRequest,
  IGroup
} from './types/group'

export default {
  // 拼团列表
  [LIST_API](params: IGroupRequest) {
    return request.get<IGroupResponse>({
      url: '/admin/s/group',
      params
    })
  },
  // 新增拼团
  [CREATE_API](data: Partial<IGroup>) {
    return request.post({
      url: '/admin/s/group/save',
      data
    })
  },
  // 上架/下架拼团
  [UPDATE_STATE_API](data: IGroupUpdateRequest) {
    return request.post({
      url: '/admin/s/group/updatestatus',
      data
    })
  },
  // 更新拼团
  [UPDATE_API](data: Partial<IGroup>) {
    return request.post({
      url: '/admin/s/group/update',
      data
    })
  }
}
