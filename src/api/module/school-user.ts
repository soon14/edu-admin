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
  getSchoolUserDescById(id: number) {
    return request.get<ISchoolUser>({
      url: '/admin/s/school_user/read',
      params: { id }
    })
  },
  // 查看网校用户订阅列表
  getSchoolUserSubs(params: IScrollUserSubRequest) {
    return request.get<IScrollUserSubResponse>({
      url: '/admin/s/order_item',
      params
    })
  },
  // 查看网校用户订单列表
  getSchoolUserOrders(params: IScrollUserOrderRequest) {
    return request.get<IScrollUserOrderResponse>({
      url: '/admin/s/order',
      params
    })
  },
  // 查看网校用户观看历史
  getSchoolUserHistory(params: IScrollUserHistoryRequest) {
    return request.get<IScrollUserHistoryResponse>({
      url: '/admin/s/user_history',
      params
    })
  },
  // 禁止/开启访问
  changeAccess(params: IScrollUserAccessRequest) {
    return request.post<IScrollUserAccessResponse>({
      url: '/admin/s/school_user/updateaccess',
      params
    })
  },
  // 禁止/开启评论
  changeComment(params: IScrollUserCommentRequest) {
    return request.post<IScrollUserCommentResponse>({
      url: '/admin/s/school_user/updatecomment',
      params
    })
  }
}
