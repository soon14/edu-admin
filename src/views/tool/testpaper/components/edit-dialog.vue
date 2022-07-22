<script setup lang="ts">
import { ElFormType } from '@/types/element-plus'
import { ITestItem } from '@/api/module/types/testpaper'
import { rules } from './config/edit-rules'
import { cloneDeep } from '@/utils/lodash/'
import usePageAction from '@/hooks/usePageAction'
const props = defineProps({
  getList: {
    type: Function,
    default: () => ({})
  }
})
const { createData, updateData } = usePageAction({
  module: 'testpaper'
})
const visible = ref(false)
const dialogTitle = ref('')
const formData = ref<ITestItem>({
  id: null,
  school_id: 11,
  title: '',
  total_score: 0,
  pass_score: 0,
  expire: 0,
  status: 1,
  created_time: '',
  updated_time: ''
})

const formRef = ref<ElFormType | null>(null)
const formLoading = ref(false)

const handleConfirm = () => {
  formRef.value?.validate(async (valid) => {
    if (valid) {
      formLoading.value = true
      try {
        if (formData.value.id) {
          await updateData({ ...formData.value })
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
}
const open = (title: string, row?: ITestItem) => {
  visible.value = true
  dialogTitle.value = title
  nextTick(() => {
    if (row && row.id) {
      formData.value = cloneDeep({
        ...row
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
        <el-form-item label="封面" prop="cover">
          <UploadCrop v-model="(formData as any).cover"></UploadCrop>
        </el-form-item>
        <el-form-item label="试看内容" prop="try">
          <Editor v-model="(formData as any).try" />
        </el-form-item>
        <el-form-item label="课程内容" prop="content">
          <Editor v-model="(formData as any).content" />
        </el-form-item>
        <el-form-item label="课程价格" prop="price">
          <el-input-number
            v-model="(formData as any).price"
            :min="0"
            :precision="2"
          ></el-input-number>
        </el-form-item>
        <el-form-item label="划线价格" prop="t_price">
          <el-input-number
            v-model="(formData as any).t_price"
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
  </div>
</template>

<style scoped lang="scss"></style>
