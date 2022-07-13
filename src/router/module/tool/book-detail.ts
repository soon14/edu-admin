export default {
  path: 'tool/book_detail/:id/:book_title',
  name: 'BookDetail',
  component: () => import('@/views/tool/book-detail/index.vue'),
  meta: {
    icon: '',
    title: '电子书章节管理',
    hidden: true,
    activeMenu: '/tool/book'
  },
  children: []
}
