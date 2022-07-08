export interface ICashconfirmRequest {
  page: number
  limit: number
}

export interface ICashconfirm {
  id: number
  price: string
  status: number
  name: string
  account: string
  created_time: Date
}
export interface ICashconfirmResponse {
  total: number
  items: ICashconfirm[]
}
export interface IGetCashRequest {
  cash_id: number | ''
  price: number
}
export interface IGetCashResponse {
  status: number
  id: number
  cash_id: number
  price: number
  school_id: number
  updated_time: string
  created_time: string
  cashId: number
}
