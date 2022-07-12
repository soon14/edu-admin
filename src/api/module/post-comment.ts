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
  ICommentListReq,
  ICommentListRes,
  ICommentDeleteReq
} from './types/post-comment'

export default {
  // 帖子评论列表
  [LIST_API](params: ICommentListReq) {
    return request.get<ICommentListRes>({
      url: '/admin/s/post_comment',
      params
    })
  },
  // 删除评论
  [DELETE_API](data: ICommentDeleteReq) {
    return request.post({
      url: '/admin/s/post_comment/delete',
      data
    })
  }
}
