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
  <div class="template-swiper el-card m-2">
    <el-carousel height="150px" :key="key" v-if="!!data.data.length">
      <el-carousel-item v-for="item in data.data" :key="item.cover">
        <div class="w-full h-full object-cover">
          <img v-if="item.cover" :src="item.cover" alt="" class="" />
          <div
            v-else
            class="flex items-center justify-center opacity-60 text-sm h-150px"
          >
            暂无图片
          </div>
        </div>
      </el-carousel-item>
    </el-carousel>
    <div
      v-else
      class="opacity-60 text-sm h-150px flex items-center justify-center"
    >
      【轮播图模块】请点击关联数据
    </div>
  </div>
</template>

<style scoped lang="scss">
.template-swiper {
  @apply cursor-pointer p-2;
}
</style>
