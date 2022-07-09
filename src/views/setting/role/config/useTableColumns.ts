import { IColumn } from '@/components/page-table/types'

export default ({
  handleEdit,
  handleDelete,
  handleRoleManage
}: {
  handleEdit: any
  handleDelete: any
  handleRoleManage: any
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
      label: '角色名称',
      prop: 'name',
      width: '100px',
      align: 'center',
      headerAlign: 'center'
    },
    {
      label: '角色key',
      prop: 'role_id',
      width: '100px',
      align: 'center',
      headerAlign: 'center'
    },
    {
      label: '角色描述',
      prop: 'desc',
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
        { name: '修改角色', type: 'primary', handle: handleEdit },
        { name: '权限管理', type: 'primary', handle: handleRoleManage },
        { name: '删除', type: 'danger', handle: handleDelete }
      ]
    }
  ]
  return columns
}
