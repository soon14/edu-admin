import { IColumn } from '@/components/page-table/types'
export default () => {
  const columns: IColumn[] = [
    {
      type: 'selection',
      // width: '100px',
      align: 'center',
      headerAlign: 'center'
    },
    {
      label: '用户',
      slot: 'user'
    }
  ]
  return columns
}
