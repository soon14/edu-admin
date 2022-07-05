import { defineComponent } from 'vue'
import { ElMenu, ElMenuItem, ElSubMenu } from 'element-plus'
import 'element-plus/es/components/menu/style/css'
import { useAuthStore } from '@/store/auth'
import type { RouteRecordRaw } from 'vue-router'
import { useSystem } from '@/store/system'
export default defineComponent({
  name: 'LayoutAside',
  components: { ElMenu, ElMenuItem, ElSubMenu },
  setup() {
    return () => {
      const authStore = useAuthStore()
      const menus = authStore.menus
      const route = useRoute()
      const currentRoute = computed(() => {
        if (route.meta.activeMenu) {
          return route.meta.activeMenu
        }
        return route.fullPath
      })
      const systemStore = useSystem()
      const collapse = computed(() => systemStore.collapse)
      const renderMenu = (menus: RouteRecordRaw[]) => {
        return menus.map((menu) => {
          const slot = {
            title: () => (
              <>
                <i class={[menu.meta?.icon, 'w-10 text-16px text-center']}></i>
                <span>{menu?.meta?.title}</span>
              </>
            )
          }
          if (menu.children && menu.children.length) {
            return (
              <el-sub-menu index={menu.name} v-slots={slot}>
                {renderMenu(menu.children)}
              </el-sub-menu>
            )
          } else {
            if (!menu.meta?.hidden) {
              return (
                <el-menu-item index={menu.path}>
                  <i
                    class={[menu.meta?.icon, 'w-10 text-16px text-center']}
                  ></i>
                  <span>{menu.meta?.title}</span>
                </el-menu-item>
              )
            }
            return null
          }
        })
      }
      return (
        <el-menu
          router
          unique-opened
          collapse-transition={false}
          collapse={collapse.value}
          default-active={currentRoute.value}
        >
          {renderMenu(menus)}
        </el-menu>
      )
    }
  }
})
