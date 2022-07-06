import { ElTableColumn, ButtonType, ButtonProps } from 'element-plus'
type IElTableColumn = InstanceType<typeof ElTableColumn>
type columnType = 'time' | 'action_btn' | 'index' | 'selection'

interface IBtn {
  name: string
  type?: ButtonType
  size?: ButtonProps['size']
  slot?: string
  handle?: any
}
export interface IColumn extends Partial<IElTableColumn> {
  slot?: string
  prop?: string
  btns?: IBtn[]
  type?: IElTableColumn['type'] & columnType
}
// slot?: string
// prop?: string
// type?: columnType
