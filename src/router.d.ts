import 'vue-router'

declare module 'vue-router' {
  interface RouteMeta {
    hidden?: boolean
    title?: string
    icon?: string
    activeMenu?: string
    hiddenHistory?: boolean
  }
}
