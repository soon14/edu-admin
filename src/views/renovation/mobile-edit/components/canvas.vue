<script setup lang="ts">
import TemplateList from './template-list.vue'
import useRenovation from '../hooks/useRenovation'
import MovePanel from './move-panel.vue'

const props = defineProps({
  templateData: {
    type: Object,
    default: () => ({})
  },
  index: {
    type: Number,
    default: 0
  }
})
const type = computed(() => {
  return props.templateData.type
})
const { activeIndex } = useRenovation()
const handleActive = (e: any) => {
  activeIndex.value = props.index
}
</script>

<template>
  <div class="">
    <template v-if="type === 'list'">
      <div
        @click.stop="handleActive"
        :class="{ 'active-border': props.index === activeIndex }"
      >
        <TemplateList :data="templateData" :index="index"></TemplateList>
      </div>
    </template>
    <template v-else-if="type === 'search'"></template>
    <template v-else-if="type === 'swiper'"></template>
    <template v-else-if="type === 'icons'"></template>
    <template v-else-if="type === 'coupon'"></template>
    <template v-else-if="type === 'promotion'"></template>
    <template v-else></template>
  </div>
</template>

<style scoped lang="scss">
.active-border {
  border: 1px dashed var(--el-color-primary);
  box-sizing: border-box;
}
</style>
<script lang="ts">
export default {
  name: 'CCanvas'
}
</script>
