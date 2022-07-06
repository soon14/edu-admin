import { courseType } from './course'

type statusType = 0 | 1 // 0下架 1上架
type sendType = 0 | 1 // 0连载中 2已完结
export interface IColumnContentsRequest {
  column_id: number | null
  course_id: number | null
}
export interface IColumnContentsSortRequest {
  ids: number[]
  column_id: number
}
export interface IColumnContentsDeleteRequest {
  ids: number[]
  course_id: number
}
export interface IColumnContentsListRequest {
  column_id: number
  page: number
}
export interface IColumnContent {
  course_id: 8
  title: string
  cover: string
  price: string
  t_price: string
  status: statusType
  type: courseType
  id: number
  sub_count: number
  orderby: number
}
export interface IColumnContentsListResponse {
  total: number
  items: IColumnContent[]
}
