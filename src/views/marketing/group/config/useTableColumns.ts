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
      label: '拼团内容',
      slot: 'group_content'
    },
    {
      label: '拼团人数',
      prop: 'p_num',
      width: '100px',
      align: 'center',
      headerAlign: 'center'
    },
    {
      label: '拼团时限(小时)',
      prop: 'expire',
      width: '180px',
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
      btns: [{ name: '编辑', type: 'primary', handle: handleEdit }]
    }
  ]
  return columns
}
