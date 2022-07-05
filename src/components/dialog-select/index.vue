<script setup lang="ts">
import { ICourseListRequest, ICourseResponse } from '@/api/module/types/course'
import usePageAction from '@/hooks/usePageAction'
import useTableColumns from './config/useTableColumns'
const props = defineProps({
  autoClose: {
    type: Boolean,
    default: true
  },
  loading: {
    type: Boolean,
    default: false
  }
})
const emit = defineEmits<{
  (e: 'selected', data: any): void
}>()
const visible = ref(false)
const queryParams = ref<ICourseListRequest>({
  page: 1,
  limit: 10,
  type: 'media',
  status: '',
  title: ''
})
const {
  loading: listLoading,
  total,
  list,
  getListData,
  searchData
} = usePageAction<ICourseResponse>({
  queryParams,
  module: 'media'
})
const currentLoading = computed(() => props.loading || listLoading.value)
const options = [
  { label: '图文', prop: 'media' },
  { label: '音频', prop: 'audio' },
  { label: '视频', prop: 'video' }
]
const actionProp = ref('media')
const columns = useTableColumns()
const selectList = ref([])
const handleMenuClick = (prop: any) => {
  actionProp.value = prop
  queryParams.value.type = prop
  searchData()
}

watch(visible, () => {
  if (visible.value) {
    getListData()
  }
})
const handleSelectionChange = (rows: any) => {
  selectList.value = rows
}
const handleClose = () => {
  queryParams.value.page = 1
  queryParams.value.type = 'media'
  selectList.value = []
}
const handleConfirm = () => {
  if (selectList.value.length) {
    emit('selected', selectList.value)
  } else {
    visible.value = false
  }
  props.autoClose && (visible.value = false)
}
const open = () => {
  visible.value = true
}
defineExpose({ open, close: () => (visible.value = false) })
</script>

<template>
  <DialogBase
    :loading="currentLoading"
    v-model="visible"
    @close="handleClose"
    showBtn
    @confirm="handleConfirm"
  >
    <div class="flex">
      <div class="w-30 h-300px">
        <div class="menus">
          <div
            class="item"
            :class="{ active: actionProp === item.prop }"
            v-for="item in options"
            :key="item.prop"
            @click="handleMenuClick(item.prop)"
          >
            {{ item.label }}
          </div>
        </div>
      </div>
      <div class="flex-auto">
        <PageTable
          :loading="currentLoading"
          :columns="columns"
          :get-list="getListData"
          :list="list"
          @selection-change="handleSelectionChange"
        >
          <template #media="{ row }">
            <div class="course-graphics">
              <div class="course-cover">
                <img :src="row.cover || '/img_default.svg'" alt="" />
              </div>
              <div class="course-desc">
                <div class="course-title">{{ row.title }}</div>
                <div class="course-price">{{ row.price }}</div>
              </div>
            </div>
          </template>
          <template #status="{ row }">
            <el-tag type="success" v-if="row.status">上架</el-tag>
            <el-tag type="info" v-else>下架</el-tag>
          </template>
        </PageTable>
      </div>
    </div>
    <template #append>
      <Pagination
        v-model:currentPage="queryParams.page"
        v-model:total="total"
        :get-data="getListData"
      ></Pagination>
    </template>
  </DialogBase>
</template>

<style scoped lang="scss">
.item {
  padding: 8px 0;
  user-select: none;
  cursor: pointer;
  transition: color 0.2s;
}
.item.active,
.item:hover {
  color: var(--el-color-primary);
}
.menus {
  @apply absolute left-10px top-10px;
}
.course-graphics {
  @apply flex justify-center w-full;
  .course-cover {
    @apply w-14;
    img {
      @apply flex w-full;
    }
  }
  .course-desc {
    @apply flex flex-col flex-1 pl-4 justify-between text-left whitespace-nowrap;
    .course-title {
    }
    .course-price {
      @apply text-red-600;
    }
  }
}
</style>
