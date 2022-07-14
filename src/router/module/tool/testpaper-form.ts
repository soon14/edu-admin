export default {
  path: 'tool/testpaper_form/:id?',
  name: 'TestpaperForm',
  component: () => import('@/views/tool/testpaper-form/index.vue'),
  meta: {
    icon: '',
    title: '组卷',
    hidden: true,
    activeMenu: '/tool/testpaper'
  },
  children: []
}
