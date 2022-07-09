<script setup lang="ts">
import {
  IRoleItem,
  IRoleRequest,
  IRoleCreateRequest
} from '@/api/module/types/role'
import EditDialog from './components/edit-dialog.vue'
import RoleManageDialog from './components/role-manage-dialog.vue'
import usePageAction from '@/hooks/usePageAction'
import useTableColumns from './config/useTableColumns'

// 查
const queryParams = ref<IRoleRequest>({
  page: 1,
  limit: 10
})
const { loading, total, list, getListData, deleteData, updateStateData } =
  usePageAction<IRoleItem>({ queryParams, module: 'role' })
const editDialogRef = ref<InstanceType<typeof EditDialog> | null>(null)
const roleManageDialogRef = ref<InstanceType<typeof RoleManageDialog> | null>(
  null
)

const handleState = async (row: IRoleItem) => {
  updateStateData(row, ['已下架', '上架成功'])
}
const handleDelete = (row: IRoleItem) => {
  const title = `是否删除 ${row.name}?`
  deleteData(row, title)
}
const handleCreated = () => {
  editDialogRef.value?.open('新建图文')
}
const handleEdit = (row: IRoleCreateRequest) => {
  editDialogRef.value?.open('编辑图文', row)
}
const handleRoleManage = (row: IRoleCreateRequest) => {
  roleManageDialogRef.value?.open('查看权限', { id: row.id })
}
const columns = useTableColumns({ handleDelete, handleEdit, handleRoleManage })

getListData()
</script>
<template>
  <el-card class="md:m-4 media" shadow="never">
    <el-button
      class="mb-4"
      type="primary"
      :loading="loading"
      @click="handleCreated"
      >新增角色
    </el-button>
    <PageTable
      :columns="columns"
      :list="list"
      :loading="loading"
      v-model:page="queryParams.page"
      v-model:limit="queryParams.limit"
      v-model:total="total"
      :get-list="getListData"
    >
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
    <RoleManageDialog
      ref="roleManageDialogRef"
      :get-list="getListData"
    ></RoleManageDialog>
  </el-card>
</template>

<style scoped lang="scss"></style>
