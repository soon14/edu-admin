<script setup lang="ts">
import HeaderAvatar from './components/avatar.vue'
</script>

<template>
  <div class="header">
    <div class="header-logo" @click="$router.push('/')">
      <img src="/paina.svg" alt="" />
      <h1>SCUI</h1>
    </div>
    <div class="header-actions">
      <header-avatar></header-avatar>
    </div>
  </div>
</template>

<style scoped lang="scss">
.header {
  @apply flex justify-between items-center w-full h-full;
  .header-logo {
    @apply flex items-center cursor-pointer;
    img {
      @apply w-4 mr-2;
    }
    h1 {
      @apply text-xl select-none;
    }
  }
}
</style>
<script lang="ts">
export default {
  name: 'LayoutHeader'
}
</script>
