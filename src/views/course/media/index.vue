<script setup lang="ts">
import mediaApi from '@/api/module/media'
import {
  ICourseResponse,
  ICourseListRequest,
  ICourseDeleteRequest
} from '@/api/module/types/course'
import { ApiEnum } from '@/constants/fetch'
import { formatDate } from '@/utils/date'
// 查
const queryParams = ref<ICourseListRequest>({
  page: 1,
  limit: 10,
  type: 'media',
  status: '',
  title: ''
})
const list = ref<ICourseResponse[]>([])
const total = ref(0)
const loading = ref(false)
const stateOptions = ref([
  { label: '全部', value: '' },
  { label: '已上架', value: 1 },
  { label: '已下架', value: 0 }
])
const getListData = async () => {
  loading.value = true
  try {
    const fetchApi = mediaApi[ApiEnum.LIST_API]
    const data = await fetchApi({ ...queryParams.value })
    list.value = data.items
    total.value = data.total
    console.log(data)
  } finally {
    loading.value = false
  }
}
// 改
const updateData = async (item: ICourseResponse) => {
  loading.value = true
  try {
    const fetchApi = mediaApi[ApiEnum.UPDATE_API]
    await fetchApi(item)
    ElMessage({
      type: 'success',
      message: '修改成功'
    })
  } finally {
    loading.value = false
  }
}
// 删
const deleteData = async (params: ICourseDeleteRequest) => {
  loading.value = true
  try {
    const fetchApi = mediaApi[ApiEnum.DELETE_API]
    await fetchApi(params)
    ElMessage({
      type: 'success',
      message: '删除成功'
    })
  } finally {
    loading.value = false
  }
}
// 增
const createdData = async (item: ICourseResponse) => {
  loading.value = true
  try {
    const fetchApi = mediaApi[ApiEnum.UPDATE_API]
    await fetchApi(item)
    ElMessage({
      type: 'success',
      message: '新增成功'
    })
  } finally {
    loading.value = false
  }
}

const handleEdit = (row: ICourseResponse) => {}
const handleState = (row: ICourseResponse) => {}
const handleDelete = (row: ICourseResponse) => {}
getListData()
</script>

<template>
  <el-card class="m-4 media" shadow="never">
    <div class="media-header mb-4">
      <el-row>
        <el-col :span="24" :md="12"
          ><el-button type="primary" :loading="loading"
            >新增图文</el-button
          ></el-col
        >
        <el-col :span="24" :md="12">
          <div class="flex md:justify-end mt-2 md:mt-0">
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
            <el-button type="primary" plain :loading="loading">搜索</el-button>
          </div>
        </el-col>
      </el-row>
    </div>
    <el-table :data="list" v-loading="loading">
      <el-table-column
        align="center"
        header-align="center"
        label="#"
        type="index"
      ></el-table-column>
      <el-table-column label="图文内容" min-width="200px">
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
      ></el-table-column>
      <el-table-column
        align="center"
        header-align="center"
        label="状态"
        width="80px"
      >
        <template #default="{ row }">
          <el-tag v-if="row.status" type="success">已上架</el-tag>
          <el-tag v-else type="warning">已下架</el-tag>
        </template>
      </el-table-column>
      <el-table-column
        align="center"
        header-align="center"
        label="创建时间"
        min-width="160px"
      >
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
          <el-row>
            <el-col :span="24" :md="8">
              <el-button type="primary" plain @click="handleState(row)"
                >上架</el-button
              ></el-col
            >
            <el-col :span="24" :md="8" class="my-1 md:my-0"
              ><el-button type="primary" plain @click="handleEdit(row)">
                编辑
              </el-button></el-col
            >
            <el-col :span="24" :md="8">
              <el-button type="primary" plain @click="handleDelete(row)"
                >删除</el-button
              ></el-col
            >
          </el-row>
        </template>
      </el-table-column>
    </el-table>
    <Pagination
      v-model:currentPage="queryParams.page"
      v-model:total="total"
      v-model:pageSize="queryParams.limit"
      :get-data="getListData"
    ></Pagination>
  </el-card>
</template>

<style scoped lang="scss">
.media {
  .media-header {
  }
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
