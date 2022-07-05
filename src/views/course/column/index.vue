<script setup lang="ts">
const drawerVisible = ref(false)
const direction = 'rtl' // rtl / ltr / ttb / btt
const file = ref('123123.jpg')
const handleBeforeClose = (done: any) => {
  done()
}
const handleCancelClick = () => {}
const handleConfirmClick = () => {}
</script>

<template>
  <el-card class="md:m-4">
    <el-button type="primary" @click="drawerVisible = true">开启</el-button>
    <UploadList v-model="file"></UploadList>
  </el-card>
</template>

<style scoped lang="scss"></style>
