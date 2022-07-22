<script setup lang="ts">
import useRenovation from '../hooks/useRenovation'
import DialogSelect from '@/components/dialog-select/index.vue'
import DialogSelectLink from '@/components/dialog-select-link/index.vue'

const { data, activeIndex } = useRenovation()

const dialogSelectRef = ref<InstanceType<typeof DialogSelect> | null>(null)
const dialogSelectLinkRef = ref<InstanceType<typeof DialogSelectLink> | null>(
  null
)

const templateData = computed(() => data.value.template[activeIndex.value].data)

const handleSetCourse = () => {
  dialogSelectRef.value?.open()
}
// 选择课程并增加到template.data中
const handleSelectedCourse = (items: any[]) => {
  ;(data.value.template[activeIndex.value].data as any[]).push(...items)
}

const handleCloseCourse = (index: number) => {
  ;(data.value.template[activeIndex.value].data as any[]).splice(index, 1)
}
const handleSetLink = () => {
  dialogSelectLinkRef.value?.open()
}
const handleSelectedLink = (items: any[]) => {
  data.value.template[activeIndex.value].more = items[0]
}
const handleCloseLink = () => {
  data.value.template[activeIndex.value].more = null
}
</script>

<template>
  <div class="w-120">
    <el-form>
      <el-form-item label="类型">
        <el-radio-group v-model="data.template[activeIndex].listType">
          <el-radio label="one">单栏</el-radio>
          <el-radio label="two">多栏</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="标题">
        <el-input
          placeholder="请输入标题"
          v-model="data.template[activeIndex].title"
        ></el-input>
      </el-form-item>
      <el-form-item label="更多">
        <el-radio-group v-model="data.template[activeIndex].showMore">
          <el-radio :label="true">显示</el-radio>
          <el-radio :label="false">隐藏</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="更多链接">
        <div class="flex flex-col">
          <el-button class="mr-4" type="primary" @click="handleSetLink"
            >关联链接</el-button
          >
          <div class="mt-4">
            <el-alert
              v-if="data.template[activeIndex].more?.title"
              type="success"
              @close="handleCloseLink"
              :title="data.template[activeIndex].more?.title"
            ></el-alert>
          </div>
        </div>
      </el-form-item>
      <el-form-item label="课程列表">
        <el-button type="primary" @click="handleSetCourse">关联课程</el-button>
      </el-form-item>
    </el-form>
    <div class="template-list">
      <div class="list-box">
        <Draggable
          v-model="(data.template[activeIndex].data as any[])"
          :options="{ handle: '.move' }"
        >
          <template v-for="(item, index) in templateData" :key="index">
            <div class="flex items-center">
              <i class="fas fa-maximize move select-none cursor-move pl-4"></i>
              <div class="item el-card flex-auto">
                <div class="img-box">
                  <img :src="(item as any).cover" alt="" />
                </div>
                <div class="desc">
                  <div class="title">{{ (item as any).title }}</div>
                  <div class="price">
                    <span class="red">&yen; {{ (item as any).price }}</span>
                    <span class="del">&yen; {{ (item as any).t_price }}</span>
                    <el-popconfirm
                      title="确定删除 ？"
                      @confirm="handleCloseCourse(index)"
                    >
                      <template #reference>
                        <i
                          class="fas fa-xmark float-right mr-3 cursor-pointer"
                        ></i>
                      </template>
                    </el-popconfirm>
                  </div>
                </div>
              </div>
            </div>
          </template>
        </Draggable>
      </div>
    </div>
    <DialogSelect
      ref="dialogSelectRef"
      @selected="handleSelectedCourse"
    ></DialogSelect>
    <DialogSelectLink
      ref="dialogSelectLinkRef"
      @selected="handleSelectedLink"
    ></DialogSelectLink>
  </div>
</template>

<style scoped lang="scss">
.template-list {
  @apply select-none;
  .list-box {
    .item {
      @apply flex h-30 m-4;
      .img-box {
        @apply object-cover w-30 overflow-hidden mr-2;
        img {
          @apply w-full;
        }
      }
      .desc {
        @apply flex flex-auto flex-col  h-30 justify-between;
        .title {
          @apply mt-1;
        }
        .price {
          @apply mb-1 w-full;
          .red {
            @apply text-red-600 mr-1;
          }
          .del {
            @apply text-sm opacity-60;
            text-decoration: line-through;
          }
        }
      }
    }
    &.one {
      @apply flex flex-wrap;
      .item {
        @apply flex-col m-0 mt-21px ml-21px h-66;
        width: 43%;
        .img-box {
          @apply mr-0 w-full;
        }
        .desc {
          @apply h-10 pl-2 box-border p-2;
          .title {
            // @apply mt-2;
          }
          .price {
            // @apply mt-2;
          }
        }
      }
    }
  }
}
.move {
  transform: rotate(45deg);
  transform-origin: center;
}
</style>
<script lang="ts">
export default {
  name: 'CanvasList'
}
</script>
