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
  IPostListReq,
  IPostListRes,
  IPostTopReq,
  IPostDeleteReq
} from './types/bbs-post'

export default {
  // 社区列表
  [LIST_API](params: IPostListReq) {
    return request.get<IPostListRes>({
      url: '/admin/s/post',
      params
    })
  },
  // 取消/置顶帖子
  [UPDATE_STATE_API](data: IPostTopReq) {
    return request.post({
      url: '/admin/s/post/updateistop',
      data
    })
  },
  // 删除帖子
  [DELETE_API](data: IPostDeleteReq) {
    return request.post({
      url: '/admin/s/post/delete',
      data
    })
  }
}
