type roleStateType = '0' | '1' // 0禁用  1启用
export interface IRoleRequest {
  page: number
  limit?: number
}
export interface IRoleItem {
  id: number
  name: string
  role_id: string
  desc: string
  status: number
  created_time: string
  updated_time: string
  menus: string[]
  accesses: string[]
}
export interface IRoleResponse {
  total: number
  items: IRoleItem[]
}
export interface IRoleCreateRequest {
  id?: null | string | number
  name: string
  role_id: string
  status: roleStateType
  desc: string
}

interface Child {
  id: number
  title: string
  access_id: number
  children: any[]
}
interface Menu {
  id: number
  title: string
  access_id: number
  children: Child[]
}

export interface IRoleInfoResponse {
  id: number | null
  name: string
  role_id: string | null
  desc: string
  status: number
  created_time: string
  updated_time: string
  menus: Menu[]
  accesses: any[]
  menusId: number[]
  accessesId: any[]
}
export interface ISetRoleRequest {
  role_id: number
  access_ids: any[]
}
