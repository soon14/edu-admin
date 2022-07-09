<script setup lang="ts">
import { ElFormType } from '@/types/element-plus'
import { IRoleCreateRequest } from '@/api/module/types/role'
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
  module: 'role'
})
const visible = ref(false)
const dialogTitle = ref('')
const formData = ref<IRoleCreateRequest>({
  id: null,
  name: '',
  role_id: '',
  status: '1',
  desc: ''
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
  formData.value.id = null
}
const open = (title: string, row?: IRoleCreateRequest) => {
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
      width="700px"
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
        <el-form-item label="角色名称" prop="name">
          <el-input v-model="formData.name"></el-input>
        </el-form-item>
        <el-form-item label="角色标识" prop="role_id">
          <el-input v-model="formData.role_id"></el-input>
        </el-form-item>
        <el-form-item label="状态" prop="role_id">
          <el-radio-group v-model="formData.status">
            <el-radio :label="0">隐藏</el-radio>
            <el-radio :label="1">显示</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="角色描述" prop="desc">
          <el-input
            type="textarea"
            v-model="formData.desc"
            placeholder="请输入角色描述"
          ></el-input>
        </el-form-item>
      </el-form>
    </DialogBase>
  </div>
</template>

<style scoped lang="scss"></style>
