type IFlashsaleStateType = 0 | 1 // 0 禁用   1 启用

export interface IFlashsaleRequest {
  page: number
  limit: number
  status: IFlashsaleStateType
}
interface IFlashsaleValue {
  id: number | null
  title: string
  cover: string
  price: number
  type: string | null
}
export interface IFlashsale {
  id: number
  school_id: number
  type: 'course' | 'column'
  goods_id: number | null
  price: number
  s_num: number
  used_num: number
  status: IFlashsaleStateType
  start_time: string
  end_time: string
  created_time: string
  updated_time: string
  value: IFlashsaleValue
}
export interface IFlashsaleResponse {
  total: number
  items: IFlashsale[]
}
export interface IFlashsaleUpdateRequest {
  id: string
  status: IFlashsaleStateType
}
