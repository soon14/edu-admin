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
  ;(data.value.template[activeIndex.value].data[
    currentItemIndex.value
  ] as any) = {
    course_id: item.id,
    course_title: item.title,
    src: item.cover,
    type: 'course',
    url: ''
  }
}

const handleCloseCourse = (index: number) => {
  ;(data.value.template[activeIndex.value].data as any[]).splice(index, 1)
}

const handleAddSwiper = () => {
  ;(data.value.template[activeIndex.value].data as any).push({
    course_id: null,
    course_title: '',
    src: '',
    type: 'course',
    url: ''
  })
}
</script>

<template>
  <div class="w-120">
    <el-button type="primary" @click="handleAddSwiper">新增轮播图</el-button>
    <div>(最多5张, 以下列表支持拖拽)</div>
    <!-- 列表 -->
    <Draggable
      v-model="(data.template[activeIndex].data as any[])"
      :options="{ handle: '.move' }"
    >
      <template v-for="(item, index) in templateData" :key="index">
        <div class="flex items-center relative my-4">
          <i class="fas fa-maximize move select-none cursor-move pr-4"></i>
          <div class="item el-card flex-auto flex">
            <div class="img-box w-30 h-20 bg-light-50 overflow-hidden !bg-none">
              <UploadImage
                class="!w-30 !h-20"
                v-model="(item as any).cover"
              ></UploadImage>
              <!-- <img :src="(item as any).cover || '/img_default.svg'" alt="" /> -->
            </div>
            <div class="desc flex flex-col justify-between flex-1 ml-2 py-1.5">
              <div class="title">
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
                <el-button
                  type="primary"
                  v-if="(data.template[activeIndex].data[index]as any).type === 'course'"
                  size="small"
                  @click="handleSetCourse(index)"
                >
                  关联课程
                </el-button>
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
.move {
  transform: rotate(45deg);
  transform-origin: center;
}
</style>
