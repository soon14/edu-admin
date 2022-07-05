<script setup lang="ts">
import {
  ICourseResponse,
  ICourseListRequest,
  ICourseRequest
} from '@/api/module/types/course'

import { formatDate } from '@/utils/date'
import EditDialog from './components/edit-dialog.vue'
import usePageAction from '@/hooks/usePageAction'

const stateOptions = ref([
  { label: '全部', value: '' },
  { label: '已上架', value: 1 },
  { label: '已下架', value: 0 }
])
// 查
const queryParams = ref<ICourseListRequest>({
  page: 1,
  limit: 10,
  type: 'media',
  status: '',
  title: ''
})
const {
  loading,
  total,
  list,
  getListData,
  deleteData,
  updateStateData,
  handleSearch
} = usePageAction<ICourseResponse>({ queryParams, module: 'media' })
const editDialogRef = ref<InstanceType<typeof EditDialog> | null>(null)

const handleState = async (row: ICourseResponse) => {
  updateStateData(row, ['已下架', '上架成功'])
}
const handleDelete = (row: ICourseResponse) => {
  const title = `是否删除标题为${row.title}的图文?`
  deleteData(row, title)
}
const handleCreated = () => {
  editDialogRef.value?.open()
}
const handleEdit = (row: ICourseRequest) => {
  editDialogRef.value?.open(row)
}
getListData()
</script>

<template>
  <el-card class="md:m-4 media" shadow="never">
    <div class="media-header mb-4">
      <el-form @submit="handleSearch">
        <el-row>
          <el-col :span="24" :md="12"
            ><el-button type="primary" :loading="loading" @click="handleCreated"
              >新增图文</el-button
            ></el-col
          >
          <el-col :span="24" :md="12">
            <div class="flex lg:justify-end mt-2 lg:mt-0">
              <el-select
                class="w-88px"
                v-model="queryParams.status"
                placeholder="请选择状态"
              >
                <el-option
                  v-for="item in stateOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                >
                </el-option>
              </el-select>
              <el-input
                class="w-150px md:w-240px mx-2"
                v-model="queryParams.title"
                type="text"
                clearable
                placeholder="标题"
              ></el-input>
              <el-button
                type="primary"
                plain
                :loading="loading"
                native-type="submit"
                >搜索</el-button
              >
            </div>
          </el-col>
        </el-row>
      </el-form>
    </div>
    <el-table
      :data="list"
      v-loading="loading"
      class="w-full"
      table-layout="auto"
    >
      <el-table-column
        align="center"
        header-align="center"
        label="#"
        prop="custom_index"
        width="100px"
      ></el-table-column>
      <el-table-column label="图文内容" width="400px">
        <template #default="{ row }">
          <div class="course-graphics">
            <div class="course-cover">
              <img :src="row.cover || '/img_default.svg'" alt="" />
            </div>
            <div class="course-desc">
              <div class="course-title">{{ row.title }}</div>
              <div class="course-price">{{ row.price }}</div>
            </div>
          </div>
        </template>
      </el-table-column>
      <el-table-column
        align="center"
        header-align="center"
        label="订阅量"
        prop="sub_count"
        width="200px"
      ></el-table-column>
      <el-table-column
        align="center"
        header-align="center"
        label="状态"
        width="200px"
      >
        <template #default="{ row }">
          <el-tag v-if="row.status" type="success">已上架</el-tag>
          <el-tag v-else type="warning">已下架</el-tag>
        </template>
      </el-table-column>
      <el-table-column align="center" header-align="center" label="创建时间">
        <template #default="{ row }">
          <div class="whitespace-nowrap">
            {{ formatDate(row.created_time) }}
          </div>
        </template>
      </el-table-column>
      <el-table-column
        align="center"
        header-align="center"
        label="操作"
        fixed="right"
      >
        <template #default="{ row }">
          <el-space wrap class="text-center">
            <el-button
              class="ml-2"
              :type="!!row.status ? 'info' : 'success'"
              plain
              @click="handleState(row)"
              :disabled="row.editLoading"
              >{{ !!row.status ? '下架' : '上架' }}</el-button
            >
            <el-button
              class="ml-2"
              type="primary"
              plain
              @click="handleEdit(row)"
            >
              编辑
            </el-button>
            <el-button
              class="ml-2"
              type="danger"
              plain
              @click="handleDelete(row)"
              >删除</el-button
            >
          </el-space>
        </template>
      </el-table-column>
    </el-table>
    <Pagination
      v-model:currentPage="queryParams.page"
      v-model:total="total"
      v-model:pageSize="queryParams.limit"
      :get-data="getListData"
    ></Pagination>
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
