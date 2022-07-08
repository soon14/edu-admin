<script setup lang="ts">
import { IOrderRequest, IOrder } from '@/api/module/types/order'
import PageSearch from '@/components/page-search/index.vue'
import usePageAction from '@/hooks/usePageAction'
import useTableColumns from './config/useTableColumns'
import { getTitle } from '@/api/utils/data'
// @ts-ignore
import excelUtils from '@/utils/excel'

import exportMap from './config/map'
import { cloneDeep } from 'lodash'

const stateOptions = ref([
  { label: '待支付', value: 'pedding' },
  { label: '成功', value: 'success' },
  { label: '失败', value: 'fail' }
])
// 查
const queryParams = ref<IOrderRequest>({
  page: 1,
  limit: 10,
  status: 'success',
  no: ''
})
const payStatusMap = {
  pendding: '待支付',
  success: '已支付',
  fail: '支付失败',
  closed: '支付失败'
}
const payTypeMap = {
  default: '默认',
  group: '拼团'
}
const payMethodMap = {
  free: '免费',
  wechat: '微信'
}

const selected = ref<IOrder[]>([])
const selectionChange = (rows: IOrder[]) => {
  selected.value = rows
}

const { loading, total, list, getListData, deleteData, searchData } =
  usePageAction<IOrder>({ queryParams, module: 'order' })

const handleDelete = (row: IOrder) => {
  const title = `是否删除订单号 ${row.no}?`
  deleteData(row, title)
}
const handleExport = () => {
  const selectedCopy = cloneDeep(selected.value)
  selectedCopy.forEach((item) => {
    item.pay_method = (payMethodMap as any)[item.pay_method]
    item.status = (payStatusMap as any)[item.status]
    item.type = (payTypeMap as any)[item.type]
  })
  const enHeaders = [
    'no',
    'title',
    'type',
    'status',
    'total_price',
    'price',
    'pay_method',
    'created_time',
    'pay_time'
  ]
  const chHeaders = excelUtils.formatChineseHeader(enHeaders, exportMap())
  const resultData = excelUtils.formatJsonByHeader(
    selectedCopy,
    enHeaders,
    exportMap()
  )
  // @ts-ignore
  import('@/utils/excel/utils/Export2Excel.js').then((excel) => {
    excel.export_json_to_excel({
      header: chHeaders, // 表头 必填
      data: resultData, // 具体数据 必填
      filename: '订单excel', // 非必填
      autoWidth: true, // 非必填
      bookType: 'xlsx' // 非必填
    })
  })
}

const handleSearch = (searchObj: any) => {
  queryParams.value.status = searchObj.selected
  queryParams.value.no = searchObj.search
  searchData()
}
const columns = useTableColumns({ handleDelete })
watch(list, () => {
  list.value.forEach((it) => {
    it.title = getTitle()
  })
})
getListData()
</script>
<template>
  <el-card class="md:m-4 media" shadow="never">
    <PageSearch
      @submit="handleSearch"
      :model="queryParams"
      :select-options="stateOptions"
      show-search
      show-select
    >
      <template #left>
        <el-button
          type="primary"
          :loading="loading"
          @click="handleExport"
          :disabled="!selected.length"
          >导出选中
        </el-button>
      </template>
    </PageSearch>
    <PageTable
      :columns="columns"
      :list="list"
      :loading="loading"
      v-model:page="queryParams.page"
      v-model:limit="queryParams.limit"
      v-model:total="total"
      :get-list="getListData"
      @selection-change="selectionChange"
    >
      <template #type="{ row }">
        {{ (payTypeMap as any)[row.type] || '默认支付' }}
      </template>
      <template #status="{ row }">
        {{ (payStatusMap as any)[row.status] }}
      </template>
      <template #pay_method="{ row }">
        {{ (payMethodMap as any)[row.pay_method] }}
      </template>
    </PageTable>
  </el-card>
</template>

<style scoped lang="scss"></style>
