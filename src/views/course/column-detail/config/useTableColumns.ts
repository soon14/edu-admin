import { IColumn } from '@/components/page-table/types'
export default ({ handleDelete }: { handleDelete: any }) => {
  const columns: IColumn[] = [
    {
      label: '#',
      type: 'index',
      width: '50px',
      align: 'center',
      headerAlign: 'center'
    },
    {
      label: '单品内容',
      slot: 'media'
    },
    {
      label: '类型',
      width: '100px',
      align: 'center',
      headerAlign: 'center',
      slot: 'type'
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
      label: '',
      type: 'action_btn',
      fixed: 'right',
      align: 'center',
      headerAlign: 'center',
      btns: [{ name: '删除', type: 'danger', handle: handleDelete }]
    }
  ]
  return columns
}
