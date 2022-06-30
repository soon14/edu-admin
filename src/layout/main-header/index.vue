<script setup lang="ts">
import { useSystem } from '@/store/system'
const systemStore = useSystem()
const collapse = computed(() => systemStore.collapse)
</script>

<template>
  <div class="layout-main-header">
    <i
      class="fas cursor-pointer fas fa-outdent"
      :class="[collapse ? 'is-rotate' : '']"
      @click="systemStore.changeCollapse"
    ></i>
  </div>
</template>

<style scoped lang="scss">
.is-rotate {
  transform: rotate(180deg);
}
</style>
<script lang="ts">
export default {
  name: 'LayoutMainHeader'
}
</script>
