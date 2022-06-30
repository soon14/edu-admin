export default {
  path: 'pay/order',
  name: 'Order',
  component: () => import('@/views/pay/order/index.vue'),
  meta: { icon: 'fas fa-calendar-week', title: '订单管理' },
  children: []
}
