<script setup lang="ts">
import {
  IColumnContentsListRequest,
  IColumnContent
} from '@/api/module/types/column-content'
import PageSearch from '@/components/page-search/index.vue'
import DialogSelect from '@/components/dialog-select/index.vue'
import usePageAction from '@/hooks/usePageAction'
import useTableColumns from './config/useTableColumns'
import axios from 'axios'
import { courseTypes } from '@/constants/course'
import DetailHeader from './components/detail-header.vue'
import { IColumnDescResponse } from '@/api/module/types/column'
import columnContentApi from '@/api/module/column-content'
import Draggable from '@/components/draggable/index.vue'
import { SORT_API } from '@/constants/fetch'
const route = useRoute()
// 查
const queryParams = ref<IColumnContentsListRequest>({
  column_id: Number(route.params.id),
  page: 1
})
const courseInfo = ref<IColumnDescResponse>()
const { loading, list, getListData, createData, deleteData } =
  usePageAction<IColumnContent>({
    queryParams,
    module: 'column-content'
  })
const { getInfoData } = usePageAction({
  module: 'column'
})
const dialogSelectRef = ref<InstanceType<typeof DialogSelect> | null>(null)
const selectedLoading = ref(false)
const firstInfoLoad = ref(false)
const handleDelete = (row: IColumnContent) => {
  const title = `是否删除 ${row.title}?`
  deleteData(row, title, { column_id: Number(route.params.id) })
}
const handleOpenSelect = () => {
  dialogSelectRef.value?.open()
}
const handleCreated = (rows: IColumnContent[]) => {
  selectedLoading.value = true
  const paramsList = rows.map((it) => {
    return {
      course_id: it.id,
      column_id: Number(route.params.id)
    }
  })
  const fetchApiList = []
  for (const prams of paramsList) {
    fetchApiList.push(createData(prams))
  }
  axios
    .all(fetchApiList)
    .then(async (_) => {
      await getListData()
      ElMessage({
        type: 'success',
        message: '添加成功',
        duration: 1500
      })
    })
    .finally(() => {
      selectedLoading.value = false
      dialogSelectRef.value?.close()
    })
}
const getInfo = async () => {
  courseInfo.value = await getInfoData(Number(route.params.id))
  firstInfoLoad.value = true
}
const handleDrag = async (rows: any[]) => {
  try {
    const ids = rows.map((it) => it.id)
    loading.value = true
    await columnContentApi[SORT_API]({
      ids,
      column_id: Number(route.params.id)
    })
    setTimeout(() => {
      ElMessage({
        type: 'success',
        message: '排序成功',
        duration: 1500
      })
    }, 300)
  } finally {
    await getListData()
    loading.value = false
  }
}
const columns = useTableColumns({ handleDelete })
getInfo()
getListData()
</script>
<template>
  <el-card class="md:m-4 media" shadow="never">
    <el-container>
      <el-header>
        <el-page-header title="返回" @back="$router.back()"></el-page-header>
      </el-header>
    </el-container>
    <DetailHeader
      v-if="firstInfoLoad"
      :data="courseInfo"
      :get-data="getInfo"
    ></DetailHeader>
    <el-skeleton v-else animated :rows="2" style="margin: 2rem 0"></el-skeleton>
    <PageSearch>
      <template #left>
        <el-button type="primary" :loading="loading" @click="handleOpenSelect"
          >新增目录</el-button
        >
      </template>
    </PageSearch>

    <!-- <div class="item flex border" v-for="(item, index) in list" :key="index">
        <div class="move mr-2">*</div>
        <div class="name">{{ item.title }}</div>
      </div> -->
    <PageTable
      :columns="columns"
      :list="list"
      :loading="loading"
      :get-list="getListData"
      draggable
      @drag="handleDrag"
    >
      <template #media="{ row }">
        <div class="course-graphics">
          <div class="course-cover">
            <img :src="row.cover || '/img_default.svg'" alt="" />
          </div>
          <div class="course-desc">
            <div class="course-title">{{ row.title }}</div>
            <div class="course-price">&yen; {{ row.price }}</div>
          </div>
        </div>
      </template>
      <template #status="{ row }">
        <el-tag type="success" v-if="row.status">已上架</el-tag>
        <el-tag type="info" v-else>已下架</el-tag>
      </template>
      <template #type="{ row }">
        {{ courseTypes[row.type] }}
      </template>
    </PageTable>

    <DialogSelect
      ref="dialogSelectRef"
      :loading="selectedLoading"
      :auto-close="false"
      @selected="handleCreated"
    ></DialogSelect>
    <!-- <EditDialog ref="editDialogRef" :get-list="getListData"></EditDialog> -->
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
