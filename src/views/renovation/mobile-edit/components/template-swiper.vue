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
  <div class="template-swiper">
    <el-carousel height="150px" :key="key">
      <el-carousel-item v-for="item in data.data" :key="item">
        <div class="w-full h-full object-cover">
          <img :src="item.cover" alt="" class="" />
        </div>
      </el-carousel-item>
    </el-carousel>
  </div>
</template>

<style scoped lang="scss">
.template-swiper {
  @apply cursor-pointer p-2;
}
</style>
