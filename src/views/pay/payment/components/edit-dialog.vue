<script setup lang="ts">
import { ElFormType } from '@/types/element-plus'
import { ICash } from '@/api/module/types/cash'
import { rules } from './config/edit-rules'
import { cloneDeep } from '@/utils/lodash/'
import usePageAction from '@/hooks/usePageAction'
import CitySelect from '@/components/city-select/index.vue'

const props = defineProps({
  getList: {
    type: Function,
    default: () => ({})
  }
})
const { createData, updateData } = usePageAction({
  module: 'cash'
})
const visible = ref(false)
const dialogTitle = ref('')
const formData = ref<Partial<ICash>>({
  id: null,
  // school_id: -1,
  account: '',
  province: '',
  city: '',
  area: '',
  path: '',
  bank: '',
  name: '',
  status: 1
})

const formRef = ref<ElFormType | null>(null)
const formLoading = ref(false)
const citySelectRef = ref<InstanceType<typeof CitySelect> | null>(null)

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
const open = (title: string, row?: Partial<ICash>) => {
  visible.value = true
  dialogTitle.value = title
  nextTick(() => {
    if (row && row.id) {
      formData.value = cloneDeep({
        ...row
      })
      const cityData = [row.province, row.city, row.area].filter(
        (it) => it
      ) as string[]
      citySelectRef.value?.setValue(cityData)
    }
  })
}
const handleCityChange = (data: string[]) => {
  formData.value.province = data[0]
  formData.value.city = data[1]
  formData.value.area = data[2]
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
        <el-form-item label="账号" prop="account">
          <el-input v-model="formData.account"></el-input>
        </el-form-item>
        <el-form-item label="省市区" prop="title">
          <CitySelect
            @change="handleCityChange"
            ref="citySelectRef"
          ></CitySelect>
        </el-form-item>
        <el-form-item label="详细地址" prop="path">
          <el-input v-model="formData.path"></el-input>
        </el-form-item>
        <el-form-item label="所属银行" prop="bank">
          <BandSelect v-model="formData.bank"></BandSelect>
        </el-form-item>
        <el-form-item label="姓名" prop="name">
          <el-input v-model="formData.name"></el-input>
        </el-form-item>
      </el-form>
    </DialogBase>
  </div>
</template>

<style scoped lang="scss"></style>
