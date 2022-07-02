export type courseType = 'media' | 'audio' | 'video'
export type courseStatusType = 0 | 1 | ''
export interface ICourseRequest {
  title: string
  cover: string
  try: string
  content: string
  price: number
  t_price: number
  type: courseType
  status: courseStatusType
}
export interface ICourseResponse {
  sub_count: number
  is_single: number
  id: number
  title: string
  cover: string
  try: string
  content: string
  price: number
  t_price: number
  type: courseType
  status: courseStatusType
  school_id: string
  updated_time: string
  created_time: string
}
export interface ICourseListRequest {
  page: number
  limit: number
  type: courseType
  status?: courseStatusType
  title?: string
}
export interface ICourseListResponse {
  total: number
  items: ICourseResponse[]
}
export interface ICourseDeleteRequest {
  ids: number[]
}
export interface ICourseUpdateStateRequest {
  ids: number
  status: courseStatusType
}
