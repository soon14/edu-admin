<script setup lang="ts">
const htmlContent = ref('<h1>hello</h1>')
const Editor1 = defineAsyncComponent(
  () => import('@/components/editor/index.vue')
)
</script>

<template>
  <el-card class="md:m-4">
    <Editor1 v-model="htmlContent" />
  </el-card>
</template>

<style scoped lang="scss"></style>
<script lang="ts">
export default {
  name: 'Draggable'
}
</script>
