import axios from 'axios'
import type { AxiosInstance } from 'axios'
import type { RequestInterceptors, requestConfig } from './type'
import { ElMessage } from 'element-plus'

export class Request {
  instance: AxiosInstance
  interceptors?: RequestInterceptors
  constructor(config: requestConfig) {
    this.instance = axios.create(config)
    this.interceptors = config.interceptors
    this.instance.interceptors.request.use(
      this.interceptors?.requestInterceptors,
      this.interceptors?.requestInterceptorsCatch
    )
    this.instance.interceptors.response.use(
      this.interceptors?.responseInterceptors,
      this.interceptors?.responseInterceptorsCatch
    )
    this.instance.interceptors.request.use(
      (config) => {
        return config
      },
      (err) => {
        console.log(err)
      }
    )
    this.instance.interceptors.response.use(
      (res) => {
        // if (res.data.code === 0) {
        //   return res.data.data
        // } else {
        //   return res.data
        // }
        if (res?.data) {
          return res.data
        }
        return res
      },
      (err) => {
        // if (err.response.status === 404) {
        //   console.log('404错误')
        // }
        const message = err.response.data?.data || '请求失败, 请稍后再试'
        ElMessage({
          type: 'error',
          message
        })
        return new Promise(err.response)
      }
    )
  }

  request<T>(config: requestConfig<T>): Promise<T> {
    return new Promise((resolve, reject) => {
      if (config.interceptors?.requestInterceptors) {
        config = config.interceptors.requestInterceptors(config)
      }
      this.instance
        .request<any, T>(config)
        .then((res) => {
          if (config.interceptors?.responseInterceptors) {
            res = config.interceptors.responseInterceptors(res)
          }
          resolve(res)
          return res
        })
        .catch((err) => {
          reject(err)
        })
    })
  }

  get<T>(config: requestConfig<T>): Promise<T> {
    return this.request({ ...config, method: 'get' })
  }

  post<T>(config: requestConfig<T>): Promise<T> {
    return this.request({ ...config, method: 'post' })
  }

  put<T>(config: requestConfig<T>): Promise<T> {
    return this.request({ ...config, method: 'put' })
  }

  delete<T>(config: requestConfig<T>): Promise<T> {
    return this.request({ ...config, method: 'delete' })
  }

  patch<T>(config: requestConfig<T>): Promise<T> {
    return this.request({ ...config, method: 'patch' })
  }
}
