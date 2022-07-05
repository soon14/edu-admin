import { IColumn } from '@/components/page-table/types'
export default ({
  handleEdit,
  handleDelete,
  handleToPage
}: {
  handleEdit: any
  handleDelete: any
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
      label: '专栏内容',
      slot: 'media'
    },
    {
      label: '更新状态',
      slot: 'isend',
      width: '100px',
      align: 'center',
      headerAlign: 'center'
    },
    {
      label: '订阅量',
      prop: 'sub_count',
      width: '100px',
      align: 'center',
      headerAlign: 'center'
    },
    {
      label: '状态',
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
        {
          name: '目录',
          type: 'primary',
          handle: handleToPage
        },
        { name: '编辑', type: 'primary', handle: handleEdit },
        { name: '删除', type: 'danger', handle: handleDelete }
      ]
    }
  ]
  return columns
}
