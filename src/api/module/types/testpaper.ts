import { questionType } from './question'

type testStatusType = 0 | 1 // 状态：0禁用1启用
export interface IQuestion {
  score: number
  question_id: number | null
  question: {
    id: number | null
    title: string
    remark: string
    type: questionType
    value: {
      options: string[]
      value: number[] | number
    }
  }
}
export interface ITestCreateReq {
  title: string
  total_score: number
  pass_score: number // 及格分
  expire: number // 	考试时间
  status: testStatusType
  questions: IQuestion // 题目列表
}
export interface ITestUpdateReq {
  id: number | null
  title: string
  total_score: number
  pass_score: number
  expire: number
  status: testStatusType
  questions: IQuestion | null // 题目列表
}

export interface ITestListReq {
  page: number
  limit: number
  title: string
}

export interface ITestItem {
  id: number | null
  school_id: number
  title: string
  total_score: number
  pass_score: number
  expire: number
  status: testStatusType
  created_time: string
  updated_time: string
}

export interface ITestListRes {
  total: number
  items: ITestItem[]
}

export interface ITestInfoRes {
  id: number | null
  title: string
  total_score: number
  pass_score: number
  expire: number
  status: testStatusType
  questions: IQuestion[] | null
}
export interface ITestDeleteReq {
  ids: number[]
}
