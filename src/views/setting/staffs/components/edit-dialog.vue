<script setup lang="ts">
import { ElFormType } from '@/types/element-plus'
import {} from '@/api/module/types/staffs'
import { IRoleResponse } from '@/api/module/types/role'
import { rules } from './config/edit-rules'
import { cloneDeep } from '@/utils/lodash/'
import staffsApi from '@/api/module/staffs'
import roleApi from '@/api/module/role'
import { CREATE_API, LIST_API } from '@/constants/fetch'
const props = defineProps({
  getList: {
    type: Function,
    default: () => ({})
  }
})

const visible = ref(false)
const dialogTitle = ref('')
const formData = ref({
  id: null as number | null,
  keyword: '',
  role_ids: [] as number[]
})

const roles = ref<IRoleResponse['items']>([])
const formRef = ref<ElFormType | null>(null)
const formLoading = ref(false)
const isEdit = computed(() => {
  return !!formData.value.id
})
const getRoleListData = async () => {
  roles.value = (await roleApi[LIST_API]({ page: 1, limit: 100 })).items
}
const handleConfirm = () => {
  formRef.value?.validate(async (valid) => {
    if (valid) {
      formLoading.value = true
      try {
        if (formData.value.id) {
          await staffsApi.setPermission({
            id: formData.value.id,
            role_ids: formData.value.role_ids
          })
        } else {
          await staffsApi[CREATE_API](formData.value.keyword)
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
  formData.value = {
    id: null as number | null,
    keyword: '',
    role_ids: [] as number[]
  }
}
const open = (title: string, row?: any) => {
  visible.value = true
  dialogTitle.value = title
  nextTick(() => {
    if (row && row.id) {
      formData.value = cloneDeep({
        ...row,
        role_ids: row.role_ids.split(',')
      })
      formData.value.keyword = row.user.username || row.user.nickname
    }
  })
}
defineExpose({ open })

getRoleListData()
</script>

<template>
  <div class="edit-dialog">
    <DialogBase
      :loading="formLoading"
      v-model="visible"
      :title="dialogTitle"
      show-btn
      width="800px"
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
        <el-form-item prop="keyword" label="账号">
          <el-input
            v-model="formData.keyword"
            placeholder="请输入账号"
            :disabled="isEdit"
          ></el-input>
        </el-form-item>
        <el-form-item prop="keyword" label="账号" v-if="isEdit">
          <el-checkbox-group v-model="formData.role_ids">
            <template v-for="item in roles" :key="item.id">
              <el-checkbox :label="item.id + ''">{{ item.name }}</el-checkbox>
            </template>
          </el-checkbox-group>
        </el-form-item>
      </el-form>
    </DialogBase>
  </div>
</template>

<style scoped lang="scss"></style>
