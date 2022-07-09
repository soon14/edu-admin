export default {
  path: 'renovation/mobile_edit/:id',
  name: 'MobileEdit',
  component: () => import('@/views/renovation/mobile-edit/index.vue'),
  meta: {
    icon: '',
    title: '移动端装修',
    hidden: true,
    activeMenu: '/renovation/mobile_index'
  },
  children: []
}
