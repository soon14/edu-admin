type ICouponStateType = 0 | 1 // 0 禁用   1 启用

export interface ICouponRequest {
  page: number
  limit: number
  status: ICouponStateType
}
interface ICouponValue {
  id: number | null
  title: string
  cover: string
  price: number
  type: string | null
}
export interface ICoupon {
  id: number
  school_id: number
  type: 'course' | 'column'
  goods_id: number | null
  condition: number
  price: number
  c_num: number
  received_num: number
  used_num: number
  status: ICouponStateType
  start_time: string
  end_time: string
  created_time: string
  updated_time: string
  value: ICouponValue
}
export interface ICouponResponse {
  total: number
  items: ICoupon[]
}
export interface ICouponUpdateRequest {
  id: string
  status: ICouponStateType
}
