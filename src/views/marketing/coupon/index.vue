<script setup lang="ts">
import { ICoupon, ICouponRequest } from '@/api/module/types/coupon'
import EditDialog from './components/edit-dialog.vue'
import usePageAction from '@/hooks/usePageAction'
import useTableColumns from './config/useTableColumns'
import { formatDate } from '@/utils/date'
// 查
const queryParams = ref<ICouponRequest>({
  page: 1,
  limit: 10,
  status: 1
})
const { loading, total, list, getListData } = usePageAction<ICoupon>({
  queryParams,
  module: 'coupon'
})
const editDialogRef = ref<InstanceType<typeof EditDialog> | null>(null)

const handleCreated = () => {
  editDialogRef.value?.open('创建优惠券信息')
}
const handleEdit = (row: Partial<ICoupon>) => {
  editDialogRef.value?.open('编辑优惠券信息', row)
}

const columns = useTableColumns({ handleEdit })

getListData()
</script>
`
<template>
  <el-card class="md:m-4 flashale" shadow="never">
    <el-button
      class="mb-4"
      type="primary"
      :loading="loading"
      @click="handleCreated"
      >创建优惠券</el-button
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
      <template #use_course="{ row }">
        {{ row.value.title }}
      </template>
      <template #use_time="{ row }">
        {{ formatDate(new Date(row.start_time).getTime()) }}
        至
        {{ formatDate(new Date(row.end_time).getTime()) }}
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
