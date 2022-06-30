<script setup lang="ts">
import router from '@/router'

const a = 123
const handleLogin = () => {
  router.push('/demo')
}
</script>

<template>
  <div class="home">
    home.vue
    <el-button type="primary" @click="handleLogin">去demo</el-button>
  </div>
</template>

<style scoped lang="scss"></style>
