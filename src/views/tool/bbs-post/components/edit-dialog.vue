<script setup lang="ts">
import usePageAction from '@/hooks/usePageAction'
import { ICommentListReq } from '@/api/module/types/post-comment'
import useTableColumns from './config/useTableColumns'
import postCommentApi from '@/api/module/post-comment'
import { DELETE_API } from '@/constants/fetch'

const route = useRoute()
const postId = computed(() => route.params.id)

const queryParams = ref<ICommentListReq>({
  page: 1,
  limit: 10,
  post_id: null
})
const { loading, list, total, getListData } = usePageAction({
  queryParams,
  module: 'post-comment'
})
const visible = ref(false)
const dialogTitle = ref('')

const formLoading = ref(false)

const open = (title: string, id: number) => {
  visible.value = true
  dialogTitle.value = title
  queryParams.value.post_id = id
  getListData()
}
const handleDelete = (row: any) => {
  ElMessageBox.confirm('确定删除该评论吗？', '提示', {
    type: 'warning',
    confirmButtonText: '确定',
    cancelButtonText: '取消'
  }).then(async () => {
    await postCommentApi[DELETE_API]({
      post_id: Number(postId.value),
      ids: [row.id]
    })
    ElMessage({
      type: 'success',
      message: '删除成功',
      duration: 1500
    })
    await getListData()
  })
}
const columns = useTableColumns({ handleDelete })
defineExpose({ open })
</script>

<template>
  <div class="edit-dialog">
    <DialogBase
      :loading="formLoading"
      v-model="visible"
      :title="dialogTitle"
      show-btn
    >
      <PageTable
        :loading="loading"
        v-model:page="queryParams.page"
        :columns="columns"
        :list="list"
        :get-list="getListData"
        :total="total"
      >
        <template #content="{ row }">
          {{ row.content }}
        </template>
        <template #user="{ row }">
          {{ row.user.nickname || row.user.username }}
        </template>
      </PageTable>
    </DialogBase>
  </div>
</template>

<style scoped lang="scss"></style>
