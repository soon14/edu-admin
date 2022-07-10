import { IColumn } from '@/components/page-table/types'
export default () => {
  const columns: IColumn[] = [
    {
      label: '#',
      type: 'index',
      width: '100px',
      align: 'center',
      headerAlign: 'center'
    },
    {
      label: '页面',
      prop: 'title',
      width: '300px'
    },
    {
      label: '类型',
      slot: 'type'
    }
  ]
  return columns
}
