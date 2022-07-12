type statusType = 0 | 1 // 0 禁用   1 启用
export interface IBbsCreateReq {
  title: string
  status: number
}
export interface IBbsUpdateReq {
  id: number | null
  title: string
  status: number
}
export interface IBbsListReq {
  page: number
  limit: number
}

interface IBbsManager {
  id: number
  bbs_id: number
  user_id: number
  created_time: string
  updated_time: string
  userId: number
}
interface IManagers {
  id: number
  username: string
  avatar: string
  nickname: string
  bbs_manager: IBbsManager
}

export interface IBbsItem {
  id: number | null
  school_id: number
  title: string
  status: number
  created_time: string
  updated_time: string
  managers: IManagers[]
}
export interface IBbsListRes {
  total: number
  items: IBbsItem[]
}
export interface IBbsUpdateStateReq {
  id: number | null
  status: statusType
}
export interface IBbsSetManagerReq {
  id: number | null // 社区id
  user_ids: number[] // 用户id
}
