import { IColumn } from '@/components/page-table/types'

export const course = () => {
  const columns: IColumn[] = [
    {
      label: '课程标题',
      prop: 'title',
      align: 'center',
      headerAlign: 'center'
    },

    {
      label: '购买时间',
      prop: 'created_time',
      type: 'time',
      align: 'center',
      headerAlign: 'center'
    },
    {
      label: '购买价格',
      prop: 'price',
      width: '200px',
      align: 'center',
      headerAlign: 'center'
    }
  ]
  return columns
}

export const order = () => {
  const columns: IColumn[] = [
    {
      label: 'id',
      prop: 'id',
      width: '100px',
      align: 'center',
      headerAlign: 'center'
    },
    {
      label: '订单号',
      prop: 'no',
      width: '210px',
      align: 'center',
      headerAlign: 'center'
    },
    {
      label: '购买价格',
      prop: 'price',
      width: '100px',
      align: 'center',
      headerAlign: 'center'
    },
    {
      label: '状态',
      prop: 'status',
      width: '100px',
      align: 'center',
      headerAlign: 'center'
    },
    {
      label: '商品',
      slot: 'history_goods',
      align: 'center',
      headerAlign: 'center'
    },
    {
      label: '购买时间',
      prop: 'created_time',
      type: 'time',
      width: '200px',
      align: 'center',
      headerAlign: 'center'
    }
  ]
  return columns
}

export const history = () => {
  const columns: IColumn[] = [
    {
      label: '课程标题',
      prop: 'title',
      width: '400px',
      align: 'center',
      headerAlign: 'center'
    },
    {
      label: '课程类型',
      prop: 'type',
      width: '200px',
      align: 'center',
      headerAlign: 'center'
    },
    {
      label: '学习时长',
      prop: 'total_time',
      align: 'center',
      headerAlign: 'center'
    }
  ]
  return columns
}
