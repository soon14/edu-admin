type CashStatusType = 0 | 1 | '' //  0 :禁用 1:启用
export interface ICashRequest {
  page: number
  limit: number
  status: CashStatusType
}
export interface ICash {
  id: number | null
  school_id: number
  account: string
  province: string
  city: string
  area: string
  path: string
  bank: string
  name: string
  status: CashStatusType
  created_time: string
  updated_time: string
}
export interface ICashResponse {
  total: number
  items: ICash[]
}
export interface ICashUpdateRequest {
  id: number
  account: string
  province: string
  city: string
  area: string
  path: string
  bank: string
  name: string
  status: CashStatusType
}
