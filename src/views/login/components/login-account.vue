<script setup lang="ts">
const formData = ref({
  name: '',
  password: ''
})
const rules = {
  name: [{ required: true, message: '用户名不能为空', trigger: 'blur' }],
  password: [{ required: true, message: '密码不能为空', trigger: 'blur' }]
}
const autoLogin = ref(false)
const handleSubmit = (e: Event) => {
  e.preventDefault()
  console.log(123)
}
</script>

<template>
  <div class="login-account">
    <el-form
      ref="formRef"
      :model="formData"
      :rules="rules"
      size="default"
      @submit="handleSubmit"
    >
      <el-form-item prop="name">
        <el-input v-model="formData.name" placeholder="请输入账号" clearable>
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
        <el-button class="login-btn" type="primary" native-type="submit"
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
