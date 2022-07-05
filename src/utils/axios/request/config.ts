const TIMEOUT = 10000
let BASE_URL = ''

if (process.env.NODE_ENV === 'development') {
  BASE_URL = '/api'
} else if (process.env.NODE_ENV === 'production') {
  BASE_URL = 'http://demonuxtapi.dishait.cn'
} else {
  BASE_URL = '/test'
}

export { BASE_URL, TIMEOUT }
