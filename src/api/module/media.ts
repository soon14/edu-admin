import request from '@/utils/axios'

export const mediaListApi = (data: ILoginProps) => {
  return request.post<ILoginResponse>({
    url: '/user/login',
    data
  })
}
