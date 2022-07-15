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
  },
  showRadio: {
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
const currentRow = ref(-1)

const handleSelectionChange = (rows: any[]) => {
  emit('selectionChange', cloneDeep(rows))
}
const handleRadioChange = (row: any) => {
  currentRow.value = row.id
  emit('selectionChange', [cloneDeep(row)])
}
const tableRef = ref<ElTableType | null>(null)

// 当前选中的row

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
      <!--
          监听选中事件:
          @current-change="handleCurrent"
      -->
      <el-table-column
        header-align="center"
        align="center"
        width="50"
        v-if="showRadio"
      >
        <template #default="{ row }">
          <el-radio
            :label="row.id"
            style="transform: translateX(0.5em)"
            :model-value="currentRow"
            @click="handleRadioChange(row)"
            >{{ '' }}</el-radio
          >
        </template>
      </el-table-column>

      <template v-for="(item, index) in columns" :key="index">
        <el-table-column v-bind="item" v-if="item.type === 'action_btn'">
          <template #default="{ row, $index }">
            <el-space wrap>
              <slot name="btn-prefix" :row="row" :index="$index"></slot>
              <template v-for="(btn, bIndex) in item?.btns" :key="bIndex">
                <template v-if="!btn.slot">
                  <el-button
                    :size="btn.size"
                    :type="btn.type"
                    @click="btn.handle(row, $index)"
                    >{{ btn.name }}</el-button
                  >
                </template>
                <slot v-else :name="btn.slot" :row="row" :index="$index"></slot>
              </template>
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
          <template #default="{ row, $index }">
            <slot
              v-if="item.slot"
              :name="[item.slot]"
              :row="row"
              :index="$index"
            ></slot>
          </template>
        </el-table-column>
      </template>
    </el-table>
    <Pagination
      v-if="!!currentTotal && currentTotal > limit"
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
