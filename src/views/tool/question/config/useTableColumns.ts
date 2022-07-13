import { IColumn } from '@/components/page-table/types'

export default ({
  handleEdit,
  handleDelete
}: {
  handleEdit: any
  handleDelete: any
}) => {
  const columns: IColumn[] = [
    {
      type: 'selection'
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
    },
    {
      label: '',
      type: 'action_btn',
      fixed: 'right',
      align: 'center',
      headerAlign: 'center',
      btns: [
        { name: '编辑', type: 'primary', handle: handleEdit },
        { name: '删除', type: 'danger', handle: handleDelete }
      ]
    }
  ]
  return columns
}
