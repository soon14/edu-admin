<script setup lang="ts">
import mediaApi from '@/api/module/media'
import {
  ICourseResponse,
  ICourseListRequest,
  ICourseDeleteRequest,
  ICourseRequest
} from '@/api/module/types/course'
import { ApiEnum } from '@/constants/fetch'
import { ElFormType } from '@/types/element-plus'
import { formatDate } from '@/utils/date'
import { FormRules } from 'element-plus'
import { cloneDeep } from '@/utils/lodash/'

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
const dialogValidate = ref(false)
const dialogTitle = ref('')
const formData = ref<ICourseRequest & { id?: number | null }>({
  id: null,
  content: '',
  cover: '',
  price: 0,
  t_price: 0,
  status: 1,
  title: '',
  try: '',
  type: 'media'
})
const rules: FormRules = {}
const stateOptions = ref([
  { label: '全部', value: '' },
  { label: '已上架', value: 1 },
  { label: '已下架', value: 0 }
])
const formRef = ref<ElFormType | null>(null)
const formLoading = ref(false)
const getListData = async () => {
  loading.value = true
  try {
    const fetchApi = mediaApi[ApiEnum.LIST_API]
    const data = await fetchApi({ ...queryParams.value })
    data.items.forEach((it, index) => {
      it.custom_index =
        index + queryParams.value.limit * (queryParams.value.page - 1) + 1
    })
    list.value = data.items
    total.value = data.total
  } finally {
    loading.value = false
  }
}
// 改
const updateData = async (item: ICourseRequest) => {
  const fetchApi = mediaApi[ApiEnum.UPDATE_API]
  await fetchApi(item)
}
// 删
const deleteData = async (params: ICourseDeleteRequest) => {
  loading.value = true
  try {
    const fetchApi = mediaApi[ApiEnum.DELETE_API]
    await fetchApi(params)
  } finally {
    loading.value = false
  }
}
// 增
const createData = async (item: ICourseRequest) => {
  const fetchApi = mediaApi[ApiEnum.CREATE_API]
  await fetchApi(item)
}
const handleSearch = (e: Event) => {
  e.preventDefault()
  queryParams.value.page = 1
  getListData()
}
const handleCreated = () => {
  dialogTitle.value = '新增图文'
  dialogValidate.value = true
}
const handleEdit = (row: ICourseResponse) => {
  dialogTitle.value = '编辑图文'
  dialogValidate.value = true
  nextTick(() => {
    formData.value = cloneDeep({
      ...row,
      price: parseFloat(row.price),
      t_price: parseFloat(row.t_price)
    })
  })
}
const handleState = async (row: ICourseResponse) => {
  row.editLoading = true
  try {
    await updateData({
      ...row,
      status: row.status === 1 ? 0 : 1,
      price: parseFloat(row.price),
      t_price: parseFloat(row.t_price)
    })
  } catch (err) {
  } finally {
    row.editLoading = false
  }
  ElMessage({
    type: row.status ? 'warning' : 'success',
    message: row.status ? '已下架' : '上架成功'
  })
  await getListData()
}
const handleDelete = (row: ICourseResponse) => {
  const title = `是否删除标题为 ${row.title} 的图文吗?`
  ElMessageBox.confirm(title, '提示', {
    type: 'warning',
    confirmButtonText: '确定',
    cancelButtonText: '取消'
  }).then(async () => {
    await deleteData({ ids: [row.id] })
    ElMessage({
      type: 'success',
      message: '删除成功',
      duration: 1500
    })
    await getListData()
  })
}
const handleConfirm = async () => {
  formLoading.value = true
  try {
    if (formData.value.id) {
      await updateData({ ...formData.value })
    } else {
      await createData({ ...formData.value })
    }
  } finally {
    formLoading.value = false
  }
  ElMessage({
    type: 'success',
    message: formData.value.id ? '编辑成功' : '新增成功'
  })
  dialogValidate.value = false
  await getListData()
}
const handleClose = () => {
  formRef.value?.resetFields()
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
    <DialogBase
      :loading="formLoading"
      v-model="dialogValidate"
      :title="dialogTitle"
      show-btn
      @confirm="handleConfirm"
      @close="handleClose"
    >
      <el-form
        ref="formRef"
        :model="formData"
        :rules="rules"
        label-width="80px"
        size="default"
      >
        <el-form-item label="标题" prop="title">
          <el-input v-model="formData.title"></el-input>
        </el-form-item>
        <el-form-item label="试看内容" prop="try">
          <Editor v-model="formData.try" />
        </el-form-item>
        <el-form-item label="课程内容" prop="content">
          <Editor v-model="formData.content" />
        </el-form-item>
        <el-form-item label="课程价格" prop="price">
          <el-input-number
            v-model="formData.price"
            :min="0"
            :precision="2"
          ></el-input-number>
        </el-form-item>
        <el-form-item label="划线价格" prop="t_price">
          <el-input-number
            v-model="formData.t_price"
            :min="0"
            :precision="2"
          ></el-input-number>
        </el-form-item>
        <el-form-item label="状态" prop="status">
          <el-radio-group v-model="formData.status">
            <el-radio :label="0">下架</el-radio>
            <el-radio :label="1">上架</el-radio>
          </el-radio-group>
        </el-form-item>
      </el-form>
    </DialogBase>
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
