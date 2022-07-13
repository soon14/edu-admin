type isfreeType = 0 | 1 // 0否  1是
export interface IBookDetailListReq {
  page: number
  limit: number
  book_id: number
}
export interface IBookDetailItem {
  id: number | null
  title: string
  content: string
  isfree: isfreeType
  orderby: number
  editing?: boolean
}
export interface IBookDetailListRes {
  total: number
  items: IBookDetailItem[]
}
export interface IBookDetailCreateReq {
  book_id: number
  title: string
  isfree: isfreeType
}
export interface IBookDetailUpdateReq {
  id: number
  book_id: number
  title: string
  content: string
  isfree: isfreeType
}
export interface IBookDetailDeleteReq {
  ids: number[]
  book_id: number
}
export interface IBookDetailSortReq {
  ids: number[]
  book_id: number
}
