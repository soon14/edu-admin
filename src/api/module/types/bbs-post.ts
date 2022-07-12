type isTopStateType = 0 | 1 // 0 是    1 否
export interface IPostListReq {
  page: number
  limit: number
  bbs_id: number | null
}
interface IUser {
  id: number
  username: string
  avatar: string
  nickname: string
}

interface IContent {
  images: string[]
  text: string
}
export interface IPostItem {
  id: number
  bbs_id: number
  content: IContent[]
  user_id: number
  comment_count: number
  support_count: number
  is_top: number
  created_time: string
  updated_time: string
  userId: number
  user: IUser
}

export interface IPostListRes {
  total: number
  items: IPostItem[]
}
export interface IPostTopReq {
  id: number
  is_top: isTopStateType
}

export interface IPostDeleteReq {
  ids: number[]
  bbs_id: number
}
