interface User {
  email: string
  phone: string
  id: number
  username: string
  nickname: string
}
export interface ISchoolInfo {
  id: number
  name: string
  level_id: number
  level_last_time?: any
  user_id: number
  balance: string
  w_balance: string
  t_balance: string
  appid: string
  status: number
  created_time: string
  updated_time: string
  userId: number
  user: User
  weburl: string
}
export interface ISchoolListRequest {
  page: number
  limit: number
}

export interface ISchoolItem {
  id: number
  name: string
  level_id: number
  level_last_time?: any
  user_id: number
  balance: string
  w_balance: string
  t_balance: string
  appid: string
  status: number
  created_time: string
  updated_time: string
  userId: number
}
export interface ISchoolListResponse {
  limit: number
  items: ISchoolItem[]
}
