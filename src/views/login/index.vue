<script setup lang="ts">
import LoginAccount from './components/login-account.vue'
import loginPhone from './components/login-phone.vue'
import ChangeTheme from './components/change-theme.vue'
import { useAuthStore } from '@/store/auth'
const tabName = ref('account')
const authStore = useAuthStore()
onMounted(() => {
  authStore.clearLocalStorage()
})
</script>

<template>
  <div class="login c-bg-base">
    <div class="login-left">
      <img
        draggable="false"
        src="https://lolicode.gitee.io/scui-doc/demo/img/auth_banner.jpg"
        alt=""
      />
    </div>
    <div class="login-right">
      <div class="login-right-inner">
        <div class="logo">
          <img src="/windi_logo.svg" alt="" />
          <!-- <div class="title">Windi Css</div> -->
        </div>
        <el-tabs
          v-model="tabName"
          tab-position="top"
          class="login-tabs-box"
          stretch
        >
          <el-tab-pane label="账号登录" name="account">
            <login-account></login-account>
          </el-tab-pane>
          <el-tab-pane label="手机号登录" name="phone">
            <login-phone></login-phone>
          </el-tab-pane>
        </el-tabs>
        <el-form>
          <el-form-item>
            <div class="other-login">
              <el-divider></el-divider>
              <div class="text">其他登录方式</div>
              <el-divider></el-divider>
            </div>
          </el-form-item>
          <el-form-item>
            <div class="wx">
              <i
                class="fab fa-weixin text-2xl cursor-pointer"
                title="微信登录"
              ></i>
            </div>
          </el-form-item>
        </el-form>
      </div>
    </div>
    <div class="login-theme">
      <change-theme></change-theme>
    </div>
  </div>
</template>

<style scoped lang="scss">
.login {
  @apply flex h-screen overflow-hidden;
  .login-left {
    @apply object-cover w-[40%] hidden md:block;
  }
  .login-right {
    @apply flex flex-1 flex-col items-center justify-center min-h-390px;
    .login-right-inner {
      @apply h-96 min-h-290px flex flex-col items-center;
      transform: translateY(-50px);
    }
    .logo {
      @apply flex items-center text-2xl pb-6;
      img {
        @apply w-20;
      }
      .title {
        @apply mx-1 whitespace-nowrap font-light text-base tracking-widest;
      }
    }
    .login-tabs-box {
      @apply w-72 md:w-96;
    }
  }
  .other-login {
    @apply flex;
    .text {
      @apply w-320px flex items-center justify-center;
    }
  }
  .wx {
    @apply flex w-full items-center justify-center;
  }
  .login-theme {
    @apply absolute right-4 top-4;
  }
}
</style>
