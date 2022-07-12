<script setup lang="ts">
import { IBbsItem, IBbsListReq } from '@/api/module/types/bbs'
import EditDialog from './components/edit-dialog.vue'
import DialogSelectUser from '@/components/dialog-select-user/index.vue'
import usePageAction from '@/hooks/usePageAction'
import useTableColumns from './config/useTableColumns'
import bbsApi from '@/api/module/bbs'
// 查
const queryParams = ref<IBbsListReq>({
  page: 1,
  limit: 10
})
const { loading, total, list, getListData, deleteData, updateStateData } =
  usePageAction<IBbsItem>({ queryParams, module: 'bbs' })

const editDialogRef = ref<InstanceType<typeof EditDialog> | null>(null)
const dialogSelectUserRef = ref<InstanceType<typeof DialogSelectUser> | null>(
  null
)

const handleState = async (row: IBbsItem) => {
  updateStateData(row, ['已禁用', '已启用'])
}
const handleDelete = (row: IBbsItem) => {
  const title = `是否删除 ${row.title}?`
  deleteData(row, title)
}
const handleCreated = () => {
  editDialogRef.value?.open('新建社区')
}
const handleEdit = (row: IBbsItem) => {
  editDialogRef.value?.open('编辑社区', row)
}
const currentRow = ref<IBbsItem | null>(null)
const handleSetManager = (row: IBbsItem) => {
  currentRow.value = row
  dialogSelectUserRef.value?.open()
}
const handleSelectUser = (rows: any[]) => {
  try {
    loading.value = true
    bbsApi.setBbsManager({
      id: currentRow.value?.id as number,
      user_ids: rows.map((it) => it.user.id)
    })
    getListData()
    ElMessage({
      type: 'success',
      message: '设置成功',
      duration: 1500
    })
  } finally {
    loading.value = false
  }
}
const router = useRouter()
const handleToPage = (row: IBbsItem) => {
  router.push({ name: 'BbsPost', params: { id: row.id } })
}
const columns = useTableColumns({
  handleDelete,
  handleEdit,
  handleSetManager,
  handleToPage
})

getListData()
</script>
<template>
  <el-card class="md:m-4 media" shadow="never">
    <el-button
      class="mb-4"
      type="primary"
      :loading="loading"
      @click="handleCreated"
      >新增社区</el-button
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
      <template #manager="{ row }">
        <el-tag
          class="mr-2 mb-2"
          v-for="(item, index) in row.managers"
          :key="index"
        >
          {{ item.nickname || item.username }}
        </el-tag>
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
    <DialogSelectUser
      ref="dialogSelectUserRef"
      @selected="handleSelectUser"
    ></DialogSelectUser>
  </el-card>
</template>

<style scoped lang="scss"></style>
