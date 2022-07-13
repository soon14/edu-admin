<script setup lang="ts">
import type { ElPagination } from 'element-plus'
import { PropType } from 'vue'
const props = defineProps({
  pageSize: {
    type: Number,
    default: 10
  },
  currentPage: {
    type: Number,
    default: 1
  },
  total: {
    type: Number,
    default: 0
  },
  getData: {
    type: Function,
    default: null
  },
  type: Object as PropType<InstanceType<typeof ElPagination>['$props']>,
  options: {
    default: () => ({})
  }
})

const emit = defineEmits<{
  (e: 'change', size: number): void
  (e: 'update:pageSize', size: number): void
  (e: 'update:currentPage', size: number): void
}>()
const handleSizeChange = (value: number) => {
  emit('update:pageSize', value)
  emit('change', value)
  nextTick(() => {
    props.getData && props.getData()
  })
}
const handleCurrentChange = (value: number) => {
  emit('update:currentPage', value)
  emit('change', value)
  nextTick(() => {
    props.getData && props.getData()
  })
  nextTick(() => {
    const main = document.querySelector(
      '.el-main.layout-right'
    ) as HTMLDivElement
    main.scrollTop = 0
  })
}
</script>

<template>
  <div class="c-pagination">
    <el-scrollbar>
      <div class="hidden md:block">
        <el-pagination
          size="small"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :page-sizes="[10, 20, 30]"
          :current-page="currentPage"
          :page-size="pageSize"
          :total="total"
          layout="sizes, prev, pager, next, jumper, total"
          v-bind="options"
        >
        </el-pagination>
      </div>
      <div class="block md:hidden sm:flex sm:justify-center">
        <el-pagination
          size="small"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :page-sizes="[10, 20, 30]"
          :current-page="currentPage"
          :page-size="pageSize"
          :total="total"
          layout="sizes, prev, pager, next"
        >
        </el-pagination>
      </div>
    </el-scrollbar>
    <div class="block md:hidden h-8 text-sm text-center mt-1 text-gray-500">
      共 {{ total }} 条数据
    </div>
  </div>
</template>

<style scoped lang="scss">
.c-pagination {
  @apply mt-2 flex w-full justify-center md:justify-end flex-col md:flex-row;
}
:deep(.el-pagination__sizes) {
  @media (max-width: 767px) {
    display: none !important;
  }
}
</style>
<script lang="ts">
export default {
  name: 'CPagination'
}
</script>
