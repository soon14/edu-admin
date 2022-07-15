type answerStatusType = 0 | 1 | '' // 回答状态：0否1是
type readStatusType = 0 | 1 | '' // 阅卷状态：0否1是

export interface ITestListReq {
  page: number
  limit: number
  answer_status: answerStatusType
  read_status: readStatusType
}
interface Testpaper {
  id: number | null
  title: string
}
interface User {
  id: number | null
  username: string
  nickname: string
}

export interface ITestItem {
  id: number | null
  answer_status: number
  read_status: number
  score: number
  created_time: string
  testpaper: Testpaper
  user: User
}

export interface ITestListRes {
  total: number
  items: ITestItem[]
}
export interface ITestDeleteReq {
  ids: number[]
}
export interface IValue {
  type: string
  answer: any[]
  score: number
}

interface Value {
  options: string[]
}
interface Question {
  id: number | null
  title: string
  remark: string
  type: string
  value: Value
}

interface question {
  score: number
  question: Question
}

export interface ITestInfoRes {
  id: number | null
  score: number
  values: IValue[]
  testpaper: {
    id: number | null
    title: string
  }
  questions: question[]
}

export interface ITestUpdateStateReq {
  id: number | null
  scores: number[] // 每个题目的分数
}
