<script setup lang="ts">
import { ElFormType } from '@/types/element-plus'
import { IRoleCreateRequest, IRoleInfoResponse } from '@/api/module/types/role'
import { rules } from './config/edit-rules'
import { cloneDeep } from '@/utils/lodash/'
import usePageAction from '@/hooks/usePageAction'
import roleApi from '@/api/module/role'
import axios from 'axios'
import { INFO_API } from '@/constants/fetch'
import Tree from '@/components/tree/index.vue'

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
const formData = ref({
  id: null,
  name: ''
})
const roleInfo = ref<Partial<IRoleInfoResponse>>({
  id: null,
  name: '',
  role_id: '',
  desc: '',
  status: 1,
  menus: [],
  accesses: [],
  menusId: [],
  accessesId: []
})
const menusList = ref([])
const accessesList = ref([])
const formRef = ref<ElFormType | null>(null)
const formLoading = ref(false)
const loading = ref(true)
const getRoleAndMenuData = () => {
  loading.value = true
  axios
    .all([
      roleApi[INFO_API](formData.value.id as any),
      roleApi.getRoleAndMenuList('menu'),
      roleApi.getRoleAndMenuList('rule')
    ])
    .then(([infoData, menuData, ruleData]) => {
      roleInfo.value = infoData as any
      menusList.value = (menuData as any).items
      accessesList.value = (ruleData as any).items
      loading.value = false
    })
}
const menuTreeRef = ref<InstanceType<typeof Tree> | null>(null)
const roleTreeRef = ref<InstanceType<typeof Tree> | null>(null)
const handleConfirm = () => {
  formRef.value?.validate(async (valid) => {
    if (valid) {
      formLoading.value = true
      try {
        const accessIds = []
        accessIds.push(...(menuTreeRef.value?.getKeys().keys as any))
        accessIds.push(...(roleTreeRef.value?.getKeys().keys as any))
        await roleApi.setRoleApi({
          access_ids: accessIds,
          role_id: formData.value.id as any
        })
        ElMessage({
          type: 'success',
          message: '设置成功'
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
const open = (title: string, row?: any) => {
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
watch(visible, () => {
  if (visible.value) {
    nextTick(() => {
      getRoleAndMenuData()
    })
  }
})
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
        v-if="!loading"
      >
        <el-form-item label="角色名称" prop="name">
          {{ formData.name }}
        </el-form-item>
        <el-form-item label="菜单" prop="name">
          <Tree
            ref="menuTreeRef"
            :data="menusList"
            :checked-keys="roleInfo.menusId"
            :default-props="{ label: 'title', value: 'id' }"
          ></Tree>
        </el-form-item>
        <el-form-item label="权限">
          <Tree
            ref="roleTreeRef"
            :data="accessesList"
            :checked-keys="roleInfo.accessesId"
            :default-props="{ label: 'title', value: 'id' }"
          ></Tree>
        </el-form-item>
      </el-form>
      <template v-if="loading">
        <div class="w-80 pl-10">
          <el-skeleton class="mt-10" animated :rows="3"></el-skeleton>
          <el-skeleton class="mt-10" animated :rows="3"></el-skeleton>
        </div>
      </template>
    </DialogBase>
  </div>
</template>

<style scoped lang="scss"></style>
