import type { App } from 'vue'
import { setupFetchApi } from '@/api/'
import { createPinia } from 'pinia'
import router from '@/router/'
import 'virtual:windi.css'
import '@/styles/index.scss'
import 'element-plus/theme-chalk/dark/css-vars.css'

import { setupDirective } from '@/directives'

export const setupApp = (app: App) => {
  const pinia = createPinia()
  app.use(setupFetchApi)
  app.use(pinia)
  app.use(router)
  app.use(setupDirective)
  app.mount('#app')
}
