<script setup lang="ts">
import useRenovation from '../hooks/useRenovation'
import EditorList from './editor-list.vue'
import EditorSearch from './editor-search.vue'
import EditorSwiper from './editor-swiper.vue'
import EditorIcons from './editor-icons.vue'
import EditorGroup from './editor-group.vue'
import EditorImage from './editor-image.vue'
const { currentActiveTemplateCalc } = useRenovation()
const type = computed(() => currentActiveTemplateCalc.value?.type)
</script>

<template>
  <div class="p-4">
    <template v-if="type === 'list'">
      <EditorList></EditorList>
    </template>
    <template v-else-if="type === 'search'">
      <EditorSearch></EditorSearch>
    </template>
    <template v-else-if="type === 'swiper'">
      <EditorSwiper></EditorSwiper>
    </template>
    <template v-else-if="type === 'icons'">
      <EditorIcons></EditorIcons>
    </template>
    <template v-else-if="type === 'coupon'"></template>
    <template v-else-if="type === 'promotion'">
      <EditorGroup></EditorGroup>
    </template>
    <template v-else>
      <EditorImage></EditorImage>
    </template>
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
