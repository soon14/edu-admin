import { ElTableColumn } from 'element-plus'
type IElTableColumn = InstanceType<typeof ElTableColumn>
type columnType = 'time' | 'action_btn'

export interface IColumn extends Partial<IElTableColumn> {
  slot?: string
  prop?: string
  btns?: any[]
  type?: IElTableColumn['type'] & columnType
}
// slot?: string
// prop?: string
// type?: columnType
