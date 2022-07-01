<script setup lang="ts">
import { useSystem } from '@/store/system'

const systemStore = useSystem()
const router = useRouter()
const currentRoute = computed(() => router.currentRoute.value)
const historyMenus = computed(() => systemStore.historyMenus)
const historyMenusWithHome = computed(() => {
  const result = [...historyMenus.value]
  result.unshift({ path: '/', name: 'home', title: '主页' })
  return result
})
watch(
  () => router,
  () => {
    if (
      !currentRoute.value.meta.title ||
      currentRoute.value.meta.hidden ||
      currentRoute.value.meta.hiddenHistory
    )
      return
    const targetObj = {
      title: currentRoute.value.meta.title,
      name: currentRoute.value.name as string,
      path: currentRoute.value.path
    }
    systemStore.addHistoryMenu(targetObj)
  },
  { deep: true, immediate: true }
)
const handleRemoveItemByPath = (path: string) => {
  const len = historyMenus.value.length
  if (len === 1) {
    router.push('/')
  } else if (currentRoute.value.path === path) {
    const index = historyMenus.value.findIndex((it) => it.path === path)
    const targetRoute =
      index === 0
        ? historyMenus.value[index + 1]
        : historyMenus.value[index - 1]
    router.push(targetRoute.path)
  }
  systemStore.removeHistoryMenu(path)
}
const handleToPageByPath = (path: string) => {
  const currentPath = router.currentRoute.value.path
  currentPath !== path && router.push(path)
}
</script>

<template>
  <el-scrollbar>
    <div class="history-menu">
      <template v-for="item in historyMenusWithHome" :key="item.path">
        <div
          :class="[
            item.path === router.currentRoute.value.path ? 'active' : null,
            'history-item el-card'
          ]"
          @click="handleToPageByPath(item.path)"
        >
          {{ item.title }}
          <i
            class="fas fa-xmark light:text-gray-400 light:hover:text-gray-900 duration-200 dark:hover:text-white"
            v-if="item.path !== '/'"
            @click.stop="handleRemoveItemByPath(item.path)"
          ></i>
        </div>
      </template>
    </div>
  </el-scrollbar>
</template>

<style scoped lang="scss">
.history-menu {
  @apply flex;
  .el-scrollbar {
    @apply flex;
  }
  .history-item {
    @apply py-2 px-4 text-sm select-none cursor-pointer
            flex-none
          hover: bg-white hover:bg-opacity-40 rounded-none border-t-0 border-b-0 border-l-0;

    i {
      @apply text-sm ml-2 hover: scale-125;
    }

    &.active {
      @apply bg-white bg-opacity-40 border-opacity-0
              light:bg-light-600;
    }
  }
}
</style>
<script lang="ts">
export default {
  name: 'HistoryMenu'
}
</script>
