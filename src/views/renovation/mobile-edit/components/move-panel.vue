<script setup lang="ts">
import useRenovation from '../hooks/useRenovation'
const { activeIndex, removeTemplate, moveTop, moveBottom } = useRenovation()
</script>

<template>
  <div
    v-if="activeIndex >= 0"
    class="absolute top-0 -right-8 w-8 el-card select-none cursor-pointer"
  >
    <div
      class="h-8 flex items-center justify-center text-hover duration-200"
      @click="moveTop"
    >
      <i class="fas fa-up-long"></i>
    </div>
    <div
      class="h-8 flex items-center justify-center text-hover duration-200"
      @click="moveBottom"
    >
      <i class="fas fa-down-long"></i>
    </div>
    <div
      class="h-8 flex items-center justify-center text-hover duration-200"
      @click="removeTemplate"
    >
      <i class="fas fa-xmark"></i>
    </div>
  </div>
</template>

<style scoped lang="scss">
.text-hover:hover {
  color: var(--el-color-primary);
}
</style>
