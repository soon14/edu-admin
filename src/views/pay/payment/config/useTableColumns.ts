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
      label: '#',
      prop: 'custom_index',
      width: '100px',
      align: 'center',
      headerAlign: 'center'
    },
    {
      label: '账号',
      prop: 'account',
      width: '220px'
    },
    {
      label: '开户人',
      prop: 'name',
      width: '100px'
    },
    {
      label: '开户行',
      prop: 'bank',
      width: '220px'
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
