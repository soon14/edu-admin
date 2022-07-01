import { createRouter, createWebHistory } from 'vue-router'
import type { RouteRecordRaw } from 'vue-router'
import Layout from '@/layout/index.vue'
import Login from '@/views/login/index.vue'
import Home from '@/views/home/index.vue'
import { useAuthStore } from '@/store/auth'
import { IMenu } from '@/api/module/types/user'
import deepCopy from 'lodash/cloneDeep'
// import module from './module'
const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'layout',
    component: Layout,
    children: [
      {
        path: '',
        name: 'home',
        meta: { title: '主页', hiddenHistory: true },
        component: Home
      }
    ]
  },
  {
    path: '/login',
    name: 'login',
    component: Login
  },
  {
    path: '/:pathMatch(.*)*',
    component: Login
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})
let isRefresh = false
router.beforeEach(async (to) => {
  const authStore = useAuthStore()
  const token = authStore.token
  const userInfo = authStore.userInfo
  if (token) {
    if (!userInfo && !isRefresh && to.path !== '/login') {
      isRefresh = true
      // 1.获取用户信息
      const { menus } = await authStore.getUserinfo()
      // 3.动态注册路由
      const resultRoutes = addRoutes(menus)
      // 2.转换menus, 并存入store
      const menusResult = getMenus(menus, resultRoutes)
      authStore.setMenus(menusResult)
      // 4.根据官方文档, 动态注册路由后, 需要replace或者push, 否则bug
      return to.fullPath
    }
    if (to.path === '/login') {
      return '/'
    }
  } else {
    if (to.path !== '/login') {
      return '/login'
    }
  }
})
const iconMap: Record<string, string> = {
  Course: 'fa-brands fa-discourse',
  Home: 'fa-brands fa-house',
  Marketing: 'fas fa-fire',
  Pay: 'fas fa-file-invoice-dollar',
  Renovation: 'fas fa-palette',
  Setting: 'fas fa-gear',
  Tool: 'fas fa-wrench',
  User: 'fas fa-user-tie'
}
/**
 * 根据请求的菜单数据动态添加路由, 返回所有注册的路由记录 (扁平)
 */
function addRoutes(menus: IMenu[]): RouteRecordRaw[] {
  const bpMenu = bpMenus<IMenu>(menus)
  const result: RouteRecordRaw[] = []
  const components = import.meta.globEager('./module/**/*.ts')
  Object.entries(components).forEach(([, m]) => {
    const name = m.default.name
    if (bpMenu.find((it) => it.name === name)) {
      result.push(m.default)
      router.hasRoute(name) || router.addRoute('layout', m.default)
    }
  })
  return result
}
/**
 * 获取菜单, 用于侧边栏
 * 利用当前菜单数据, 对照扁平的路由记录, 生成最终侧边栏菜单
 */
function getMenus(menus: IMenu[], routes: RouteRecordRaw[]) {
  const result: RouteRecordRaw[] = []
  const deep = (result: RouteRecordRaw[], menus: IMenu[]) => {
    menus.forEach((item) => {
      const targetRoute = routes.find((it) => it.name === item.name)
      const tempObj = {} as RouteRecordRaw
      tempObj.meta = {}
      tempObj.path = targetRoute?.path ? '/' + targetRoute?.path : ''
      tempObj.name = item.name
      tempObj.meta.hidden = item.hidden ?? targetRoute?.meta?.hidden
      tempObj.meta.title = item.title ?? targetRoute?.meta?.title
      tempObj.meta.icon = iconMap[item.name] || targetRoute?.meta?.icon
      result.push(tempObj)
      if (item.children && item.children.length) {
        tempObj.children = []
        deep(tempObj.children, item.children)
      }
    })
  }
  deep(result, deepCopy(menus))
  result.unshift({
    path: '/',
    name: 'home',
    meta: { title: '主页', icon: 'fas fa-house-user' },
    component: Home
  })
  return result
}

/**
 * 转换为扁平
 */
export function bpMenus<T = any>(menus: any[]): T[] {
  const result: T[] = []
  const deep = (menus: any[]) => {
    menus.forEach((it) => {
      result.push(it)
      let children: RouteRecordRaw[] = []
      if (it.children && it.children.length) {
        children = it.children
        it.children = undefined
        deep(children)
      }
    })
  }
  deep(deepCopy(menus))
  return result
}
export default router
