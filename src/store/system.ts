import { THEME } from '@/constants/storage'
import { storage } from '@/utils/storage'
import { defineStore } from 'pinia'

// useStore 可以是任意名称，比如useUser，useCart。
// 第一个参数是你的应用程序中 Store 的唯一 ID。
export const useSystem = defineStore('main', {
  state: () => {
    return {
      theme: getTheme() as 'dark' | 'light',
      collapse: false
    }
  },
  getters: {},
  actions: {
    changeTheme() {
      if (this.theme === 'dark') {
        this.theme = 'light'
      } else {
        this.theme = 'dark'
      }
      setHtmlAttr(this.theme)
    },
    resetTheme() {
      this.theme = 'dark'
      setHtmlAttr('dark')
    },
    changeCollapse() {
      this.collapse = !this.collapse
    }
  }
})
getTheme()

function getTheme() {
  const theme = storage.get<string>(THEME) || 'dark'
  setHtmlAttr(theme)
  return theme
}
function setHtmlAttr(theme: string) {
  document.documentElement.classList.remove('light')
  document.documentElement.classList.remove('dark')
  setTimeout(() => {
    document.documentElement.classList.add(theme)
    storage.set(THEME, theme)
  })
}
