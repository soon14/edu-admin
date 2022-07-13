import { IColumn } from '@/components/page-table/types'

export const radio = ({ handleDelete }: { handleDelete: any }) => {
  const columns: IColumn[] = [
    {
      label: '答案',
      slot: 'option',
      width: '60px',
      align: 'center',
      headerAlign: 'center'
    },
    {
      label: '选项',
      slot: 'letter',
      align: 'center',
      width: '60px'
    },
    {
      label: '答案',
      slot: 'answer'
    },
    {
      label: '',
      type: 'action_btn',
      // fixed: 'right',
      align: 'center',
      width: '140px',
      headerAlign: 'center',
      btns: [{ name: '删除', type: 'danger', handle: handleDelete }]
    }
  ]
  return columns
}
