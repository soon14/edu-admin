<script setup lang="ts">
import { IFlashsale, IFlashsaleRequest } from '@/api/module/types/flashsale'
import EditDialog from './components/edit-dialog.vue'
import usePageAction from '@/hooks/usePageAction'
import useTableColumns from './config/useTableColumns'

// 查
const queryParams = ref<IFlashsaleRequest>({
  page: 1,
  limit: 10,
  status: 1
})
const { loading, total, list, getListData } = usePageAction<IFlashsale>({
  queryParams,
  module: 'flashsale'
})
const editDialogRef = ref<InstanceType<typeof EditDialog> | null>(null)

const handleCreated = () => {
  editDialogRef.value?.open('创建秒杀信息')
}
const handleEdit = (row: Partial<IFlashsale>) => {
  editDialogRef.value?.open('编辑秒杀信息', row)
}

const columns = useTableColumns({ handleEdit })

getListData()
</script>
<template>
  <el-card class="md:m-4 flashale" shadow="never">
    <el-button
      class="mb-4"
      type="primary"
      :loading="loading"
      @click="handleCreated"
      >创建秒杀</el-button
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
      <template #flashale_content="{ row }">
        <div class="course-graphics">
          <div class="course-cover">
            <el-image
              class="w-13 h-13"
              lazy
              :src="row.value.cover"
              fit="cover"
            ></el-image>
          </div>
          <div class="course-desc">
            <div class="course-title">{{ row.value.title }}</div>
            <div class="">
              价格: <span class="course-price">&yen; {{ row.price }}</span
              ><del class="ml-1 text-12px opacity-70">{{
                row.value.price
              }}</del>
            </div>
          </div>
        </div>
      </template>
      <template #status="{ row }">
        <el-tag v-if="row.status === 1" type="success">开启</el-tag>
        <el-tag v-else type="warning">关闭</el-tag>
      </template>
    </PageTable>
    <EditDialog ref="editDialogRef" :get-list="getListData"></EditDialog>
  </el-card>
</template>

<style scoped lang="scss">
.flashale {
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
        @apply text-red-600 ml-1;
      }
    }
  }
}
</style>
