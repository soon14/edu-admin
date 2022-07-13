<script setup lang="ts">
import { IQuestionItem, IQuestionListReq } from '@/api/module/types/question'
import PageSearch from '@/components/page-search/index.vue'
import EditDialog from './components/edit-dialog.vue'
import usePageAction from '@/hooks/usePageAction'
import useTableColumns from './config/useTableColumns'
import { questionTypes } from '@/constants/question'
import questionApi from '@/api/module/question'
import { DELETE_API } from '@/constants/fetch'

const stateOptions = ref([
  { label: '全部', value: '' },
  { label: '单选', value: 'radio' },
  { label: '多选', value: 'checkbox' },
  { label: '判断', value: 'trueOrfalse' },
  { label: '问答', value: 'answer' },
  { label: '填空', value: 'completion' }
])
// 查
const queryParams = ref<IQuestionListReq>({
  page: 1,
  limit: 10,
  type: '',
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
} = usePageAction<IQuestionItem>({ queryParams, module: 'question' })
const editDialogRef = ref<InstanceType<typeof EditDialog> | null>(null)

const handleState = async (row: IQuestionItem) => {
  updateStateData(row, ['已下架', '上架成功'])
}
const handleDelete = (row: IQuestionItem) => {
  const title = `是否删除标题为${row.title}的图文?`
  deleteData(row, title)
}

const selectedRows = ref<IQuestionItem[]>([])

const handleSelectionChange = (rows: IQuestionItem[]) => {
  selectedRows.value = rows
}
const handleBatchDelete = async () => {
  const title = `是否批量删除该 ${selectedRows.value.length} 项数据?`
  ElMessageBox.confirm(title, '提示', {
    type: 'warning',
    confirmButtonText: '确定',
    cancelButtonText: '取消'
  }).then(async () => {
    try {
      loading.value = true
      const ids = selectedRows.value.map((it) => it.id as number)
      await questionApi[DELETE_API]({ ids })
      await getListData()
    } finally {
      loading.value = false
    }
  })
}

const handleCreated = () => {
  editDialogRef.value?.open('新建图文')
}
const handleEdit = (row: IQuestionItem) => {
  editDialogRef.value?.open('编辑图文', row)
}
const handleSearch = (searchObj: any) => {
  queryParams.value.type = searchObj.selected
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
          >新增图文</el-button
        >
        <el-button type="primary" :loading="loading" @click="handleBatchDelete"
          >批量删除</el-button
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
      @selection-change="handleSelectionChange"
    >
      <template #title="{ row }">
        <span v-html="row.title"></span>
      </template>
      <template #type="{ row }"> {{ questionTypes[row.type] }}</template>
    </PageTable>
    <EditDialog ref="editDialogRef" :get-list="getListData"></EditDialog>
  </el-card>
</template>

<style scoped lang="scss"></style>
