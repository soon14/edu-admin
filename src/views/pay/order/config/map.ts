// @ts-ignore
import utils from '@/utils/excel'
// string | number | date
export default function () {
  return {
    no: {
      text: '订单号',
      type: 'string'
    },
    title: {
      text: '商品名称',
      type: 'string'
    },
    type: {
      text: '订单类型',
      type: 'string'
    },
    status: {
      text: '订单状态',
      type: 'string'
    },
    total_price: {
      text: '原价(元)',
      type: 'string'
    },
    price: {
      text: '实付(元)',
      type: 'string'
    },
    pay_method: {
      text: '支付方式',
      type: 'string'
    },
    created_time: {
      text: '创建时间',
      type: 'date',
      formatter: (value: string) => {
        return utils.exportFormatDate(value, 'yyyy/M/d')
      }
    },
    pay_time: {
      text: '支付时间',
      type: 'date',
      formatter: (value: string) => {
        return utils.exportFormatDate(value, 'yyyy/M/d')
      }
    }
  }
}
