<script setup lang="ts">
import data from './data.json'
const props = {
  label: 'name',
  value: 'name'
}
const emit = defineEmits<{
  (e: 'change', data: string[]): void
}>()
const value = ref<string[]>()
const handleChange = (data: string[]) => {
  emit('change', data)
}
const setValue = (data: string[]) => {
  value.value = data
}
defineExpose({ setValue })
</script>

<template>
  <el-cascader
    placeholder="请选择省市区"
    :options="data"
    :props="props"
    clearable
    v-model="value"
    @change="handleChange"
    :show-all-levels="false"
  />
</template>

<style scoped lang="scss"></style>
<script lang="ts">
export default {
  name: 'CitySelect'
}
</script>
