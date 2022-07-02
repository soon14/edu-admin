import { ApiEnum } from '@/constants/fetch'
import request from '@/utils/axios'
import {
  ICourseListRequest,
  ICourseListResponse,
  ICourseRequest,
  ICourseResponse,
  ICourseDeleteRequest,
  ICourseUpdateStateRequest
} from './types/course'

export default {
  // 创建课程
  [ApiEnum.CREATE_API](data: ICourseRequest) {
    return request.post<ICourseResponse>({
      url: '/admin/s/course/save',
      data
    })
  },
  // 更新课程
  [ApiEnum.UPDATE_API](data: ICourseRequest) {
    return request.post<ICourseResponse>({
      url: '/admin/s/course/update',
      data
    })
  },
  // 课程列表
  [ApiEnum.LIST_API](params: ICourseListRequest) {
    return request.get<ICourseListResponse>({
      url: '/admin/s/course',
      params
    })
  },
  // 删除课程
  [ApiEnum.DELETE_API](data: ICourseDeleteRequest) {
    return request.post({
      url: '/admin/s/course/delete',
      data
    })
  },
  // 上架/下架课程
  [ApiEnum.UPDATE_STATE_API](data: ICourseUpdateStateRequest) {
    return request.post<ICourseResponse>({
      url: '/admin/s/course/updatestatus',
      data
    })
  }
}

// export const aaa = (params: ICourseListRequest) => {
//   return request.get<ICourseListResponse>({
//     url: '/admin/s/course',
//     params
//   })
// }
// export default {
//   aaa
// }
