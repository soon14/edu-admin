import { TOKEN } from '@/constants/storage'
import { storage } from '@/utils/storage'
import { Request } from './request'
import { BASE_URL, TIMEOUT } from './request/config'
import { getImg, getTitle } from '@/api/utils/data'

const request = new Request({
  baseURL: BASE_URL,
  timeout: TIMEOUT,
  interceptors: {
    requestInterceptors: (config) => {
      const token = storage.get(TOKEN)
      if (token && config.headers) {
        config.headers.token = `${token}`
        config.headers.schoolid = 11
      }
      return config
    },
    responseInterceptors: (config) => {
      if (config?.data) {
        if (config.data?.data?.items) {
          config.data.data.items.forEach((it: any) => {
            it.cover = getImg()
            it.title = getTitle()
            if (it?.value?.cover) {
              it.value.cover = getImg()
              it.value.title = getTitle()
            }
            if (it?.user) {
              it.user.avatar = getImg()
            }
          })
        }
        return config.data
      }
      return config
    }
  }
})

export default request
