<script setup lang="ts">
import Breadcrumb from './components/breadcrumb.vue'
import { useSystem } from '@/store/system'
import HistoryMenu from './components/history-menu.vue'
const systemStore = useSystem()
const collapse = computed(() => systemStore.collapse)
</script>

<template>
  <div class="layout-main-header">
    <div class="layout-main-header-top">
      <i
        class="fas cursor-pointer fas fa-outdent !dark:hover:text-blue-400 duration-100"
        :class="[collapse ? 'is-rotate' : '']"
        @click="systemStore.changeCollapse"
      ></i>
      <Breadcrumb class="ml-4" />
    </div>
    <div class="layout-main-header-bottom c-border-top">
      <HistoryMenu />
    </div>
  </div>
</template>

<style scoped lang="scss">
.layout-main-header {
  .layout-main-header-top {
    @apply flex items-center h-10 rounded-none w-full px-5;
  }
  .layout-main-header-bottom {
  }
}
.is-rotate {
  transform: rotate(180deg);
}
</style>
<script lang="ts">
export default {
  name: 'LayoutMainHeader'
}
</script>
