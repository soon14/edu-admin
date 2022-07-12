import { createApp } from 'vue'
import App from './App.vue'
import { setupApp } from '@/global'
const app = createApp(App)
setupApp(app)
