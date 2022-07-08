type IGroupStateType = 0 | 1 // 0 禁用   1 启用

export interface IGroupRequest {
  page: number
  limit: number
}
interface IGroupValue {
  id: number | null
  title: string
  cover: string
  price: number
  type: string | null
}
export interface IGroup {
  id: number
  school_id: number
  type: 'course' | 'column'
  goods_id: number | null
  price: number
  p_num: number
  auto: number
  expire: number
  status: IGroupStateType
  start_time: string
  end_time: string
  created_time: string
  updated_time: string
  value: IGroupValue
}
export interface IGroupResponse {
  total: number
  items: IGroup[]
}
export interface IGroupUpdateRequest {
  id: string
  status: IGroupStateType
}
