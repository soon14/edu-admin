import request from '@/utils/axios'
import type { ILoginProps } from '@/views/login/components/types'
import type { ILoginResponse, IUserinfoResponse } from './types/user'

export const loginApi = (data: ILoginProps) => {
  return request.post<ILoginResponse>({
    url: '/user/login',
    data
  })
}
export const logoutApi = () => {
  return request.post({
    url: 'logout'
  })
}
export const userInfoApi = () => {
  return request.get<IUserinfoResponse>({
    url: '/admin/user/info'
  })
}
