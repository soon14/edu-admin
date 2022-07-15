import { IColumn } from '@/components/page-table/types'

export default ({ handleDelete }: { handleDelete: any }) => {
  const columns: IColumn[] = [
    {
      label: '#',
      prop: 'custom_index',
      width: '60px',
      align: 'center',
      headerAlign: 'center'
    },
    {
      label: 'id',
      prop: 'id',
      width: '80px',
      align: 'center',
      headerAlign: 'center'
    },
    {
      label: '用户名',
      slot: 'user',
      width: '140px',
      align: 'center',
      headerAlign: 'center'
    },
    {
      label: '试卷标题',
      slot: 'title'
    },
    {
      label: '答题状态',
      slot: 'answer_status',
      width: '100px',
      align: 'center',
      headerAlign: 'center'
    },
    {
      label: '是否阅卷',
      slot: 'read_status',
      width: '100px',
      align: 'center',
      headerAlign: 'center'
    },
    {
      label: '分数',
      prop: 'score',
      width: '100px',
      align: 'center',
      headerAlign: 'center'
    },
    {
      label: '开始时间',
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
      btns: [{ name: '删除', type: 'danger', handle: handleDelete }]
    }
  ]
  return columns
}
