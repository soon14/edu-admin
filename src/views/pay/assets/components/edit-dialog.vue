<script setup lang="ts">
import { ElFormType } from '@/types/element-plus'
import { rules } from './config/edit-rules'
import { IGetCashRequest } from '@/api/module/types/cashconfirm'
import ashconfirmApi from '@/api/module/cashconfirm'
import cashApi from '@/api/module/cash'
import { LIST_API } from '@/constants/fetch'
import { ICash } from '@/api/module/types/cash'

const props = defineProps({
  getList: {
    type: Function,
    default: () => ({})
  },
  maxPrice: {
    type: Number,
    default: 0
  }
})
const visible = ref(false)
const dialogTitle = ref('申请提现')
const formData = ref<IGetCashRequest>({
  cash_id: '',
  price: 0
})

const formRef = ref<ElFormType | null>(null)
const formLoading = ref(false)
const cashList = ref<ICash[]>([])

const handleConfirm = () => {
  formRef.value?.validate(async (valid) => {
    if (valid) {
      formLoading.value = true
      try {
        // await ashconfirmApi.getCashApi({
        //   cash_id: formData.value.cash_id,
        //   price: formData.value.price
        // })
        ElMessage({
          type: 'success',
          message: '演示数据, 成功发出申请'
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
const open = async () => {
  cashList.value = (
    await cashApi[LIST_API]({
      page: 1,
      limit: 20,
      status: 1
    })
  ).items
  visible.value = true
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
        <el-form-item label="提现金额" prop="price">
          <el-input-number
            v-model="formData.price"
            :min="0"
            :max="maxPrice"
            :precision="2"
          ></el-input-number>
        </el-form-item>
        <el-form-item label="提现账户" prop="cash_id">
          <el-select v-model="formData.cash_id" placeholder="选择账户">
            <el-option
              v-for="item in cashList"
              :key="(item.id as number)"
              :label="item.bank"
              :value="(item.id as number)"
            >
              <span style="float: left">{{ item.bank }}</span>
              <span
                style="
                  float: right;
                  color: var(--el-text-color-secondary);
                  font-size: 13px;
                "
                >{{ item.name }}</span
              >
            </el-option>
          </el-select>
        </el-form-item>
      </el-form>
    </DialogBase>
  </div>
</template>

<style scoped lang="scss"></style>
