<script setup lang="ts">
import EditDialog from './components/edit-dialog.vue'
import usePageAction from '@/hooks/usePageAction'
import useTableColumns from './config/useTableColumns'
import {
  ICashconfirm,
  ICashconfirmRequest
} from '@/api/module/types/cashconfirm'
// 查
const queryParams = ref<ICashconfirmRequest>({
  page: 1,
  limit: 10
})
const { loading, total, list, getListData, updateStateData } =
  usePageAction<ICashconfirm>({ queryParams, module: 'cashconfirm' })
const editDialogRef = ref<InstanceType<typeof EditDialog> | null>(null)

const handleGetCash = () => {
  editDialogRef.value?.open()
}

const columns = useTableColumns()

getListData()
</script>
<template>
  <div class="md:m-4">
    <el-row :gutter="10">
      <el-col :span="24" :md="8">
        <el-card shadow="never">
          <template #header>
            <div class="flex justify-between">
              可用余额(元)
              <el-button
                type="primary"
                size="small"
                :loading="loading"
                @click="handleGetCash"
                >申请提现</el-button
              >
            </div>
          </template>
          100.00
        </el-card>
      </el-col>
      <el-col :span="24" :md="8">
        <el-card shadow="never">
          <template #header> 累计收入(元) </template>
          99999.00
        </el-card>
      </el-col>
      <el-col :span="24" :md="8">
        <el-card shadow="never">
          <template #header> 待结算金额(元) </template>
          5000.00
        </el-card>
      </el-col>
    </el-row>
  </div>
  <el-card class="md:m-4" shadow="never">
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
        <el-tag type="success" v-if="!!row.status">已通过</el-tag>
        <el-tag type="warning" v-else>审核中</el-tag>
      </template>
    </PageTable>
    <EditDialog
      ref="editDialogRef"
      :get-list="getListData"
      :max-price="100"
    ></EditDialog>
  </el-card>
</template>

<style scoped lang="scss"></style>
