<script setup lang="ts">
import HeaderAvatar from './components/avatar.vue'
import FullScreen from './components/full-screen.vue'
import SearchPage from './components/search-page.vue'
</script>

<template>
  <div class="header !light:text-white">
    <div class="header-logo" @click="$router.push('/')">
      <img src="/paina.svg" alt="" />
      <h1>SCUI</h1>
    </div>
    <div class="header-actions">
      <search-page></search-page>
      <full-screen class="mx-4"></full-screen>
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
  .header-actions {
    @apply flex items-center;
  }
}
</style>
<script lang="ts">
export default {
  name: 'LayoutHeader'
}
</script>
