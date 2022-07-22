import { IColumn } from '@/components/page-table/types'

export default ({ handleToDetailPage }: { handleToDetailPage: any }) => {
  const columns: IColumn[] = [
    {
      label: '#',
      prop: 'custom_index',
      width: '100px',
      align: 'center',
      headerAlign: 'center'
    },
    {
      label: '用户',
      slot: 'user'
    },

    {
      label: '消费总额',
      prop: 'total_consume',
      width: '100px',
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
    },
    {
      label: '评论',
      slot: 'comment',
      width: '80px',
      align: 'center',
      headerAlign: 'center'
    },
    {
      label: '访问',
      slot: 'access',
      width: '80px',
      align: 'center',
      headerAlign: 'center'
    },
    {
      label: '',
      type: 'action_btn',
      fixed: 'right',
      align: 'center',
      headerAlign: 'center',
      width: '80px',
      btns: [{ name: '详情', type: 'primary', handle: handleToDetailPage }]
    }
  ]
  return columns
}
