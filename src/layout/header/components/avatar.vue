<script setup lang="ts">
import { useAuthStore } from '@/store/auth'
type CommandType = 'info' | 'clear' | 'out'
const authStore = useAuthStore()

const handleCommand = (type: CommandType) => {
  if (type === 'clear') {
    authStore.logout(true)
  } else if (type === 'out') {
    authStore.logout()
  }
}
</script>

<template>
  <div class="header-avatar">
    <el-dropdown>
      <span
        class="el-dropdown-link select-none flex items-center cursor-pointer"
      >
        <el-image
          class="w-6 h-6 rounded-full"
          fit="cover"
          :src="
            authStore.userInfo?.avatar ||
            'https://img0.baidu.com/it/u=3897466336,342561281&fm=253&fmt=auto&app=138&f=JPEG?w=354&h=499'
          "
        />
        <span class="ml-2 text-base">
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
