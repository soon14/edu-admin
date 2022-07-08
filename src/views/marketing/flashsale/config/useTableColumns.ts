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
      label: '秒杀内容',
      slot: 'flashale_content'
    },
    {
      label: '限制人数',
      prop: 's_num',
      width: '100px',
      align: 'center',
      headerAlign: 'center'
    },
    {
      label: '已使用人数',
      prop: 'used_num',
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
      btns: [{ name: '编辑', type: 'primary', handle: handleEdit }]
    }
  ]
  return columns
}
