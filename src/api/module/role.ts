import { DELETE_API, LIST_API } from '@/constants/fetch'
import { IRoleRequest, IRoleResponse } from './types/role'
import request from '@/utils/axios'

export default {
  // 角色列表
  [LIST_API](params: IRoleRequest) {
    return request.get<IRoleResponse>({
      url: '/admin/role',
      params
    })
  }
}
