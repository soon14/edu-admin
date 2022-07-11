<script setup lang="ts">
import useRenovation from '../hooks/useRenovation'

const { data, activeIndex } = useRenovation()
const templateData = computed(() => data.value.template[activeIndex.value].data)

const dialogSelectLinkRef = ref()
const dialogSelectRef = ref()

const selectOptions = [
  { label: '课程', value: 'course' },
  { label: '网页地址', value: 'webview' }
]
// 当前选择关联课程的item的index
const currentItemIndex = ref(-1)

const handleSetCourse = (index: number) => {
  currentItemIndex.value = index
  dialogSelectRef.value?.open()
}
// 选择课程并增加到template.data中
const handleSelectedCourse = (items: any[]) => {
  const item = items[0]
  Object.assign(
    data.value.template[activeIndex.value].data[currentItemIndex.value] as any,
    {
      course_id: item.id,
      course_title: item.title,
      cover: item.cover,
      type: 'course',
      url: ''
    }
  )
}

const handleDeleteCourseItem = (index: number) => {
  Object.assign(data.value.template[activeIndex.value].data[index] as any, {
    course_id: null,
    course_title: '',
    cover: '',
    type: 'course',
    url: ''
  })
}

const handleCloseCourse = (index: number) => {
  ;(data.value.template[activeIndex.value].data as any[]).splice(index, 1)
}

const handleAddSwiper = () => {
  ;(data.value.template[activeIndex.value].data as any).push({
    // @ts-ignore
    course_id: null,
    course_title: '',
    page_title: '',
    page_id: null,
    url: '',
    type: '',
    name: '分类',
    src: ''
  })
}
</script>

<template>
  <div class="w-120">
    <el-button
      type="primary"
      @click="handleAddSwiper"
      :disabled="templateData.length >= 5"
      >新增轮播图</el-button
    >
    <div>(最多5列,如需更多,重复添加即可)</div>
    <!-- 列表 -->
    <Draggable
      v-model="(data.template[activeIndex].data as any[])"
      :options="{ handle: '.move' }"
    >
      <template v-for="(item, index) in templateData" :key="index">
        <div class="flex items-center relative my-4">
          <i class="fas fa-maximize move select-none cursor-move pr-4"></i>
          <div class="item el-card flex-auto flex">
            <div class="img-box w-20 h-20 bg-light-50 overflow-hidden !bg-none">
              <UploadCrop v-model="(item as any).src"></UploadCrop>
              <!-- <img :src="(item as any).cover || '/img_default.svg'" alt="" /> -->
            </div>
            <div class="desc flex flex-col justify-between flex-1 ml-2 py-1.5">
              <div class="title">
                <el-input
                  class="w-20 mr-2"
                  v-model="(data.template[activeIndex].data[index]as any).name"
                  size="small"
                  placeholder="分类名称"
                ></el-input>
                <el-select
                  size="small"
                  v-model="(data.template[activeIndex].data[index]as any).type"
                >
                  <el-option
                    v-for="item in selectOptions"
                    :key="item.value"
                    :value="item.value"
                    :label="item.label"
                  ></el-option>
                </el-select>
              </div>
              <div class="price items-center">
                <!--  -->
                <template
                  v-if="(data.template[activeIndex].data[index]as any).type === 'course'"
                >
                  <div class="flex w-50 float-left">
                    <el-button
                      type="primary"
                      size="small"
                      @click="handleSetCourse(index)"
                    >
                      关联课程
                    </el-button>
                    <div
                      class="flex h-6 items-center ml-2 text-sm c-border px-2"
                      v-if="(data.template[activeIndex].data[index] as any)
                          .course_title"
                    >
                      {{
                        (data.template[activeIndex].data[index] as any)
                          .course_title
                      }}
                      <i
                        class="fas fa-xmark ml-2 cursor-pointer"
                        @click="handleDeleteCourseItem(index)"
                      ></i>
                    </div>
                  </div>
                </template>
                <el-input
                  v-model="(data.template[activeIndex].data[index]as any).url"
                  v-if="(data.template[activeIndex].data[index]as any).type === 'webview'"
                  size="small"
                  class="w-60"
                  placeholder=""
                ></el-input>
                <!--  -->
                <el-popconfirm
                  title="确定删除 ？"
                  @confirm="handleCloseCourse(index)"
                >
                  <template #reference>
                    <i
                      class="fas fa-xmark float-right mr-3 cursor-pointer mt-1"
                    ></i>
                  </template>
                </el-popconfirm>
              </div>
            </div>
          </div>
        </div>
      </template>
    </Draggable>
    <DialogSelect
      ref="dialogSelectRef"
      @selected="handleSelectedCourse"
    ></DialogSelect>
  </div>
</template>

<style scoped lang="scss">
:deep(.upload-crop-inner) {
  @apply w-20 h-20;
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
