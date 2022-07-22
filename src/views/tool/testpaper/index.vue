<script setup lang="ts">
import { ITestItem, ITestListReq } from '@/api/module/types/testpaper'
import PageSearch from '@/components/page-search/index.vue'
import EditDialog from './components/edit-dialog.vue'
import usePageAction from '@/hooks/usePageAction'
import useTableColumns from './config/useTableColumns'
// 查
const queryParams = ref<ITestListReq>({
  page: 1,
  limit: 10,
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
} = usePageAction<ITestItem>({ queryParams, module: 'testpaper' })
const editDialogRef = ref<InstanceType<typeof EditDialog> | null>(null)

const handleDelete = (row: ITestItem) => {
  const title = `是否删除标题为${row.title}的图文?`
  deleteData(row, title)
}
const handleCreated = () => {
  // editDialogRef.value?.open('新建图文')
  router.push({ name: 'TestpaperForm' })
}
const router = useRouter()
const handleToPage = (row: ITestItem) => {
  router.push({ name: 'TestpaperForm', params: { id: row.id } })
}
const handleSearch = (searchObj: any) => {
  queryParams.value.title = searchObj.search
  searchData()
}

const handleToPageManage = () => {
  router.push({
    name: 'TestpaperTest'
  })
}
const columns = useTableColumns({ handleDelete, handleToPage })

getListData()
</script>
<template>
  <el-card class="md:m-4 media" shadow="never">
    <PageSearch @submit="handleSearch" :model="queryParams" show-search>
      <template #left>
        <el-button type="success" :loading="loading" @click="handleCreated"
          >手动组卷</el-button
        >
        <el-button type="primary" :loading="loading" @click="handleToPageManage"
          >考试管理</el-button
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
            <img :src="row.cover || '/img_default.svg'" alt="" />
          </div>
          <div class="course-desc">
            <div class="course-title">&yen; {{ row.title }}</div>
            <div class="course-price">&yen; {{ row.price }}</div>
          </div>
        </div>
      </template>
      <template #status="{ row }">
        <el-tag type="success" v-if="row.status">是</el-tag>
        <el-tag type="danger" v-else>否</el-tag>
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
