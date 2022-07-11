export type statusType = 0 | 1 // 0 移动端   1 pc
type templateType =
  | 'list'
  | 'search'
  | 'swiper'
  | 'icons'
  | 'coupon'
  | 'promotion'
  | 'imageAd'
export interface IRenovationRequest {
  title: string
  ismobile: statusType
}
export interface IRenovationListRequest {
  page: number
  limit: number
  ismobile: statusType
}
export interface IRenovationResponse {}

interface Datum {
  cover: string
  title: string
  desc: string
  price: number
  t_price: number
}
interface Data2 {
  cover: string
  title: string
  b_num: number
  price: number
  t_price: number
}
interface Data3 {
  src: string
  url: string
}
interface Data4 {
  src: string
  name: string
  url: string
}
interface Data5 {
  course_id: number | null
  course_title: string
  src: string
  type: 'webview' | 'course' | ''
  url: string
}
interface Data6 {
  course_id: number | null
  course_title: string
  page_title: string
  page_id: number | null
  src: string
  type: 'webview' | 'course' | ''
  url: string
}
interface More {
  title: string
  url: string
}
export interface Template {
  type: templateType
  data: Datum[] | Data2[] | Data3[] | Data4[] | string | Data5[] | Data6[]
  placeholder?: string
  title?: string
  listType?: 'group' | 'flash' | '' // group 拼团  flash 现实活动
  showMore?: boolean
  more?: More | null
}
export interface IRenovationUpdateRequest {
  id: number | null
  title: string
  ismobile: number
  template: Template[]
}

export interface IRenovationItem {
  id: number
  school_id: number
  title: string
  isdefault: number
  type: string
  ismobile: number
  created_time: string
  updated_time: string
}
export interface IRenovationListResponse {
  total: number
  items: IRenovationItem[]
}
