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
  IQuestionListReq,
  IQuestionListRes,
  IQuestionCreateReq,
  IQuestionUpdateReq,
  IQuestionDeleteReq
} from './types/question'

export default {
  // 题目列表
  [LIST_API](params: IQuestionListReq) {
    return request.get<IQuestionListRes>({
      url: '/admin/s/question',
      params
    })
  },
  // 新增题目
  [CREATE_API](data: IQuestionCreateReq) {
    return request.post({
      url: '/admin/s/question/save',
      data
    })
  },
  // 更新题目
  [UPDATE_API](data: IQuestionUpdateReq) {
    return request.post({
      url: '/admin/s/question/update',
      data
    })
  },
  // 删除题目
  [DELETE_API](data: IQuestionDeleteReq) {
    return request.post({
      url: '/admin/s/question/delete',
      data
    })
  }
}
