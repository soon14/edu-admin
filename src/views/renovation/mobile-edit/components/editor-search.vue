<script setup lang="ts">
import useRenovation from '../hooks/useRenovation'

const { data, activeIndex } = useRenovation()
</script>

<template>
  <div class="w-120">
    <el-form>
      <el-form-item label="占位提示">
        <el-input
          placeholder="请输入占位提示"
          v-model="data.template[activeIndex].placeholder"
        ></el-input>
      </el-form-item>
    </el-form>
  </div>
</template>

<style scoped lang="scss">
.template-list {
  @apply select-none;
}
</style>
