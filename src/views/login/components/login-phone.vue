<script setup lang="ts">
import { ElFormType } from '@/types/element-plus'
import SendCode from '@/components/send-code/index.vue'
import rules from './config/login-phone'
const formData = ref({
  phone: '',
  code: ''
})

const formRef = ref<ElFormType | null>(null)
const handleSubmit = (e: Event) => {
  e.preventDefault()
  formRef?.value?.validate((valid) => {
    if (valid) {
      ElMessage({
        message: '测试数据, 请用`账号密码`的方式登录'
      })
    }
  })
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
      :rules="rules()"
      size="default"
      @submit="handleSubmit"
    >
      <el-form-item prop="phone">
        <el-input
          v-model="formData.phone"
          placeholder="请输入手机号"
          :maxlength="11"
        >
          <template #prepend>+86</template>
        </el-input>
      </el-form-item>
      <el-form-item prop="code" placeholder="请输入手机验证码">
        <div class="form-code-box">
          <el-input
            v-model="formData.code"
            class="code-input"
            :maxlength="5"
          ></el-input>
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
