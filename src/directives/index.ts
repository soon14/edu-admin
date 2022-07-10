import { App } from 'vue'
import { vClickOutside } from './click-outside'
export const setupDirective = (app: App) => {
  app.directive('clickOutside', vClickOutside)
}
