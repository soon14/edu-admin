import { IColumn } from '@/components/page-table/types'
export default () => {
  const columns: IColumn[] = [
    {
      type: 'selection',
      width: '100px',
      align: 'center',
      headerAlign: 'center'
    },
    {
      label: '#',
      type: 'index',
      width: '100px',
      align: 'center',
      headerAlign: 'center'
    },
    {
      label: '单品内容',
      slot: 'media'
    },
    {
      label: '状态',
      slot: 'status',
      align: 'center',
      headerAlign: 'center'
    }
  ]
  return columns
}
