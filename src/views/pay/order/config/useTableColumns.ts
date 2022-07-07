import { IColumn } from '@/components/page-table/types'

export default ({ handleDelete }: { handleDelete: any }) => {
  const columns: IColumn[] = [
    {
      type: 'selection'
    },
    {
      label: '#',
      prop: 'custom_index',
      width: '100px',
      align: 'center',
      headerAlign: 'center'
    },
    {
      label: '订单号',
      prop: 'no'
    },
    {
      label: '商品名称',
      prop: 'title',
      align: '',
      headerAlign: ''
      // showTooltipWhenOverflow: true
    },
    {
      label: '订单类型',
      slot: 'type',
      width: '100px',
      align: 'center',
      headerAlign: 'center'
    },
    {
      label: '订单状态',
      slot: 'status',
      width: '100px'
    },
    {
      label: '原价/实付(元)',
      prop: 'price',
      align: 'center',
      headerAlign: 'center',
      width: '140px'
    },
    {
      label: '支付方式',
      slot: 'pay_method',
      width: '100px',
      align: 'center',
      headerAlign: 'center'
    },
    {
      label: '创建/支付时间',
      prop: 'created_time',
      type: 'time',
      align: 'center',
      headerAlign: 'center',
      width: '220px'
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
