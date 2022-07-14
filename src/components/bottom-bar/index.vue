<script setup lang="ts"></script>

<template>
  <div class="fixed right-0 left-0 bottom-0 z-1 el-card h-14 flex items-center">
    <slot></slot>
  </div>
</template>

<style scoped lang="scss"></style>
<script lang="ts">
export default {
  name: 'BottomBar'
}
</script>
