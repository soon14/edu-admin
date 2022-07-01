<script setup lang="ts">
import { AUTO_LOGIN } from '@/constants/storage'
import { storage } from '@/utils/storage'
import { useAuthStore } from '@/store/auth'
import rules from './config/login-account'
import type { ElFormType } from '@/types/element-plus'
import type { ILoginProps } from './types'
const formData = ref<ILoginProps>({
  username: 'ceshi1',
  password: 'ceshi1'
})
const loading = ref(false)
const autoLogin = ref(false)
const formRef = ref<ElFormType | null>(null)
const authStore = useAuthStore()

const handleSubmit = async (e: Event) => {
  e.preventDefault()
  formRef?.value?.validate(async (valid) => {
    if (valid) {
      const { username, password } = formData.value
      const params = { username, password }
      if (autoLogin.value) {
        if (formData.value.username.trim() && formData.value.password.trim()) {
          storage.set(AUTO_LOGIN, params, 24 * 60 * 60)
        }
      } else {
        storage.remove(AUTO_LOGIN)
      }
      loading.value = true
      // 登录
      try {
        await authStore.login(params)
      } finally {
        loading.value = false
      }
    }
  })
}

const initAutoLogin = () => {
  const result = storage.get(AUTO_LOGIN)
  if (!result) {
    autoLogin.value = false
  } else {
    autoLogin.value = true
    formData.value.username = result.username || ''
    formData.value.password = result.password || ''
  }
}

watch(autoLogin, () => {
  if (!autoLogin.value) {
    storage.remove(AUTO_LOGIN)
  }
})
initAutoLogin()
</script>

<template>
  <div class="login-account">
    <el-form
      ref="formRef"
      :model="formData"
      :rules="rules()"
      size="default"
      @submit="handleSubmit"
    >
      <el-form-item prop="username">
        <el-input
          v-model="formData.username"
          placeholder="请输入账号"
          clearable
        >
          <template #prefix>
            <i class="fas fa-user"></i>
          </template>
        </el-input>
      </el-form-item>
      <el-form-item prop="password">
        <el-input
          v-model="formData.password"
          placeholder="请输入密码"
          type="password"
          show-password
          clearable
        >
          <template #prefix>
            <i class="fas fa-lock"></i>
          </template>
        </el-input>
      </el-form-item>
      <el-form-item>
        <div class="login-auto">
          <el-checkbox v-model="autoLogin">24小时自动登录</el-checkbox>
          <el-link type="primary">忘记密码?</el-link>
        </div>
      </el-form-item>
      <el-form-item>
        <el-button
          class="login-btn"
          type="primary"
          native-type="submit"
          :loading="loading"
          >登录</el-button
        >
      </el-form-item>
    </el-form>
  </div>
</template>

<style scoped lang="scss">
.login-account {
  .login-btn {
    @apply w-full rounded-full;
  }
  .login-auto {
    @apply flex justify-between w-full;
  }
}
</style>
