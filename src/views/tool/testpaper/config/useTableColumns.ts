import { IColumn } from '@/components/page-table/types'

export default ({
  handleToPage,
  handleDelete
}: {
  handleToPage: any
  handleDelete: any
}) => {
  const columns: IColumn[] = [
    {
      label: '#',
      prop: 'custom_index',
      width: '100px',
      align: 'center',
      headerAlign: 'center'
    },
    {
      label: '试卷标题',
      prop: 'title'
    },
    {
      label: '是否公开',
      slot: 'status',
      width: '100px',
      align: 'center',
      headerAlign: 'center'
    },
    {
      label: '总分',
      prop: 'total_score',
      width: '100px',
      align: 'center',
      headerAlign: 'center'
    },
    {
      label: '及格分',
      prop: 'pass_score',
      width: '100px',
      align: 'center',
      headerAlign: 'center'
    },
    {
      label: '时长(分钟)',
      prop: 'expire',
      width: '100px',
      align: 'center',
      headerAlign: 'center'
    },
    {
      label: '',
      type: 'action_btn',
      fixed: 'right',
      align: 'center',
      headerAlign: 'center',
      btns: [
        { name: '组卷', type: 'primary', handle: handleToPage },
        { name: '删除', type: 'danger', handle: handleDelete }
      ]
    }
  ]
  return columns
}
