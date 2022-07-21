<script setup lang="ts">
import {
  IRenovationListRequest,
  statusType
} from '@/api/module/types/renovation'
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
  },
  isMobile: {
    type: Number,
    default: 1
  }
})
const emit = defineEmits<{
  (e: 'selected', data: any): void
}>()
const visible = ref(false)
const queryParams = ref<IRenovationListRequest>({
  page: 1,
  limit: 10,
  ismobile: props.isMobile as statusType
})
const { loading, list, total, getListData } = usePageAction({
  queryParams,
  module: 'school-user'
})
const currentLoading = computed(() => props.loading || loading.value)

const columns = useTableColumns()
const selectList = ref([])

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
  selectList.value = []
}
const handleConfirm = () => {
  const length = selectList.value.length
  if (length) {
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
    title="选择关联"
    top="3%"
    showBtn
    @confirm="handleConfirm"
  >
    <div>
      <PageTable
        :loading="currentLoading"
        :columns="columns"
        :get-list="getListData"
        :list="list"
        @selection-change="handleSelectionChange"
      >
        <template #user="{ row }">
          <div class="flex items-center">
            <div
              class="w-10 h-10 mr-2 rounded-full overflow-hidden object-cover"
            >
              <!-- <img :src="row.user.avatar || '/img_default.svg'" alt="" /> -->
              <el-image lazy :src="row.user.avatar" fit="cover"></el-image>
            </div>
            <div>{{ row.user.nickname || row.user.username }}</div>
          </div>
        </template>
      </PageTable>
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
