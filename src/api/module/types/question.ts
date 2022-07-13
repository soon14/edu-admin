// 题目类型：radio单选，checkbox多选，trueOrfalse判断，answer问答，completion填空
export type questionType =
  | 'radio'
  | 'checkbox'
  | 'trueOrfalse'
  | 'answer'
  | 'completion'
  | ''
export interface IQuestionListReq {
  page: number
  limit: number
  type: ''
  title: string
}

export interface IValue {
  options: string[]
  value: number | null
}

export interface IQuestionItem {
  id: number | null
  school_id: number
  title: string
  remark: string
  type: questionType
  value: IValue
  created_time: string
  updated_time: string
}

export interface IQuestionListRes {
  total: number
  items: IQuestionItem[]
}
export interface IQuestionCreateReq {
  title: string
  remark: string
  type: questionType
  value: IValue
}
export interface IQuestionUpdateReq {
  id: number | null
  title: string
  remark: string
  type: questionType
  value: IValue
}
export interface IQuestionDeleteReq {
  ids: number[]
}
