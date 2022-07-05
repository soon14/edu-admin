<script setup lang="ts">
const drawerVisible = ref(false)
const direction = 'rtl' // rtl / ltr / ttb / btt
const handleBeforeClose = (done: any) => {
  done()
}
const handleCancelClick = () => {}
const handleConfirmClick = () => {}
</script>

<template>
  <el-card class="md:m-4">
    <el-button type="primary" @click="drawerVisible = true">开启</el-button>
    <el-drawer
      title="我是标题"
      v-model="drawerVisible"
      :direction="direction"
      size="100vw"
      :before-close="handleBeforeClose"
    >
      <el-scrollbar>
        <el-main>
          <!-- 内容部分 -->
          <div v-for="(item, index) in 100" :key="index">{{ index }}</div>
          <!--  -->
        </el-main>
      </el-scrollbar>
      <template #footer>
        <div style="flex: auto">
          <el-button @click="handleCancelClick">cancel</el-button>
          <el-button type="primary" @click="handleConfirmClick"
            >confirm</el-button
          >
        </div>
      </template>
    </el-drawer>
  </el-card>
</template>

<style scoped lang="scss"></style>
