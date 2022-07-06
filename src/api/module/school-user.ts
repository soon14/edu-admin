import { LIST_API } from '@/constants/fetch'
import request from '@/utils/axios'
import {
  ISchoolUserRequest,
  ISchoolUserResponse,
  ISchoolUser,
  IScrollUserSubRequest,
  IScrollUserSubResponse,
  IScrollUserOrderRequest,
  IScrollUserOrderResponse,
  IScrollUserHistoryRequest,
  IScrollUserHistoryResponse,
  IScrollUserAccessRequest,
  IScrollUserAccessResponse,
  IScrollUserCommentRequest,
  IScrollUserCommentResponse
} from './types/school-user'

export default {
  // 网校用户列表
  [LIST_API](params: ISchoolUserRequest) {
    return request.get<ISchoolUserResponse>({
      url: '/admin/s/school_user',
      params
    })
  },
  // 查询网校用户详细信息
  getSchoolUserDescByIdApi(id: number) {
    return request.get<ISchoolUser>({
      url: '/admin/s/school_user/read',
      params: { id }
    })
  },
  // 查看网校用户订阅列表
  getSchoolUserSubsApi(params: IScrollUserSubRequest) {
    return request.get<IScrollUserSubResponse>({
      url: '/admin/s/order_item',
      params
    })
  },
  // 查看网校用户订单列表
  getSchoolUserOrdersApi(params: IScrollUserOrderRequest) {
    return request.get<IScrollUserOrderResponse>({
      url: '/admin/s/order',
      params
    })
  },
  // 查看网校用户观看历史
  getSchoolUserHistoryApi(params: IScrollUserHistoryRequest) {
    return request.get<IScrollUserHistoryResponse>({
      url: '/admin/s/user_history',
      params
    })
  },
  // 禁止/开启访问
  changeAccessApi(data: IScrollUserAccessRequest) {
    return request.post<IScrollUserAccessResponse>({
      url: '/adminApi/s/school_user/updateaccess',
      data
    })
  },
  // 禁止/开启评论
  changeCommentApi(data: IScrollUserCommentRequest) {
    return request.post<IScrollUserCommentResponse>({
      url: '/admin/s/school_user/updatecomment',
      data
    })
  }
}
