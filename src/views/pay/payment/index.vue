<script setup lang="ts">
import {
  ICash,
  ICashRequest,
  ICashUpdateRequest
} from '@/api/module/types/cash'
import PageSearch from '@/components/page-search/index.vue'
import usePageAction from '@/hooks/usePageAction'
import useTableColumns from './config/useTableColumns'

const EditDialog = defineAsyncComponent(
  () => import('./components/edit-dialog.vue')
)

const stateOptions = ref([
  { label: '启用', value: 1 },
  { label: '禁用', value: 0 }
])
// 查
const queryParams = ref<ICashRequest>({
  page: 1,
  limit: 10,
  status: 1
})
const { loading, total, list, getListData, deleteData, searchData } =
  usePageAction<ICash>({ queryParams, module: 'cash' })
const editDialogRef = ref<InstanceType<typeof EditDialog> | null>(null)

const handleDelete = (row: ICash) => {
  const title = `是否删除 ${row.name}`
  deleteData(row, title)
}
const handleCreated = () => {
  editDialogRef.value?.open('新建图文')
}
const handleEdit = (row: ICashUpdateRequest) => {
  editDialogRef.value?.open('编辑图文', row)
}
const handleSearch = (searchObj: any) => {
  queryParams.value.status = searchObj.selected
  searchData()
}
const columns = useTableColumns({ handleDelete, handleEdit })

getListData()
</script>
<template>
  <el-card class="md:m-4 media" shadow="never">
    <PageSearch :model="queryParams" :select-options="stateOptions" show-select>
      <template #left>
        <el-button type="primary" :loading="loading" @click="handleCreated"
          >新增收款账号</el-button
        >
      </template>
      <template #right_append="{ selected }">
        <el-button
          class="ml-2"
          type="primary"
          :loading="loading"
          @click="handleSearch({ selected })"
          >搜索</el-button
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
