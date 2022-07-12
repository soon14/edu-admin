export default {
  path: 'tool/bbs_post/:id',
  name: 'BbsPost',
  component: () => import('@/views/tool/bbs-post/index.vue'),
  meta: { icon: '', hidden: true, title: '帖子列表', activeMenu: '/tool/bbs' },
  children: []
}
