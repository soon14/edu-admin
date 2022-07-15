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
  ITestListReq,
  ITestListRes,
  ITestDeleteReq,
  ITestInfoRes,
  ITestUpdateStateReq
} from './types/user-test'

export default {
  // 考试列表
  [LIST_API](params: ITestListReq) {
    return request.get<ITestListRes>({
      url: '/admin/s/user_test',
      params
    })
  },
  // 删除考试
  [DELETE_API](data: ITestDeleteReq) {
    return request.post({
      url: '/admin/s/user_test/delete',
      data
    })
  },
  // 查看考试详情
  [INFO_API](id: number) {
    return request.get<ITestInfoRes>({
      url: '/admin/s/user_test/read',
      params: { id }
    })
  },
  // 考试阅卷
  [UPDATE_STATE_API](data: ITestUpdateStateReq) {
    return request.post({
      url: '/admin/s/user_test/update_readstatus',
      data
    })
  }
}
