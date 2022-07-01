<script setup lang="ts">
const route = useRoute()
const matchedCalc = computed(() => {
  return route.matched.filter((it) => it.meta.title)
})
</script>

<template>
  <el-breadcrumb separator="/">
    <el-breadcrumb-item :to="{ path: '/' }"> 首页</el-breadcrumb-item>
    <template v-for="item in matchedCalc" :key="item.name">
      <el-breadcrumb-item>
        {{ item.meta.title }}
      </el-breadcrumb-item>
    </template>
  </el-breadcrumb>
</template>

<style scoped lang="scss"></style>
<script lang="ts">
export default {
  name: 'Breadcrumb'
}
</script>
