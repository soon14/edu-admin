export default {
  path: 'tool/testpaper_manage',
  name: 'TestpaperTest',
  component: () => import('@/views/tool/testpaper-manage/index.vue'),
  meta: {
    icon: '',
    title: '考试管理',
    hidden: true,
    activeMenu: '/tool/testpaper'
  },
  children: []
}
