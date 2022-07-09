<script setup lang="ts">
import { ElFormType } from '@/types/element-plus'
import { IRenovationUpdateRequest } from '@/api/module/types/renovation'
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
  module: 'renovation'
})
const visible = ref(false)
const dialogTitle = ref('')
const formData = ref<Partial<IRenovationUpdateRequest>>({
  title: '',
  ismobile: 1
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
const open = (title: string, row?: IRenovationUpdateRequest) => {
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
      </el-form>
    </DialogBase>
  </div>
</template>

<style scoped lang="scss"></style>
