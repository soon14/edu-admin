export default {
  path: 'pay/payment',
  name: 'Payment',
  component: () => import('@/views/pay/payment/index.vue'),
  meta: { icon: 'fas fa-cash-register', title: '支付设置' },
  children: []
}
