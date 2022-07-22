<script setup lang="ts">
import { IBook, IBookListReq } from '@/api/module/types/book'
import PageSearch from '@/components/page-search/index.vue'
import EditDialog from './components/edit-dialog.vue'
import usePageAction from '@/hooks/usePageAction'
import useTableColumns from './config/useTableColumns'
const stateOptions = ref([
  { label: '全部', value: '' },
  { label: '启用', value: 1 },
  { label: '禁用', value: 0 }
])
// 查
const queryParams = ref<IBookListReq>({
  page: 1,
  limit: 10,
  status: '',
  keyword: ''
})
const {
  loading,
  total,
  list,
  getListData,
  deleteData,
  updateStateData,
  searchData
} = usePageAction<IBook>({ queryParams, module: 'book' })
const editDialogRef = ref<InstanceType<typeof EditDialog> | null>(null)

const handleState = async (row: IBook) => {
  updateStateData(row, ['已下架', '已上架'])
}
const handleCreated = () => {
  editDialogRef.value?.open('新建图文')
}
const handleEdit = (row: IBook) => {
  editDialogRef.value?.open('编辑图文', row)
}

const router = useRouter()
const handleToPage = (row: IBook) => {
  // router.push({
  //   name: 'BookDetail',
  //   query: {
  //     id: row.id,
  //     book_title: row.title
  //   }
  // })
  router.push({
    name: 'BookDetail',
    params: {
      id: row.id,
      book_title: row.title
    }
  })
}
const handleSearch = (searchObj: any) => {
  queryParams.value.status = searchObj.selected
  queryParams.value.keyword = searchObj.search
  searchData()
}
const columns = useTableColumns({ handleToPage, handleEdit })

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
          >新增图文</el-button
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
      <template #book="{ row }">
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
            <div class="course-title">&yen; {{ row.title }}</div>
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
