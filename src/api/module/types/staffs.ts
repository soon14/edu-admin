export interface IStaffRequest {
  page: number
  limit: number
}

interface IRole {
  id: number
  name: string
}
interface IUser {
  id: number
  username: string
  nickname: string
  avatar: string
}
export interface IStaffItem {
  id: number
  school_id: number
  user_id: number
  iscreator: number
  role_ids: string
  created_time: string
  updated_time: string
  userId: number
  user: IUser
  roles: IRole[]
}

export interface IStaffResponse {
  total: number
  items: IStaffItem
}
export interface IStaffPermissionRequest {
  id: number
  role_ids: number[]
}
