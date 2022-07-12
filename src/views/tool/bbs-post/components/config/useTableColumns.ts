import { IColumn } from '@/components/page-table/types'

export default ({ handleDelete }: { handleDelete: any }) => {
  const columns: IColumn[] = [
    {
      label: '#',
      prop: 'custom_index',
      width: '100px',
      align: 'center',
      headerAlign: 'center'
    },
    {
      label: '回复内容',
      slot: 'content'
    },
    {
      label: '用户',
      slot: 'user',
      width: '200px',
      align: 'center',
      headerAlign: 'center'
    },

    {
      label: '回复时间',
      prop: 'created_time',
      type: 'time',
      width: '200px',
      align: 'center',
      headerAlign: 'center'
    },
    {
      type: 'action_btn',
      align: 'center',
      btns: [
        { name: '删除', type: 'danger', size: 'small', handle: handleDelete }
      ]
    }
  ]
  return columns
}
