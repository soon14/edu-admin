<script setup lang="ts">
import useRenovation from '../hooks/useRenovation'

const { data, activeIndex } = useRenovation()
const templateData = computed(() => data.value.template[activeIndex.value].data)
const selectOptions = [
  { label: '课程', value: 'course' },
  { label: '网页地址', value: 'webview' }
]

const currentType = ref('course')
watch(
  [data, activeIndex],
  () => {
    const type = (data.value.template[activeIndex.value]?.data[0] as any)?.type
    if (type) {
      currentType.value = type
    }
  },
  { deep: true, immediate: true }
)
watch(currentType, () => {
  ;(data.value.template[activeIndex.value]?.data[0] as any).type =
    currentType.value
  if (currentType.value === 'course') {
    ;(data.value.template[activeIndex.value]?.data[0] as any).url = ''
  } else {
    ;(data.value.template[activeIndex.value]?.data[0] as any).course_id = ''
    ;(data.value.template[activeIndex.value]?.data[0] as any).course_title = ''
  }
})
const uploadUrl = ref('')
const dialogSelectRef = ref()
watch(
  activeIndex,
  () => {
    const src = (data.value.template[activeIndex.value]?.data[0] as any)?.src
    if (src) {
      uploadUrl.value = src
    }
  },
  { deep: true, immediate: true }
)
watch(uploadUrl, () => {
  ;(data.value.template[activeIndex.value]?.data[0] as any).src =
    uploadUrl.value
})

const handleCreated = () => {
  uploadUrl.value = ''
  ;(data.value.template[activeIndex.value].data as any).push({
    course_id: null,
    course_title: '',
    src: '',
    type: 'course',
    url: ''
  })
}

const handleSetCourse = () => {
  dialogSelectRef.value?.open()
}
// 选择课程并增加到template.data中
const handleSelectedCourse = (items: any[]) => {
  const item = [...items][0]
  Object.assign((data.value.template[activeIndex.value].data as any)[0], {
    course_id: item.id,
    course_title: item.title,
    type: 'course',
    url: ''
  })
}

const handleCloseCourse = () => {
  ;(data.value.template[activeIndex.value].data as any[])[0] = {
    course_id: null,
    course_title: '',
    type: 'course',
    url: ''
  }
}
</script>

<template>
  <div class="w-120">
    <el-button
      type="primary"
      @click="handleCreated"
      :disabled="!!templateData.length"
      >新增图片</el-button
    >
    <template v-if="(templateData[0] as any)?.type">
      <div>
        <UploadImage
          :key="uploadUrl"
          class="!w-486px !h-50 !overflow-hidden el-card mt-2"
          v-model="uploadUrl"
        ></UploadImage>
      </div>
      <div class="flex flex-col">
        <div>
          <el-select class="mt-2" v-model="currentType" placeholder="请选择">
            <el-option
              v-for="item in selectOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </div>

        <div>
          <div class="flex items-center mt-2">
            <el-button
              v-if="currentType === 'course'"
              type="primary"
              @click="handleSetCourse"
              >关联</el-button
            >
            <el-alert
              class="!w-40 !ml-2"
              size="small"
              v-if="currentType === 'course' && (data.template[activeIndex].data as any)[0]?.course_title"
              type="success"
              @close="handleCloseCourse"
              :title="(data.template[activeIndex].data as any)[0]?.course_title"
            ></el-alert>
          </div>
          <el-input
            class="mt-2"
            v-if="currentType === 'webview'"
            v-model="(data.template[activeIndex].data as any)[0].url"
          ></el-input>
        </div>
      </div>
    </template>
    <DialogSelect
      ref="dialogSelectRef"
      @selected="handleSelectedCourse"
    ></DialogSelect>
  </div>
</template>

<style scoped lang="scss">
:deep(.icon-upload) {
  @apply w-500px h-50;
}
:deep(.el-alert__close-btn) {
  transform: translateY(-5px);
}
.move {
  transform: rotate(45deg);
  transform-origin: center;
}
.icon-close {
  color: var(--el-color-primary);
  cursor: pointer;
}
</style>
