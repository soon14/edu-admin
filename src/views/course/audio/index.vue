<script setup lang="ts">
import {
  ICourseResponse,
  ICourseListRequest,
  ICourseRequest
} from '@/api/module/types/course'
import PageSearch from '@/components/page-search/index.vue'
import EditDialog from './components/edit-dialog.vue'
import usePageAction from '@/hooks/usePageAction'
import useTableColumns from './config/useTableColumns'
const stateOptions = ref([
  { label: '全部', value: '' },
  { label: '已上架', value: 1 },
  { label: '已下架', value: 0 }
])
// 查
const queryParams = ref<ICourseListRequest>({
  page: 1,
  limit: 10,
  type: 'audio',
  status: '',
  title: ''
})
const {
  loading,
  total,
  list,
  getListData,
  deleteData,
  updateStateData,
  searchData
} = usePageAction<ICourseResponse>({ queryParams, module: 'media' })
const editDialogRef = ref<InstanceType<typeof EditDialog> | null>(null)

const handleState = async (row: ICourseResponse) => {
  updateStateData(row, ['已下架', '上架成功'])
}
const handleDelete = (row: ICourseResponse) => {
  const title = `是否删除标题为${row.title}的音频?`
  deleteData(row, title)
}
const handleCreated = () => {
  editDialogRef.value?.open('新建音频')
}
const handleEdit = (row: ICourseRequest) => {
  editDialogRef.value?.open('编辑音频', row)
}
const handleSearch = (searchObj: any) => {
  queryParams.value.status = searchObj.selected
  queryParams.value.title = searchObj.search
  searchData()
}
const columns = useTableColumns({ handleDelete, handleEdit })

getListData()
</script>
<template>
  <el-card class="md:m-4 media" shadow="never">
    <PageSearch
      @submit="handleSearch"
      :model="queryParams"
      :select-options="stateOptions"
      show-search
      show-select
    >
      <template #left>
        <el-button type="primary" :loading="loading" @click="handleCreated"
          >新增音频</el-button
        >
      </template>
    </PageSearch>
    <PageTable
      :columns="columns"
      :list="list"
      :loading="loading"
      v-model:page="queryParams.page"
      v-model:limit="queryParams.limit"
      v-model:total="total"
      :get-list="getListData"
    >
      <template #media="{ row }">
        <div class="course-graphics">
          <div class="course-cover">
            <el-image
              class="w-14 h-14"
              lazy
              :src="row.cover"
              fit="cover"
            ></el-image>
          </div>
          <div class="course-desc">
            <div class="course-title">{{ row.title }}</div>
            <div class="course-price">&yen; {{ row.price }}</div>
          </div>
        </div>
      </template>
      <template #status="{ row }">
        <el-switch
          v-model="row.status"
          :disabled="row.stateLoading"
          :inactive-value="0"
          :active-value="1"
          @click="handleState(row)"
        ></el-switch>
      </template>
    </PageTable>
    <EditDialog ref="editDialogRef" :get-list="getListData"></EditDialog>
  </el-card>
</template>

<style scoped lang="scss">
.media {
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
}
</style>
