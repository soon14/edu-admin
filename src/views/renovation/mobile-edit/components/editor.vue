<script setup lang="ts">
import useRenovation from '../hooks/useRenovation'
import EditorList from './editor-list.vue'
const { currentActiveTemplateCalc } = useRenovation()
const type = computed(() => currentActiveTemplateCalc.value?.type)
</script>

<template>
  <div class="p-4">
    <template v-if="type === 'list'">
      <EditorList></EditorList>
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
.header {
  @apply flex justify-between;
}
</style>
<script lang="ts">
export default {
  name: 'CEdit'
}
</script>
