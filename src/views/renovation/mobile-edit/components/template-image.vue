<script setup lang="ts">
import useRenovation from '../hooks/useRenovation'
const { currentActiveTemplateCalc } = useRenovation()
const type = computed(() => currentActiveTemplateCalc.value?.type)
const props = defineProps({
  data: {
    type: Object,
    default: () => ({})
  },
  index: {
    type: Number,
    default: 0
  }
})
const key = ref(1)
watch(
  props.data,
  () => {
    key.value++
  },
  {
    deep: true
  }
)
</script>

<template>
  <div
    class="m-2 h-40 w-440px overflow-hidden el-card object-cover flex items-center justify-center cursor-pointer"
  >
    <img v-if="data.data[0]" :src="data.data[0].src" alt="" class="w-full" />
    <div v-else class="opacity-60 text-sm">【图片广告模块】请点击关联数据</div>
  </div>
</template>

<style scoped lang="scss">
.template-group {
  @apply cursor-pointer p-2;
}
</style>
