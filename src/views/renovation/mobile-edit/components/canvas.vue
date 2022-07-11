<script setup lang="ts">
import TemplateList from './template-list.vue'
import useRenovation from '../hooks/useRenovation'
import MovePanel from './move-panel.vue'
import TemplateSearch from './template-search.vue'
import TemplateSwiper from './template-swiper.vue'
import TemplateIcons from './template-icons.vue'
import TemplateGroup from './template-group.vue'
import TemplateImage from './template-image.vue'

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
        class="select-border"
        :class="{ 'active-border': props.index === activeIndex }"
      >
        <TemplateList :data="templateData" :index="index"></TemplateList>
      </div>
    </template>
    <template v-else-if="type === 'search'">
      <div
        @click.stop="handleActive"
        class="select-border"
        :class="{ 'active-border': props.index === activeIndex }"
      >
        <TemplateSearch
          :placeholder="templateData.placeholder"
        ></TemplateSearch>
      </div>
    </template>
    <template v-else-if="type === 'swiper'">
      <div
        @click.stop="handleActive"
        class="select-border"
        :class="{ 'active-border': props.index === activeIndex }"
      >
        <TemplateSwiper :data="templateData" :index="index"></TemplateSwiper>
      </div>
    </template>
    <template v-else-if="type === 'icons'">
      <div
        @click.stop="handleActive"
        class="select-border"
        :class="{ 'active-border': props.index === activeIndex }"
      >
        <TemplateIcons :data="templateData" :index="index"></TemplateIcons>
      </div>
    </template>
    <template v-else-if="type === 'coupon'"> </template>
    <template v-else-if="type === 'promotion'">
      <div
        @click.stop="handleActive"
        class="select-border"
        :class="{ 'active-border': props.index === activeIndex }"
      >
        <TemplateGroup :data="templateData" :index="index"></TemplateGroup>
      </div>
    </template>
    <template v-else>
      <div
        @click.stop="handleActive"
        class="select-border"
        :class="{ 'active-border': props.index === activeIndex }"
      >
        <TemplateImage :data="templateData" :index="index"></TemplateImage>
      </div>
    </template>
  </div>
</template>

<style scoped lang="scss">
.select-border {
  border: 1px dashed transparent;
  box-sizing: border-box;
  transition: border-color 0.3s;
  border-radius: 3px;
}
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
