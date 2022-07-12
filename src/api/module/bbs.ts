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
  IBbsCreateReq,
  IBbsUpdateReq,
  IBbsListReq,
  IBbsListRes,
  IBbsUpdateStateReq,
  IBbsSetManagerReq
} from './types/bbs'

export default {
  // 新增社区
  [CREATE_API](data: IBbsCreateReq) {
    return request.post({
      url: '/admin/s/bbs/save',
      data
    })
  },
  // 更新社区
  [UPDATE_API](data: IBbsUpdateReq) {
    return request.post({
      url: '/admin/s/bbs/update',
      data
    })
  },
  // 删除社区
  [DELETE_API](data: { ids: any[] }) {
    return request.post({
      url: '/admin/s/bbs/delete',
      data
    })
  },
  // 社区列表
  [LIST_API](params: IBbsListReq) {
    return request.get<IBbsListRes>({
      url: '/admin/s/bbs',
      params
    })
  },
  // 显示/隐藏社区
  [UPDATE_STATE_API](data: IBbsUpdateStateReq) {
    return request.post({
      url: '/admin/s/bbs/updatestatus',
      data
    })
  },
  // 给社区分配管理员
  setBbsManager(data: IBbsSetManagerReq) {
    return request.post({
      url: '/admin/s/bbs/setmanagers',
      data
    })
  }
}
