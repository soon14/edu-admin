import { TOKEN, MENUS } from '@/constants/storage'
import { storage } from '@/utils/storage'
import { defineStore } from 'pinia'
import { loginApi, userInfoApi } from '@/api/user'
import { ILoginProps } from '@/views/login/components/types'
import router from '@/router/'
import { IUserinfoResponse } from '@/api/types/user'
import pick from 'lodash/pick'
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
