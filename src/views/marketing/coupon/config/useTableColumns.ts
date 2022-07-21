import { IColumn } from '@/components/page-table/types'

export default ({ handleEdit }: { handleEdit: any }) => {
  const columns: IColumn[] = [
    {
      label: '#',
      prop: 'custom_index',
      width: '50px',
      align: 'center',
      headerAlign: 'center'
    },
    {
      label: '优惠券id',
      prop: 'id',
      width: '80px',
      align: 'center',
      headerAlign: 'center'
    },

    {
      label: '使用课程',
      slot: 'use_course',
      width: '460px'
    },
    {
      label: '活动开始',
      prop: 'start_time',
      type: 'time',
      width: '200px',
      align: 'center',
      headerAlign: 'center'
    },
    {
      label: '活动结束',
      prop: 'start_time',
      type: 'time',
      width: '200px',
      align: 'center',
      headerAlign: 'center'
    },
    {
      label: '发行量',
      prop: 'c_num',
      width: '100px',
      align: 'center',
      headerAlign: 'center'
    },
    {
      label: '已领取',
      prop: 'received_num',
      width: '100px',
      align: 'center',
      headerAlign: 'center'
    },
    {
      label: '已使用',
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
