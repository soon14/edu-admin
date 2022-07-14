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
      label: '#',
      prop: 'custom_index',
      width: '50px',
      align: 'center',
      headerAlign: 'center'
    },
    {
      label: '题目',
      slot: 'title'
    },
    {
      label: '类型',
      slot: 'type',
      width: '200px',
      align: 'center',
      headerAlign: 'center'
    },
    {
      label: '创建时间',
      prop: 'created_time',
      type: 'time',
      width: '200px',
      align: 'center',
      headerAlign: 'center'
    }
  ]
  return columns
}
