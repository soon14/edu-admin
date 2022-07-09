import { IColumn } from '@/components/page-table/types'

export default ({
  handleEdit,
  handleDelete,
  handleToDetailPage
}: {
  handleEdit: any
  handleDelete: any
  handleToDetailPage: any
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
      label: '页面内容',
      prop: 'title'
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
        { name: '装修', type: 'primary', handle: handleToDetailPage },
        { name: '编辑', type: 'primary', handle: handleEdit },
        { name: '删除', type: 'danger', handle: handleDelete }
      ]
    }
  ]
  return columns
}
