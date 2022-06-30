<script setup lang="ts">
import { useAuthStore } from '@/store/auth'
type CommandType = 'info' | 'clear' | 'out'
const handleCommand = (type: CommandType) => {
  console.log(type)
}
const authStore = useAuthStore()
</script>

<template>
  <div class="header-avatar">
    <el-dropdown>
      <span class="el-dropdown-link select-none flex items-center">
        <el-avatar
          class="bg-light-900"
          icon="el-icon-user-solid"
          size="default"
          shape="circle"
          :src="authStore.userInfo?.avatar || '/avatar.jpg'"
          fit="fill"
        ></el-avatar>
        <span class="ml-1 text-base">
          {{ authStore.userInfo?.name }}
        </span>
        <i class="fas fa-chevron-down ml-2 text-gray-400"></i>
      </span>
      <template #dropdown>
        <el-dropdown-menu @command="handleCommand">
          <el-dropdown-item @click="handleCommand('info')"
            >账号信息</el-dropdown-item
          >
          <el-dropdown-item @click="handleCommand('clear')"
            >清除缓存</el-dropdown-item
          >
          <el-dropdown-item divided @click="handleCommand('out')"
            >退出登录</el-dropdown-item
          >
        </el-dropdown-menu>
      </template>
    </el-dropdown>
  </div>
</template>

<style scoped lang="scss"></style>
<script lang="ts">
export default {
  name: 'HeaderAvatar'
}
</script>
