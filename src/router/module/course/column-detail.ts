export default {
  path: 'course/column_detail/:id',
  name: 'ColumnDetail',
  component: () => import('@/views/course/column-detail/index.vue'),
  meta: {
    icon: '',
    title: '专栏详情',
    activeMenu: '/course/column',
    hidden: true
  },
  children: []
}
