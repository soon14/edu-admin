<script setup lang="ts">
import useRenovation from '../hooks/useRenovation'

const { data, activeIndex } = useRenovation()
const templateData = computed(() => data.value.template[activeIndex.value].data)

const dialogSelectRef = ref()

const handleSetCourse = () => {
  dialogSelectRef.value?.open()
}
// 选择课程并增加到template.data中
const handleSelectedCourse = (items: any[]) => {
  ;(data.value.template[activeIndex.value].data as any).push(...items)
}

const handleCloseCourse = (index: number) => {
  ;(data.value.template[activeIndex.value].data as any[]).splice(index, 1)
}
</script>

<template>
  <div class="w-120">
    <el-form>
      <el-form-item label="类型">
        <el-radio-group v-model="(data.template[activeIndex] as any).listType">
          <el-radio label="group">拼团</el-radio>
          <el-radio label="flash">限时活动</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="标题">
        <el-input
          v-model="(data.template[activeIndex] as any).title"
          placeholder="请输入标题"
        ></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="handleSetCourse">关联课程</el-button>
      </el-form-item>
    </el-form>
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
              <img :src="(item as any).cover || '/img_default.svg'" alt="" />
            </div>
            <div class="desc flex flex-col flex-1 ml-2 py-1.5">
              <div class="title">
                {{ (item as any).title }}
              </div>
              <div class="price items-center mt-auto">
                <div class="w-50 inline-block">
                  <span class="text-red-500 mr-2"
                    >&yen; {{ (item as any).price }}</span
                  >
                  <span class="text-sm opacity-40"
                    >&yen; {{ (item as any).t_price }}</span
                  >
                </div>
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
