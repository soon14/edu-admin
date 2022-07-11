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
  <div class="template-icons flex flex-wrap justify-around mt-2">
    <div
      v-for="(item, index) in data.data"
      :key="index"
      class="flex flex-col items-center"
    >
      <div class="w-10 rounded-full overflow-hidden">
        <img :src="item.src || '/img_default.svg'" alt="" />
      </div>
      <div class="mt-2 text-sm">{{ item.name }}</div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.template-icons {
  @apply cursor-pointer p-2;
}
</style>
