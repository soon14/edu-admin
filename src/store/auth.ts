import { TOKEN, MENUS } from '@/constants/storage'
import { storage } from '@/utils/storage'
import { defineStore } from 'pinia'
import { loginApi, logoutApi, userInfoApi } from '@/api/user'
import { ILoginProps } from '@/views/login/components/types'
import router from '@/router/'
import { IUserinfoResponse } from '@/api/types/user'
import pick from 'lodash/pick'
import { useSystem } from './system'
// useStore 可以是任意名称，比如useUser，useCart。
// 第一个参数是你的应用程序中 Store 的唯一 ID。
export const useAuthStore = defineStore('auth', {
  state: () => {
    return {
      token: initToken() as string,
      menus: [] as any[],
      userInfo: null as Partial<IUserinfoResponse> | null,
      accesses: [] as string[]
    }
  },
  getters: {},
  actions: {
    setToken(token: string) {
      this.token = token
      storage.set(TOKEN, token)
    },
    setMenus(menus: any[]) {
      this.menus = menus
    },
    async login(params: ILoginProps) {
      // 1.获取token
      const { token } = await loginApi(params)
      this.setToken(token)
      router.push({ name: 'home' })
    },
    async logout(deep: boolean = false) {
      const message = deep
        ? '清除缓存会将系统初始化，包括登录状态、主题等，是否继续？'
        : '确定退出？'
      ElMessageBox.confirm(message, '提示', {
        type: 'warning',
        confirmButtonText: '确定',
        cancelButtonText: '取消'
      }).then(async () => {
        await logoutApi()
        this.clearLocalStorage(deep)
        ElMessage({ type: 'success', message: '退出成功' })
        router.push({ name: 'login' })
      })
    },
    async clearLocalStorage(deep: boolean = false) {
      this.setToken('')
      this.setMenus([])
      this.accesses = []
      this.userInfo = null
      if (deep) {
        const systemStore = useSystem()
        systemStore.resetTheme()
      }
    },
    async getUserinfo() {
      const data = await userInfoApi()
      this.userInfo = pick(data, [
        'name',
        'roles',
        'avatar',
        'introduction',
        'isplatform'
      ])
      this.accesses = data.accesses
      return data
    }
  }
})
function initToken() {
  const token = storage.get<string>(TOKEN) || ''
  return token
}
