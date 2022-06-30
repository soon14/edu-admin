<script setup lang="ts">
const handleToggleFullScreen = () => {
  if (!document.fullscreenElement) {
    document.documentElement.requestFullscreen()
  } else {
    if (document.exitFullscreen) {
      document.exitFullscreen()
    }
  }
}
</script>

<template>
  <div>
    <i class="full-screen fas fa-expand" @click="handleToggleFullScreen"></i>
  </div>
</template>

<style scoped lang="scss">
.full-screen {
  @apply cursor-pointer;
}
</style>
<script lang="ts">
export default {
  name: 'FullScreen'
}
</script>
