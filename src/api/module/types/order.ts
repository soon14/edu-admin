export type PayType = 'pendding' | 'success' | 'fail' | ''
export interface IOrderRequest {
  page: number
  status: PayType
  no: string
  limit?: number
}
type GoodType = {
  title: string
}
export type IOrder = {
  id: number
  school_id: number
  user_id: number
  no: string
  status: string
  price: string
  total_price: string
  type: string
  pay_method?: any
  pay_time?: any
  created_time: string
  updated_time: string
  goods: GoodType[]
  title: string
}
export interface IOrderResponse {
  total: number
  items: IOrder[]
}
export interface IDelateOrderRequest {
  ids: any[]
}
