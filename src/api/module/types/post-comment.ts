export interface ICommentListReq {
  page: number
  limit: number
  post_id: number | null
}
interface IUser {
  id: number
  username: string
  avatar: string
  nickname: string
}

interface IReplyuser {
  avatar: string
  nickname: string
  username: string
}
interface ICommentItem {
  id: number
  school_id: number
  post_id: number
  content: string
  user_id: number
  reply_id: number
  reply_user: IReplyuser
  is_top: number
  created_time: string
  updated_time: string
  userId: number
  user: IUser
}

export interface ICommentListRes {
  total: number
  items: ICommentItem[]
}
export interface ICommentDeleteReq {
  ids: number[]
  post_id: number
}
