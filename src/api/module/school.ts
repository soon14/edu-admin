import {
  CREATE_API,
  DELETE_API,
  INFO_API,
  LIST_API,
  UPDATE_API
} from '@/constants/fetch'
import request from '@/utils/axios'
import {
  ISchoolInfo,
  ISchoolListRequest,
  ISchoolListResponse,
  ISchoolItem
} from './types/school'

export default {
  // 查看当前网校信息
  [INFO_API](id: number) {
    return request.get<ISchoolInfo>({
      url: '/admin/s/school/read',
      params: { id }
    })
  },
  // 我的网校列表
  [LIST_API](params: ISchoolListRequest) {
    return request.get<ISchoolListResponse>({
      url: '/admin/school',
      params
    })
  },
  // 创建网校
  [CREATE_API](name: string) {
    return request.post<ISchoolItem>({
      url: '/admin/school/save',
      data: { name }
    })
  },
  // 更新网校信息
  [UPDATE_API](data: { id: number; name: string }) {
    return request.post({
      url: '/admin/s/school/update',
      data
    })
  }
}
