import { IColumn } from '@/components/page-table/types'

export default ({
  handleEdit,
  handleDelete,
  handleSetManager,
  handleToPage
}: {
  handleEdit: any
  handleDelete: any
  handleSetManager: any
  handleToPage: any
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
      label: '社区名称',
      prop: 'title',
      width: '440px'
    },
    {
      label: '管理员',
      slot: 'manager'
    },
    {
      label: '显示状态',
      slot: 'status',
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
      label: '',
      type: 'action_btn',
      fixed: 'right',
      align: 'center',
      headerAlign: 'center',
      btns: [
        { name: '评论', type: 'primary', handle: handleToPage },
        { name: '管理员', type: 'primary', handle: handleSetManager },
        { name: '编辑', type: 'primary', handle: handleEdit },
        { name: '删除', type: 'danger', handle: handleDelete }
      ]
    }
  ]
  return columns
}
