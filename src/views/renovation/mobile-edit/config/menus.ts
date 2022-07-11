import { Template } from '@/api/module/types/renovation'
interface IConfig extends Template {
  icon: string
}
export default function () {
  const menus: Partial<IConfig[]> = [
    {
      title: '课程列表',
      type: 'list',
      data: [],
      showMore: true,
      listType: '',
      icon: 'fas fa-compass'
    },
    {
      title: '搜索框',
      type: 'search',
      placeholder: '',
      data: [],
      icon: 'fas fa-compass'
    },
    {
      title: '轮播图',
      type: 'swiper',
      data: [
        // { course_id: null, course_title: '', src: '', type: '', url: '' }
      ],
      icon: 'fas fa-compass'
    },
    {
      title: '图标分类',
      type: 'icons',
      data: [
        {
          // @ts-ignore
          course_id: null,
          course_title: '',
          page_title: '',
          page_id: null,
          url: '',
          type: '',
          name: '分类',
          src: ''
        },
        {
          // @ts-ignore
          course_id: null,
          course_title: '',
          page_title: '',
          page_id: null,
          url: '',
          type: '',
          name: '分类',
          src: ''
        },
        {
          // @ts-ignore
          course_id: null,
          course_title: '',
          page_title: '',
          page_id: null,
          url: '',
          type: '',
          name: '分类',
          src: ''
        },
        {
          // @ts-ignore
          course_id: null,
          course_title: '',
          page_title: '',
          page_id: null,
          url: '',
          type: '',
          name: '分类',
          src: ''
        },
        {
          // @ts-ignore
          course_id: null,
          course_title: '',
          page_title: '',
          page_id: null,
          url: '',
          type: '',
          name: '分类',
          src: ''
        }
      ],
      icon: 'fas fa-compass'
    },
    { title: '优惠券', type: 'coupon', data: [], icon: 'fas fa-compass' },
    {
      title: '限时拼团',
      type: 'promotion',
      listType: 'group',
      data: [],
      icon: 'fas fa-compass'
    },
    { title: '图片广告', type: 'imageAd', data: [], icon: 'fas fa-compass' }
  ]
  return menus
}
