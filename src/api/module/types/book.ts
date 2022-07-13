type statusType = 0 | 1 | '' // 0禁用  1启用
export interface IBookCreateReq {
  title: string
  cover: string
  try: string
  price: number
  t_price: number
  status: statusType
}
export interface IBookUpdateReq {
  id: number | null
  title: string
  cover: string
  try: string
  price: number
  t_price: number
  status: statusType
}
export interface IBookListReq {
  page: number
  limit: number
  status: statusType
  keyword: string
}
export interface IBook {
  id: number | null
  school_id: number
  title: string
  cover: string
  try: string
  price: string
  t_price: string
  status: statusType
  sub_count: number
  is_single: number
  created_time: string
  updated_time: string
}
export interface IBookListRes {
  total: number | null
  items: IBook[]
}
export interface IBookStateReq {
  id: number
  status: statusType
}
