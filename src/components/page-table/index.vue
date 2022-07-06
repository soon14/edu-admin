<script setup lang="ts">
import { PropType } from 'vue'
import { formatDate } from '@/utils/date'
import { IColumn } from './types'
import { cloneDeep } from '@/utils/lodash'
import Sortable from 'sortablejs'
import { ElTableType } from '@/types/element-plus'

const props = defineProps({
  list: {
    type: Array,
    default: () => []
  },
  columns: {
    type: Array as PropType<IColumn[]>,
    default: () => []
  },
  loading: {
    type: Boolean,
    default: false
  },
  page: {
    type: Number,
    default: 1
  },
  limit: {
    type: Number,
    default: 10
  },
  total: {
    type: Number,
    default: 0
  },
  getList: {
    type: Function,
    default: () => {}
  },
  draggable: {
    type: Boolean,
    default: false
  }
})
const emit = defineEmits<{
  (
    e: 'update:queryParams',
    queryParams: { page: number; limit: number } | null
  ): void
  (e: 'update:total', total: number): void
  (e: 'update:page', total: number): void
  (e: 'update:limit', total: number): void
  (e: 'selectionChange', rows: any[]): void
  (e: 'drag', rows: any[]): void
}>()
const currentTotal = ref(props.total)
const currentPage = ref(props.page)
const currentLimit = ref(props.limit)
watch(
  () => props.total,
  () => {
    currentTotal.value = props.total
  }
)
watch(
  () => currentTotal.value,
  () => {
    emit('update:total', currentTotal.value)
  }
)
watch(
  () => props.page,
  () => {
    currentPage.value = props.page
  }
)
watch(
  () => currentPage.value,
  () => {
    emit('update:page', currentPage.value)
  }
)
watch(
  () => props.limit,
  () => {
    currentLimit.value = props.limit
  }
)
watch(
  () => currentLimit.value,
  () => {
    emit('update:limit', currentLimit.value)
  }
)
const handleSelectionChange = (rows: any[]) => {
  emit('selectionChange', cloneDeep(rows))
}
const tableRef = ref<ElTableType | null>(null)
const refreshId = ref(1)
const initSortable = () => {
  const tbodyEl = tableRef.value?.$el.querySelector(
    '.el-table__body-wrapper tbody'
  )
  if (tableRef.value) {
    Sortable.create(tbodyEl, {
      animation: 150,
      handle: '.move',
      disabled: !props.draggable,
      onEnd: function (evt) {
        const { newIndex, oldIndex } = evt
        const modelValueCopy = [...props.list]
        if (![newIndex, oldIndex].includes(undefined)) {
          const target = modelValueCopy.splice(oldIndex!, 1)[0]
          modelValueCopy.splice(newIndex!, 0, target)
          emit('drag', modelValueCopy)
          refreshId.value++
          nextTick(() => {
            initSortable()
          })
        }
      }
    })
  }
}
onMounted(() => {
  initSortable()
})
</script>

<template>
  <div class="">
    <el-table
      :key="refreshId"
      :data="list"
      v-loading="loading"
      class="w-full"
      table-layout="auto"
      @selection-change="handleSelectionChange"
      ref="tableRef"
    >
      <el-table-column v-if="draggable" width="50px" align="center">
        <i class="fas fa-maximize move select-none cursor-move p-2"></i>
      </el-table-column>
      <slot></slot>
      <template v-for="(item, index) in columns" :key="index">
        <el-table-column v-bind="item" v-if="item.type === 'action_btn'">
          <template #default="{ row }">
            <el-space wrap>
              <el-button
                :size="btn.size"
                :type="btn.type"
                v-for="(btn, bIndex) in item?.btns"
                :key="bIndex"
                @click="btn.handle(row)"
                >{{ btn.name }}</el-button
              >
            </el-space>
          </template>
        </el-table-column>
        <el-table-column v-bind="item" v-else-if="item.type == 'time'">
          <template #default="{ row }">
            {{ formatDate(row[item.prop!]) }}
          </template>
        </el-table-column>
        <el-table-column v-bind="item" v-else-if="item.type"> </el-table-column>

        <el-table-column v-bind="item" v-else-if="item.prop">
          <template #default="{ row }">
            {{ row[item.prop] }}
          </template>
        </el-table-column>
        <el-table-column v-bind="item" v-else-if="item.slot">
          <template #default="{ row }">
            <slot v-if="item.slot" :name="[item.slot]" :row="row"></slot>
          </template>
        </el-table-column>
      </template>
    </el-table>
    <Pagination
      v-if="!!currentTotal"
      v-model:currentPage="currentPage"
      v-model:total="currentTotal"
      v-model:pageSize="currentLimit"
      :get-data="getList"
    ></Pagination>
  </div>
</template>

<style scoped lang="scss">
.fa-maximize {
  transform: rotate(45deg);
}
</style>
