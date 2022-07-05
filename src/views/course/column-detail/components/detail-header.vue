<script setup lang="ts">
import { IColumnDescResponse } from '@/api/module/types/column'
import { PropType } from 'vue'
import columnApi from '@/api/module/column'
const props = defineProps({
  data: {
    type: Object as PropType<IColumnDescResponse>,
    default: () => ({})
  },
  getData: {
    type: Function,
    default: () => {}
  }
})
const actionLoading = ref(false)
const handleStateChange = async () => {
  try {
    actionLoading.value = true
    const status = props.data.status ? 0 : 1
    await columnApi.updateColumnStateApi({
      id: props.data.id,
      status
    })
    ElMessage({
      type: status ? 'success' : 'info',
      message: status ? '已上架' : '已下架',
      duration: 1500
    })
    await props.getData()
  } finally {
    actionLoading.value = false
  }
}
const handleIsendChange = async () => {
  try {
    actionLoading.value = true
    const isend = props.data.isend ? 0 : 1
    await columnApi.updateColumnSendStateApi({
      id: props.data.id,
      isend: isend
    })
    ElMessage({
      type: isend ? 'success' : 'info',
      message: isend ? '已完结' : '连载中',
      duration: 1500
    })
    await props.getData()
  } finally {
    actionLoading.value = false
  }
}
</script>

<template>
  <div class="column-detail-header">
    <div class="column-left">
      <div class="column-img-box">
        <img :src="data.cover || '/img_default.svg'" alt="" />
      </div>
      <div class="desc">
        <div class="title">{{ data.title }}</div>
        <div class="sub-title" v-html="data.try"></div>
        <div class="price">&yen; {{ data.price }}</div>
        <div class="btns">
          <el-button
            :type="data.status ? 'info' : 'primary'"
            @click="handleStateChange"
            :loading="actionLoading"
            >{{ data.status ? '下架' : '上架' }}</el-button
          >
          <el-button
            :type="data.isend ? 'info' : 'primary'"
            @click="handleIsendChange"
            :loading="actionLoading"
            >{{ data.isend ? '设为连载中' : '设为已完结' }}</el-button
          >
        </div>
      </div>
    </div>
    <div class="column-right whitespace-nowrap">
      <el-tag type="success" v-if="data.isend">已完结</el-tag>
      <el-tag type="info" v-else>连载中</el-tag>
    </div>
  </div>
</template>

<style scoped lang="scss">
.column-detail-header {
  @apply flex mb-10;
  .column-left {
    @apply flex-auto flex;
    .column-img-box {
      @apply w-128px h-128px object-cover mr-4;
    }
    .desc {
      @apply flex flex-col h-128px;
      .title {
        @apply text-lg pb-2;
      }
      .sub-title {
        @apply text-sm text-opacity-60;
      }
      .price {
        @apply text-lg text-red-500 mt-auto;
      }
      .btns {
        @apply mt-2px;
      }
    }
  }
  .column-right {
    @apply w-50px;
  }
}
</style>
