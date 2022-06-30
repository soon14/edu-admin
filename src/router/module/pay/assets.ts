export default {
  path: 'pay/assets',
  name: 'Assets',
  component: () => import('@/views/pay/assets/index.vue'),
  meta: { icon: 'fas fa-money-check-dollar', title: '资产管理' },
  children: []
}
