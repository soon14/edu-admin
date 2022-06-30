import { TOKEN } from '@/constants/storage'
import { storage } from '@/utils/storage'
import { Request } from './request'
import { BASE_URL, TIMEOUT } from './request/config'

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
        return config.data
      }
      return config
    }
  }
})

export default request
