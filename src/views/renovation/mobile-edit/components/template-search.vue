<script setup lang="ts">
import useRenovation from '../hooks/useRenovation'
const { currentActiveTemplateCalc } = useRenovation()
const type = computed(() => currentActiveTemplateCalc.value?.type)
const props = defineProps({
  placeholder: {
    type: String,
    default: '请输入搜索关键词'
  },
  index: {
    type: Number,
    default: 0
  }
})
</script>

<template>
  <div class="template-search el-card !border-none h-14">
    <div
      class="cursor-pointer c-border rounded text-center h-full flex items-center justify-center"
    >
      <i class="fab fa-searchengin opacity-40"></i>
      <span class="opacity-40 text-sm ml-2">{{
        placeholder || '请输入搜索关键词'
      }}</span>
    </div>
  </div>
</template>

<style scoped lang="scss">
.template-search {
  @apply cursor-pointer p-2;
}
</style>
