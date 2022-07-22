<script setup lang="ts">
import {
  IRenovationItem,
  IRenovationListRequest,
  IRenovationUpdateRequest
} from '@/api/module/types/renovation'
import EditDialog from './components/edit-dialog.vue'
import usePageAction from '@/hooks/usePageAction'
import useTableColumns from './config/useTableColumns'

// 查
const queryParams = ref<IRenovationListRequest>({
  page: 1,
  limit: 10,
  ismobile: 1
})
const { loading, total, list, getListData, deleteData } =
  usePageAction<IRenovationItem>({ queryParams, module: 'renovation' })
const editDialogRef = ref<InstanceType<typeof EditDialog> | null>(null)

const handleDelete = (row: IRenovationItem) => {
  const title = `是否删除标题为${row.title}的图文?`
  deleteData(row, title)
}
const handleCreated = () => {
  editDialogRef.value?.open('新建页面')
}
const handleEdit = (row: IRenovationUpdateRequest) => {
  editDialogRef.value?.open('编辑页面', row)
}
const router = useRouter()
// 进入装修页
const handleToDetailPage = (row: any) => {
  router.push({ name: 'MobileEdit', params: { id: row.id } })
}

const columns = useTableColumns({
  handleDelete,
  handleEdit,
  handleToDetailPage
})

getListData()
</script>
<template>
  <el-card class="md:m-4 media" shadow="never">
    <el-button
      type="primary"
      :loading="loading"
      @click="handleCreated"
      class="mb-4"
      >新增子页面</el-button
    >
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

<style scoped lang="scss"></style>
