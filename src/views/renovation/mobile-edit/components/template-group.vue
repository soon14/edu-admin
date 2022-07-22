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
  <div class="px-4 py-2">{{ data.title }}</div>
  <el-scrollbar>
    <div class="template-group flex mt-2">
      <div
        v-for="(item, index) in data.data"
        :key="index"
        class="flex flex-col flex-grow-0 flex-shrink-0 w-120px items-center el-card m-2"
      >
        <div class="w-120px h-120px">
          <img class="w-full" :src="item.cover || '/img_default.svg'" alt="" />
        </div>
        <div class="mt-1 text-sm w-full text-left px-2">{{ item.title }}</div>
        <div class="mt-2 text-sm w-full text-left px-2">
          <div class="text-red-500 mr-1">&yen; {{ item.price }}</div>
          <del class="text-sm opacity-50">&yen; {{ item.t_price }}</del>
        </div>
      </div>
    </div>
  </el-scrollbar>
</template>

<style scoped lang="scss">
.template-group {
  @apply cursor-pointer p-2;
}
</style>
