<script setup lang="ts">
import schoolUserApi from '@/api/module/school-user'
import {
  IScrollUserHistoryRequest,
  IScrollUserOrderRequest,
  IScrollUserSubRequest
} from '@/api/module/types/school-user'
import { course, history, order } from './config/useTableColumns'
import { getTitle } from '@/api/utils/data'
const props = defineProps({
  name: {
    type: String,
    default: ''
  },
  userId: {
    type: Number,
    required: true
  }
})
const page = ref(1)
const total = ref(0)
const list = ref([])
const loading = ref(false)
const fetchApis: Record<string, Function> = {
  course: schoolUserApi.getSchoolUserSubsApi,
  column: schoolUserApi.getSchoolUserSubsApi,
  order: schoolUserApi.getSchoolUserOrdersApi,
  history: schoolUserApi.getSchoolUserHistoryApi
}
const tableColumns = computed(() => {
  if (props.name === 'course' || props.name === 'column') {
    return course()
  } else if (props.name === 'order') {
    return order()
  } else {
    return history()
  }
})

const fetchParams = computed(() => {
  if (props.name === 'user') {
    const params: IScrollUserSubRequest = {
      page: page.value,
      user_id: props.userId,
      type: 'course'
    }
    return params
  } else if (props.name === 'column') {
    const params: IScrollUserSubRequest = {
      page: page.value,
      user_id: props.userId,
      type: 'column'
    }
    return params
  } else if (props.name === 'order') {
    const params: IScrollUserOrderRequest = {
      page: page.value,
      user_id: props.userId
    }
    return params
  } else {
    const params: IScrollUserHistoryRequest = {
      page: page.value,
      user_id: props.userId
    }
    return params
  }
})

const fetchApi = computed(() => {
  const currentFetch = async () => {
    loading.value = true
    const data = await fetchApis[props.name](fetchParams.value)
    data.items.forEach((item: any) => (item.title = getTitle()))
    list.value = data.items
    total.value = data.total
    loading.value = false
  }
  return currentFetch
})

watch(
  () => props.userId,
  async () => {
    if (props.userId !== -1) {
      await fetchApi.value()
    } else {
      list.value = []
    }
  },
  {
    immediate: true
  }
)
</script>

<template>
  <PageTable
    :list="list"
    :columns="tableColumns"
    v-model:page="page"
    v-model:total="total"
    v-loading="loading"
  >
    <template #history_goods="{ row }">
      <div v-if="!row.title.includes('undefined')">{{ row.title }}</div>
    </template>
  </PageTable>
</template>

<style scoped lang="scss"></style>
