import { CREATE_API, DELETE_API, LIST_API, UPDATE_API } from '@/constants/fetch'
import request from '@/utils/axios'
import {
  IStaffRequest,
  IStaffResponse,
  IStaffPermissionRequest
} from './types/staffs'

export default {
  // 员工列表
  [LIST_API](params: IStaffRequest) {
    return request.get<IStaffResponse>({
      url: '/admin/s/schoolstaff',
      params
    })
  },
  // 创建员工
  [CREATE_API](keyword: string) {
    return request.post<IStaffResponse>({
      url: '/admin/s/schoolstaff/save',
      data: { keyword }
    })
  },
  // 删除员工
  [DELETE_API](staff_id: number) {
    return request.post({
      url: '/admin/s/schoolstaff/save',
      data: { staff_id }
    })
  },
  // 给员工配置权限
  setPermission(staff_id: IStaffPermissionRequest) {
    return request.post({
      url: '/admin/s/schoolstaff/setroles',
      data: staff_id
    })
  }
}
