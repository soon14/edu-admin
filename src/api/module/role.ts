import {
  CREATE_API,
  DELETE_API,
  INFO_API,
  LIST_API,
  UPDATE_API
} from '@/constants/fetch'
import {
  IRoleRequest,
  IRoleResponse,
  IRoleInfoResponse,
  IRoleCreateRequest,
  ISetRoleRequest
} from './types/role'
import request from '@/utils/axios'

export default {
  // 角色列表
  [LIST_API](params: IRoleRequest) {
    return request.get<IRoleResponse>({
      url: '/admin/role',
      params
    })
  },
  // 查看角色权限
  [INFO_API](id: number | string) {
    return request.get<IRoleInfoResponse>({
      url: '/platform/role/read',
      params: { id }
    })
  },
  // 新增角色
  [CREATE_API](data: IRoleCreateRequest) {
    return request.post({
      url: '/platform/role/save',
      data
    })
  },
  // 修改角色
  [UPDATE_API](data: IRoleCreateRequest) {
    return request.post({
      url: '/platform/role/update',
      data
    })
  },
  // 删除角色
  [DELETE_API](data: { ids: number[] }) {
    return request.post({
      url: '/platform/role/delete',
      data
    })
  },
  // 权限/菜单列表
  getRoleAndMenuList(type: 'rule' | 'menu') {
    return request.get({
      url: '/platform/access',
      params: { type }
    })
  },
  // 权限/菜单列表
  setRoleApi(data: ISetRoleRequest) {
    return request.post({
      url: '/platform/role/setrules',
      data
    })
  }
}
