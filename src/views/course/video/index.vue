<script setup lang="ts">
const img = ref('https://gitee.com/static/images/logo-black.svg?t=158106664')
const fileRef = ref<InstanceType<typeof HTMLInputElement> | null>(null)
const change = () => {
  img.value = URL.createObjectURL((fileRef.value?.files as any)[0])
  console.log(img.value)
}
</script>

<template>
  <el-card class="md:m-4">
    {{ img }}
    <upload-crop v-model="img"></upload-crop>
  </el-card>
</template>

<style scoped lang="scss"></style>
