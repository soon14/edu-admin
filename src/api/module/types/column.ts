type statusType = 0 | 1 | '' // 0下架 1上架
type sendType = 0 | 1 | '' // 0连载中 2已完结
export interface IColumnRequest {
  id: number | null | undefined
  title: string
  cover: string
  try: string
  content: string
  price: number
  t_price: number
  status: statusType
  isend: sendType
}
export interface IColumnListRequest {
  page: number
  limit: number
  status?: statusType
  title?: string
}
export interface IColumnListResponse {
  total: number
  items: IColumnRequest[]
}
export interface IColumnDeleteRequest {
  ids: number[]
}
export interface IColumnUpdateStateRequest {
  id: number
  status: statusType
}
export interface IColumnUpdateSendStateRequest {
  id: number
  isend: sendType
}
export interface IColumnDescResponse {
  id: number
  title: string
  cover: string
  try: string
  content: string
  price: string
  t_price: string
  school_id: number
  status: statusType
  isend: sendType
  sub_count: number
  created_time: string
  updated_time: string
}
