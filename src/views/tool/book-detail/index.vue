<script setup lang="ts">
import usePageAction from '@/hooks/usePageAction'
import {
  IBookDetailListReq,
  IBookDetailItem
} from '@/api/module/types/book-detail'
import axios from 'axios'
import bookDetailApi from '@/api/module/book-detail'
import { DELETE_API } from '@/constants/fetch'

const route = useRoute()
const bookId = computed(() => route.params.id)
const bookTitle = computed(() => route.params.book_title)

const queryParams = ref<IBookDetailListReq>({
  page: 1,
  limit: 1000,
  book_id: Number(bookId.value)
})

const createLoading = ref(false)
const { loading, total, list, getListData, updateData, createData } =
  usePageAction<IBookDetailItem>({
    queryParams,
    module: 'book-detail'
  })
// 当前激活的章节
const actionMenu = ref()

const handleMenuClick = (row: IBookDetailItem) => {
  actionMenu.value = row
  list.value.forEach((it) => (it.editing = false))
}
const handleActiveEdit = (row: IBookDetailItem) => {
  list.value.forEach((it) => (it.editing = false))
  row.editing = true
}
const handleIsfreeClick = () => {
  actionMenu.value.isfree = actionMenu.value.isfree ? 0 : 1
}
const handleDelete = async (row: IBookDetailItem) => {
  const title = `是否删除 ${row.title}?`
  ElMessageBox.confirm(title, '提示', {
    type: 'warning',
    confirmButtonText: '确定',
    cancelButtonText: '取消'
  }).then(async () => {
    await bookDetailApi[DELETE_API]({
      ids: [Number(row.id)],
      book_id: Number(bookId.value)
    })
    ElMessage({
      type: 'success',
      message: '删除成功',
      duration: 1500
    })
    await getListData()
    actionMenu.value = list.value[0]
  })
}
const handleCreate = async () => {
  try {
    createLoading.value = true
    await createData({
      book_id: bookId.value,
      title: '新章节',
      isfree: 0
    })
    await getListData()
    ElMessage({
      type: 'success',
      message: '新增章节成功',
      duration: 1500
    })
    actionMenu.value = list.value[list.value.length - 1]
  } finally {
    createLoading.value = false
  }
}
const handleSave = async () => {
  const fetchList: any[] = []
  list.value.forEach((it) => {
    fetchList.push(updateData({ ...it, book_id: bookId.value }))
  })
  loading.value = true
  axios
    .all(fetchList)
    .then((_) => {
      ElMessage({
        type: 'success',
        message: '保存成功',
        duration: 1500
      })
      getListData()
    })
    .finally(() => {
      loading.value = false
    })
}
const handleSort = async () => {
  try {
    loading.value = true
    await bookDetailApi.sortApi({
      ids: list.value.map((it) => it.id) as number[],
      book_id: Number(bookId.value)
    })
    ElMessage({
      type: 'success',
      message: '排序成功',
      duration: 1500
    })
  } finally {
    await getListData()
    loading.value = false
  }
}
getListData().then((_) => {
  actionMenu.value = list.value[0]
})
</script>

<template>
  <el-card class="md:m-4 media" shadow="never" v-loading="loading">
    <el-header :style="{ height: '50px' }">
      <div class="flex justify-between">
        <el-page-header
          title="返回"
          @back="$router.back()"
          :content="(bookTitle as string)"
        ></el-page-header>
        <div class="float-right flex items-center text-sm">
          <div
            class="cursor-pointer select-none flex items-center"
            @click="handleIsfreeClick"
          >
            <div
              class="w-4 h-4 mr-2 c-border border-2 flex justify-center items-center"
            >
              <div
                class="w-2 h-2 bg-primary"
                v-if="actionMenu?.isfree === 1"
              ></div>
            </div>
            当前章节是否免费
          </div>
          <el-button
            :loading="createLoading"
            type="success"
            class="ml-4"
            @click="handleCreate"
            >新增章节</el-button
          >
          <el-button class="ml-4" type="primary" @click="handleSave"
            >保存</el-button
          >
        </div>
      </div>
    </el-header>
    <div class="flex">
      <div class="w-100 px-4">
        <el-scrollbar height="580px">
          <Draggable
            v-model="list"
            @change="handleSort"
            :options="{ handle: '.move' }"
          >
            <template v-for="(item, index) in list" :key="item.id">
              <div
                class="h-15 flex items-center cursor-pointer duration-200"
                :class="{ active: actionMenu === item }"
                @click="handleMenuClick(item)"
              >
                <div class="flex title w-70">
                  <i
                    class="fas fa-maximize move select-none cursor-move p-2"
                  ></i>
                  <div
                    v-if="!item.content"
                    class="warn-point inline-block animate-pulse bg-red-600"
                  ></div>
                  <div class="w-8 text-center">{{ index + 1 }} .</div>
                  <span v-if="!item.editing" class="line-clamp-1 w-60 mr-4">
                    {{ item.title }}</span
                  >
                  <el-input
                    v-else
                    v-model="item.title"
                    class="w-60"
                    @click.stop
                    @keyup.enter="item.editing = false"
                  ></el-input>
                </div>
                <div
                  class="ml-auto ml-1 mr-1 text-sm flex-shrink-0 text-primary"
                  @click.stop="handleActiveEdit(item)"
                  v-if="!item.editing"
                >
                  编辑
                </div>
                <div
                  class="ml-auto mr-1 text-sm flex-shrink-0 text-primary"
                  @click.stop="item.editing = false"
                  v-else
                >
                  确定
                </div>
                <div
                  class="text-sm flex-shrink-0 text-primary"
                  @click.stop="handleDelete(item)"
                >
                  删除
                </div>
              </div>
            </template>
          </Draggable>
        </el-scrollbar>
        <Pagination
          v-if="total > 1000"
          v-model:currentPage="queryParams.page"
          :total="total"
          :get-data="getListData"
          :options="{ layout: 'prev, pager, next, total' }"
        ></Pagination>
      </div>
      <div class="flex-1">
        <Editor
          v-if="actionMenu"
          :key="actionMenu.id"
          v-model="actionMenu.content"
          :height="520"
        ></Editor>
      </div>
    </div>
  </el-card>
</template>

<style scoped lang="scss">
.active .title {
  color: var(--el-color-primary);
}
.bg-primary {
  background: var(--el-color-primary);
}
.text-primary {
  color: var(--el-color-primary);
}
.move {
  font-size: 12px;
  transform: rotate(45deg);
  opacity: 0.5;
}
.warn-point {
  width: 6px;
  height: 4px;
  border-radius: 50%;
}
</style>
