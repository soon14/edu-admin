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
      label: '帖子内容',
      slot: 'post'
    },
    {
      label: '用户',
      slot: 'user',
      width: '200px',
      align: 'center',
      headerAlign: 'center'
    },

    {
      label: '点赞数',
      prop: 'support_count',
      width: '100px',
      align: 'center',
      headerAlign: 'center'
    },
    {
      label: '评论数',
      prop: 'comment_count',
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
      label: '置顶',
      slot: 'top',
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
        { name: '查看回复', type: 'primary', handle: handleEdit },
        { name: '删除', type: 'danger', handle: handleDelete }
      ]
    }
  ]
  return columns
}
