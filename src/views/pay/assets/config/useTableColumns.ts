import { IColumn } from '@/components/page-table/types'

export default () => {
  const columns: IColumn[] = [
    {
      label: '#',
      prop: 'custom_index',
      width: '100px',
      align: 'center',
      headerAlign: 'center'
    },
    {
      label: '提取账号',
      prop: 'account',
      align: 'center',
      headerAlign: 'center'
    },
    {
      label: '交易时间',
      prop: 'created_time',
      type: 'time',
      width: '300px',
      align: 'center',
      headerAlign: 'center'
    },
    {
      label: '开户人',
      prop: 'name',
      width: '200px',
      align: 'center',
      headerAlign: 'center'
    },
    {
      label: '提现金额',
      prop: 'price',
      width: '200px',
      align: 'center',
      headerAlign: 'center'
    },
    {
      label: '状态',
      slot: 'status',
      width: '200px',
      align: 'center',
      headerAlign: 'center'
    }
  ]
  return columns
}
