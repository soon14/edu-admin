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
