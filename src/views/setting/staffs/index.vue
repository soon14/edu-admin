<script setup lang="ts">
import { IStaffItem, IStaffRequest } from '@/api/module/types/staffs'
import EditDialog from './components/edit-dialog.vue'
import usePageAction from '@/hooks/usePageAction'
import useTableColumns from './config/useTableColumns'
import { formatDate } from '@/utils/date'
// 查
const queryParams = ref<IStaffRequest>({
  page: 1,
  limit: 10
})
const { loading, total, list, getListData } = usePageAction<IStaffItem>({
  queryParams,
  module: 'staffs'
})
const editDialogRef = ref<InstanceType<typeof EditDialog> | null>(null)

const handleCreated = () => {
  editDialogRef.value?.open('创建用户')
}
const handleEdit = (row: Partial<IStaffItem>) => {
  editDialogRef.value?.open('配置权限', row)
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
      >创建员工</el-button
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
      <template #user="{ row }">
        <div class="flex items-center">
          <el-image
            class="w-6 h-6 rounded-full mr-2"
            lazy
            :src="row.user.avatar"
            fit="cover"
          ></el-image>

          <div>{{ row.user.username || row.user.username }}</div>
        </div>
      </template>
      <template #roles="{ row }">
        <template v-for="(role, index) in row.roles" :key="index">
          <el-tag class="mr-1 mt-1" type="" v-if="role">{{ role.name }}</el-tag>
        </template>
        <template
          v-if="!row.roles.length || !row.roles.filter((it:any) => !!it).length"
          >无</template
        >
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
