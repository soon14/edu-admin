import { UPLOAD_API } from '@/constants/fetch'
import request from '@/utils/axios'
import { requestConfig } from '@/utils/axios/request/type'

export default {
  // 创建课程
  [UPLOAD_API](options: requestConfig) {
    return request.post({
      url: '/admin/s/upload',
      ...options
    })
  }
}
