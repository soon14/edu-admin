<script setup lang="ts">
import { ElFormType } from '@/types/element-plus'
import SendCode from '@/components/send-code/index.vue'
const formData = ref({
  phone: '',
  code: ''
})
const rules = {
  phone: [{ required: true, message: '手机号不能为空', trigger: 'blur' }],
  code: [{ required: true, message: '验证码不能为空', trigger: 'blur' }]
}
const formRef = ref<ElFormType | null>(null)
const handleSubmit = (e: Event) => {
  e.preventDefault()
}
const sendCodeRef = ref<InstanceType<typeof SendCode> | null>(null)
const handleSendCode = () => {
  formRef?.value?.validateField('phone', (valid) => {
    if (valid && sendCodeRef?.value) {
      sendCodeRef?.value.send()
    }
  })
}
</script>

<template>
  <div class="login-phone">
    <el-form
      ref="formRef"
      :model="formData"
      :rules="rules"
      size="default"
      @submit="handleSubmit"
    >
      <el-form-item prop="phone">
        <el-input v-model="formData.phone" placeholder="请输入手机号">
          <template #prepend>+86</template>
        </el-input>
      </el-form-item>
      <el-form-item prop="code" placeholder="请输入手机验证码">
        <div class="form-code-box">
          <el-input v-model="formData.code" class="code-input"></el-input>
          <send-code
            @click="handleSendCode"
            :time="3"
            ref="sendCodeRef"
          ></send-code>
        </div>
      </el-form-item>
      <el-form-item>
        <el-button class="login-btn" type="primary" native-type="submit"
          >登录</el-button
        >
      </el-form-item>
    </el-form>
  </div>
</template>

<style scoped lang="scss">
.login-phone {
  .form-code-box {
    @apply flex justify-between w-full;
    .el-button {
      @apply w-24 ml-2;
    }
  }
  .login-btn {
    @apply w-full rounded-full;
  }
}
</style>
