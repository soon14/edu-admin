<script setup lang="ts">
import { useSystem } from '@/store/system'
const store = useSystem()
const changeTheme = () => {
  store.changeTheme()
}
</script>

<template>
  <div
    class="change-theme"
    :class="store.theme === 'light' ? 'is-light' : null"
    @click="changeTheme"
    round
  >
    <i class="fas fa-sun" v-if="store.theme === 'dark'"></i>
    <i class="fas fa-moon" v-else></i>
  </div>
</template>

<style scoped lang="scss">
.change-theme {
  @apply w-8 h-8  flex items-center justify-center rounded-full bg-opacity-40 text-sm cursor-pointer duration-150 bg-white
    hover:bg-opacity-25;
  &.is-light {
    @apply bg-black bg-opacity-30 hover:bg-opacity-20;
    i {
      @apply text-white;
    }
  }
}
</style>
<script lang="ts">
export default {
  name: 'ChangeTheme'
}
</script>
