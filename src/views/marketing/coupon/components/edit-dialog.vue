<script setup lang="ts">
import { ElFormType } from '@/types/element-plus'
import { ICoupon } from '@/api/module/types/coupon'
import { rules } from './config/edit-rules'
import { cloneDeep } from '@/utils/lodash/'
import usePageAction from '@/hooks/usePageAction'
import DialogSelect from '@/components/dialog-select/index.vue'
import { formatDate } from '@/utils/date'

const props = defineProps({
  getList: {
    type: Function,
    default: () => ({})
  }
})
const { createData, updateData } = usePageAction({
  module: 'coupon'
})
const visible = ref(false)
const dialogTitle = ref('')
const formData = ref<Partial<ICoupon>>({
  type: 'course',
  status: 1,
  price: 0.1,
  condition: 0,
  start_time: '',
  end_time: '',
  c_num: 1,
  goods_id: null,
  value: {
    cover: '',
    id: null,
    price: 0,
    title: '',
    type: ''
  }
})
const startAndEndTime = computed({
  set(data: any[]) {
    formData.value.start_time = data[0]
    formData.value.end_time = data[1]
  },
  get() {
    return [formData.value.start_time, formData.value.end_time]
  }
})
const handleTimeUpdate = (data: any) => {
  formData.value.start_time = data[0]
  formData.value.end_time = data[1]
}
const typeOptions = [
  { label: '课程', value: 'course' },
  { label: '专栏', value: 'column' }
]
const formRef = ref<ElFormType | null>(null)
const formLoading = ref(false)

const dialogSelectRef = ref<InstanceType<typeof DialogSelect> | null>(null)
const handleSelectCourseOrColumn = () => {
  dialogSelectRef.value?.open()
}
const handleSelect = (selected: any[]) => {
  formData.value.goods_id = selected[0].id
  formData.value.value = selected[0]
}
const handleConfirm = () => {
  formRef.value?.validate(async (valid) => {
    if (valid) {
      formLoading.value = true
      try {
        if (formData.value.id) {
          await updateData({
            ...formData.value,
            start_time: formatDate(
              new Date(formData.value.start_time as any).getTime()
            ),
            end_time: formatDate(
              new Date(formData.value.end_time as any).getTime()
            )
          })
        } else {
          await createData({ ...formData.value })
        }
        ElMessage({
          type: 'success',
          message: formData.value.id ? '编辑成功' : '新增成功'
        })
      } finally {
        formLoading.value = false
      }
      visible.value = false
      await props.getList()
    }
  })
}
const handleClose = () => {
  formRef.value?.resetFields()
  formData.value.value = {
    cover: '',
    id: null,
    price: 0,
    title: '',
    type: ''
  }
}
const open = (title: string, row?: Partial<ICoupon>) => {
  visible.value = true
  dialogTitle.value = title
  nextTick(() => {
    if (row && row.id) {
      formData.value = cloneDeep({
        ...row,
        price: parseFloat(row.price as any),
        condition: parseFloat(row.condition as any)
      })
    }
  })
}
defineExpose({ open })
</script>

<template>
  <div class="edit-dialog">
    <DialogBase
      :loading="formLoading"
      v-model="visible"
      :title="dialogTitle"
      show-btn
      width="1000px"
      @confirm="handleConfirm"
      @close="handleClose"
    >
      <el-form
        ref="formRef"
        :model="formData"
        :rules="rules"
        label-width="140px"
        label-suffix=":"
        size="default"
      >
        <el-form-item label="类型" prop="type">
          <el-select v-model="formData.type" placeholder="请选择">
            <el-option
              v-for="item in typeOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="关联" prop="goods_id">
          <el-button
            v-if="!formData.value?.cover"
            type="primary"
            @click="handleSelectCourseOrColumn"
            >关联</el-button
          >
          <img
            v-else
            class="w-20 cursor-pointer"
            :src="formData.value?.cover"
            @click="handleSelectCourseOrColumn"
            alt=""
          />
        </el-form-item>
        <el-form-item label="面值" prop="price">
          <el-input-number
            v-model="formData.price"
            :min="0.1"
            :precision="2"
          ></el-input-number>
        </el-form-item>
        <el-form-item label="条件金额" prop="condition">
          <el-input-number
            v-model="formData.condition"
            :min="0"
            :precision="2"
          ></el-input-number>
        </el-form-item>
        <el-form-item label="发行量" prop="c_num">
          <el-input-number v-model="formData.c_num" :min="1"></el-input-number>
        </el-form-item>
        <el-form-item label="优惠券使用期限" prop="end_time">
          <div class="w-10">
            <el-date-picker
              :model-value="[formData.start_time!, formData.end_time!]"
              @update:model-value="handleTimeUpdate"
              value-format="YYYY-MM-DD HH:mm:ss"
              format="YYYY-MM-DD HH:mm:ss"
              type="datetimerange"
              placeholder="选择日期时间"
              range-separator="-"
              start-placeholder="起始时间"
              end-placeholder="结束时间"
            />
          </div>
        </el-form-item>
      </el-form>
    </DialogBase>
    <DialogSelect
      ref="dialogSelectRef"
      @selected="handleSelect"
      single
      :is-column="formData.type !== 'course'"
    ></DialogSelect>
  </div>
</template>

<style scoped lang="scss"></style>
