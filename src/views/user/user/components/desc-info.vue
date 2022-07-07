<script setup lang="ts">
const props = defineProps({
  data: {
    type: Object,
    default: () => ({})
  }
})
</script>

<template>
  <el-form label-position="left" inline label-suffix=":" class="space-x-20">
    <el-row>
      <el-col :span="12" :md="4">
        <el-form-item label="id"> {{ data.id }} </el-form-item>
      </el-col>
      <el-col :span="12" :md="5">
        <el-form-item label="用户名">
          {{ data.user?.username }}
        </el-form-item>
      </el-col>
      <el-col :span="12" :md="5">
        <el-form-item label="昵称">
          {{ data.user?.nickname || '无' }}
        </el-form-item>
      </el-col>
      <el-col :span="12" :md="5">
        <el-form-item label="锁定">
          {{ data.no_access ? '否' : '是' }}
        </el-form-item>
      </el-col>
      <el-col :span="12" :md="5">
        <el-form-item label="会员">
          {{ data.user?.status ? '是' : '否' }}
        </el-form-item>
      </el-col>
    </el-row>
  </el-form>
</template>

<style scoped lang="scss"></style>
