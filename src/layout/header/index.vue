<script setup lang="ts">
import HeaderAvatar from './components/avatar.vue'
import FullScreen from './components/full-screen.vue'
import SearchPage from './components/search-page.vue'
</script>

<template>
  <div class="header">
    <div class="header-logo" @click="$router.push('/')">
      <img src="/windi_logo.svg" alt="" />
      <!-- <h1>Windi Css</h1> -->
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
      @apply w-10;
    }
    h1 {
      @apply font-light text-sm select-none tracking-widest;
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
