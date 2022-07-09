import { IColumn } from '@/components/page-table/types'

export default ({ handleEdit }: { handleEdit: any }) => {
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
      label: '角色',
      slot: 'roles',
      width: '320px',
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
      btns: [{ name: '编辑', type: 'primary', handle: handleEdit }]
    }
  ]
  return columns
}
