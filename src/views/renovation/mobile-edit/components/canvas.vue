<script setup lang="ts">
import TemplateList from './template-list.vue'

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
</script>

<template>
  <div class="">
    <template v-if="type === 'list'">
      <TemplateList :data="templateData" :index="index"></TemplateList>
    </template>
    <template v-else-if="type === 'search'"></template>
    <template v-else-if="type === 'swiper'"></template>
    <template v-else-if="type === 'icons'"></template>
    <template v-else-if="type === 'coupon'"></template>
    <template v-else-if="type === 'promotion'"></template>
    <template v-else></template>
  </div>
</template>

<style scoped lang="scss"></style>
<script lang="ts">
export default {
  name: 'CCanvas'
}
</script>
