<script setup lang="ts">
import { ISchoolUserRequest, ISchoolUser } from '@/api/module/types/school-user'
import PageSearch from '@/components/page-search/index.vue'
import DescDialog from './components/desc-dialog.vue'
import usePageAction from '@/hooks/usePageAction'
import useTableColumns from './config/useTableColumns'
import schoolUserApi from '@/api/module/school-user'

// 查
const queryParams = ref<ISchoolUserRequest>({
  page: 1,
  limit: 10,
  keyword: ''
})
const { loading, total, list, getListData, searchData } =
  usePageAction<ISchoolUser>({ queryParams, module: 'school-user' })
const descDialogRef = ref<InstanceType<typeof DescDialog> | null>(null)

const handleStateChange = async (type: string, row: ISchoolUser) => {
  try {
    const params = {} as any
    params.id = row.school_id
    if (type === 'access') {
      row.accessLoading = true
      params.no_access = row.no_access ? 0 : 1
      await schoolUserApi.changeAccessApi(params)
    } else {
      row.commentLoading = true
      params.no_comment = row.no_comment ? 0 : 1
      await schoolUserApi.changeCommentApi(params)
    }
  } finally {
    row.accessLoading = false
    row.commentLoading = false
    await getListData()
    ElMessage({
      type: 'warning',
      message: '演示数据 ~',
      duration: 1500
    })
  }
}
const handleToDetailPage = (row: ISchoolUser) => {
  descDialogRef.value?.open('用户详情', row.id)
}
const handleSearch = (searchObj: any) => {
  queryParams.value.keyword = searchObj.search
  searchData()
}
const columns = useTableColumns({ handleToDetailPage })

getListData()
</script>
<template>
  <el-card class="md:m-4 media" shadow="never">
    <PageSearch @submit="handleSearch" :model="queryParams" show-search>
    </PageSearch>
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
        <div class="flex">
          <img
            class="rounded-full w-8"
            :src="row.user.avatar || '/img_default.svg'"
            alt=""
          />
          <div class="ml-2">{{ row.user.nickname || row.user.username }}</div>
        </div>
      </template>
      <template #comment="{ row }">
        <el-switch
          v-model="row.no_comment"
          :disabled="row.commentLoading"
          :inactive-value="1"
          :active-value="0"
          @click="handleStateChange('comment', row)"
        ></el-switch>
      </template>
      <template #access="{ row }">
        <el-switch
          v-model="row.no_access"
          :disabled="row.accessLoading"
          :inactive-value="1"
          :active-value="0"
          @click="handleStateChange('access', row)"
        ></el-switch>
      </template>
    </PageTable>
    <DescDialog ref="descDialogRef"></DescDialog>
  </el-card>
</template>

<style scoped lang="scss"></style>
