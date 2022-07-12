<script setup lang="ts">
import { IPostItem, IPostListReq } from '@/api/module/types/bbs-post'
import EditDialog from './components/edit-dialog.vue'
import usePageAction from '@/hooks/usePageAction'
import useTableColumns from './config/useTableColumns'
import bbsPostApi from '@/api/module/bbs-post'
import { UPDATE_STATE_API, DELETE_API } from '@/constants/fetch'

const route = useRoute()
const bbsId = computed(() => route.params.id)
// 查
const queryParams = ref<IPostListReq>({
  page: 1,
  limit: 10,
  bbs_id: Number(bbsId.value)
})
const { loading, total, list, getListData } = usePageAction<IPostItem>({
  queryParams,
  module: 'bbs-post'
})
const editDialogRef = ref<InstanceType<typeof EditDialog> | null>(null)

const handleState = async (row: IPostItem) => {
  loading.value = true
  try {
    await bbsPostApi[UPDATE_STATE_API]({
      id: Number(row.id),
      is_top: Number(row.is_top) as any
    })
    const message = row.is_top ? '已置顶' : '取消置顶'
    const type = row.is_top ? 'success' : 'warning'
    ElMessage({
      type,
      message,
      duration: 1500
    })
  } finally {
    await getListData()
    loading.value = false
  }
}
const handleDelete = async (row: IPostItem) => {
  ElMessageBox.confirm('确定删除吗？', '提示', {
    type: 'warning',
    confirmButtonText: '确定',
    cancelButtonText: '取消'
  }).then(async () => {
    loading.value = true
    try {
      await bbsPostApi[DELETE_API]({
        bbs_id: Number(bbsId.value),
        ids: [row.id]
      })
      ElMessage({
        type: 'success',
        message: '删除成功',
        duration: 1500
      })
      await getListData()
    } finally {
      loading.value = false
    }
  })
}

const handleEdit = (row: IPostItem) => {
  editDialogRef.value?.open('查看回复', row.id)
}
const columns = useTableColumns({ handleDelete, handleEdit })

getListData()
</script>
<template>
  <el-card class="md:m-4 media" shadow="never">
    <el-header>
      <el-page-header title="返回" @back="$router.back()"></el-page-header>
    </el-header>
    <PageTable
      :columns="columns"
      :list="list"
      :loading="loading"
      v-model:page="queryParams.page"
      v-model:limit="queryParams.limit"
      v-model:total="total"
      :get-list="getListData"
    >
      <template #post="{ row }">
        <template v-for="(item, index) in row.content" :key="index">
          <el-popover placement="bottom" width="300px">
            <template #reference>
              <el-tag class="mr-2">{{ item.text }}</el-tag>
            </template>
            <div class="text-gray-800 mb-2">{{ item.text }}</div>
            <div class="flex flex-wrap" v-if="!!item.images?.length">
              <template v-for="image in item.images" :key="image">
                <img :src="image" class="w-20 h-20 mb-2 ml-2" alt="" />
              </template>
            </div>
          </el-popover>
        </template>
      </template>
      <template #user="{ row }">
        {{ row.user.nickname || row.user.username }}
      </template>
      <template #top="{ row }">
        <el-switch
          v-model="row.is_top"
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
