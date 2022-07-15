<script setup lang="ts">
import { ITestItem, ITestListReq } from '@/api/module/types/user-test'
import usePageAction from '@/hooks/usePageAction'
import useTableColumns from './config/useTableColumns'
import EditDialog from './components/edit-dialog.vue'

const answerOptions = ref([
  { label: '全部答题', value: '' },
  { label: '答题中', value: 0 },
  { label: '答题完成', value: 1 }
])
const readOptions = ref([
  { label: '全部阅卷', value: '' },
  { label: '未阅', value: 0 },
  { label: '已阅', value: 1 }
])
// 查
const queryParams = ref<ITestListReq>({
  page: 1,
  limit: 10,
  answer_status: '', // 回答状态：0否1是
  read_status: '' // 阅卷状态：0否1是
})
const { loading, total, list, getListData, deleteData, searchData } =
  usePageAction<ITestItem>({ queryParams, module: 'user-test' })

const handleDelete = (row: ITestItem) => {
  const title = `是否删除?`
  deleteData(row, title)
}
const editDialogRef = ref<InstanceType<typeof EditDialog> | null>(null)
// 阅卷
const handleToPage = (row: ITestItem) => {
  editDialogRef.value?.open('阅卷', row)
}
const handleSearch = () => {
  searchData()
}
const columns = useTableColumns({ handleDelete })

getListData()
</script>
<template>
  <el-card class="md:m-4 media" shadow="never">
    <el-header>
      <div class="flex justify-between items-center">
        <el-page-header title="返回" @back="$router.back()"></el-page-header>
        <div class="flex items-center">
          <el-select
            class="w-144px mr-2"
            v-model="queryParams.answer_status"
            placeholder="答题状态"
          >
            <el-option
              v-for="item in (answerOptions as any)"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
          <el-select
            class="w-144px mr-2"
            v-model="queryParams.read_status"
            placeholder="阅卷状态"
          >
            <el-option
              v-for="item in (readOptions as any)"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
          <el-button type="primary" @click="handleSearch">搜索</el-button>
        </div>
      </div>
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
      <template #user="{ row }">
        {{ row.user.nickname || row.user.username }}
      </template>
      <template #title="{ row }">
        {{ row.testpaper.title }}
      </template>
      <template #answer_status="{ row }">
        <el-tag type="success" v-if="row.answer_status">答题完成</el-tag>
        <el-tag type="info" v-else>未答题</el-tag>
      </template>
      <template #read_status="{ row }">
        <el-tag type="success" v-if="row.read_status">是</el-tag>
        <el-tag type="info" v-else>否</el-tag>
      </template>
      <template #btn-prefix="{ row }">
        <el-button
          :type="!!row.read_status ? '' : 'primary'"
          :disabled="!!row.read_status"
          @click="handleToPage(row)"
          >{{ !!row.read_status ? '已阅' : '阅卷' }}</el-button
        >
      </template>
    </PageTable>
    <EditDialog ref="editDialogRef" :get-list="getListData"></EditDialog>
  </el-card>
</template>

<style scoped lang="scss"></style>
