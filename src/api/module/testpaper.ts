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
  ITestCreateReq,
  ITestUpdateReq,
  ITestListReq,
  ITestListRes,
  ITestInfoRes,
  ITestDeleteReq
} from './types/testpaper'

export default {
  // 新增试卷
  [CREATE_API](data: ITestCreateReq) {
    return request.post({
      url: '/admin/s/testpaper/save',
      data
    })
  },
  // 更新试卷
  [UPDATE_API](data: ITestUpdateReq) {
    return request.post({
      url: '/admin/s/testpaper/update',
      data
    })
  },
  // 试卷列表
  [LIST_API](params: ITestListReq) {
    return request.get<ITestListRes>({
      url: '/admin/s/testpaper',
      params
    })
  },
  // 查看试卷详情
  [INFO_API](id: number) {
    return request.get<ITestInfoRes>({
      url: '/admin/s/testpaper/read',
      params: { id }
    })
  },
  // 删除试卷
  [DELETE_API](data: ITestDeleteReq) {
    return request.post({
      url: '/admin/s/testpaper/delete',
      data
    })
  }
}
