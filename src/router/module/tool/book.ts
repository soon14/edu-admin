export default {
  path: 'tool/book',
  name: 'Book',
  component: () => import('@/views/tool/book/index.vue'),
  meta: { icon: 'fas fa-book', title: '电子书' },
  children: []
}
