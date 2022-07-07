import { courseType } from './course'

export type IOrderType = 'course' | 'column' // 课程, 专栏
export type ICommentType = 0 | 1 // 0: 否 1:是
export interface IUser {
  id: number
  username: string
  nickname: string
  avatar: string
  status?: number
}
export interface ISchoolUser {
  id: number
  school_id: number
  user_id: number
  no_comment: number
  no_access: number
  total_consume: string
  created_time: string
  updated_time: string
  userId: number
  user: IUser
  accessLoading?: boolean
  commentLoading?: boolean
}
export interface ISchoolUserRequest {
  page: number
  limit?: number
  keyword?: string
}
export interface ISchoolUserResponse {
  total: number
  items: ISchoolUser[]
}
export interface IScrollUserSub {
  created_time: string
  id: number
  price: string
  title: string
  type: courseType
  comment: string
  comment_time: string
}
export interface IScrollUserSubRequest {
  page: number
  user_id: number
  type?: IOrderType
  comment?: ICommentType
}
export interface IScrollUserSubResponse {
  total: number
  items: IScrollUserSub[]
}
export type IGood = {
  title: string
  type: courseType
}
export interface IScrollUserOrder {
  id: number
  school_id?: number
  user_id: number
  no: string
  status: string
  price: string
  total_price: string
  type: string
  pay_method: any
  pay_time: any
  created_time: string
  updated_time: string
  goods: IGood[]
  title: string
}
export interface IScrollUserOrderRequest {
  page: number
  user_id: number
}
export interface IScrollUserOrderResponse {
  total: number
  items: IScrollUserOrder[]
}
export interface IHistory {
  id: number
  title: string
  total_time: string
  type: '已删除' | courseType
}
export interface IScrollUserHistoryRequest {
  page: number
  user_id: number
}
export interface IScrollUserHistoryResponse {
  total: number
  items: IHistory[]
}

export type accessType = 0 | 1 // 0:否 1:是
export type commentType = 0 | 1 // 0:否 1:是
export interface IScrollUserAccessRequest {
  id: number // school_user表的id
  no_access: accessType
}
export interface IScrollUserAccessResponse {
  id: number
  school_id: number
  user_id: number
  no_comment: commentType
  no_access: accessType
  total_consume: string
  created_time: string
  updated_time: string
  userId: number
}

export interface IScrollUserCommentRequest {
  id: number
  no_comment: commentType
}
export interface IScrollUserCommentResponse {
  id: number
  school_id: number
  user_id: number
  no_comment: commentType
  no_access: number
  total_consume: string
  created_time: string
  updated_time: string
  userId: number
}
