<script setup lang="ts">
import { getData } from './data.js'
const props = defineProps({
  modelValue: {
    type: String,
    default: ''
  }
})
const emit = defineEmits<{
  (e: 'update:modelValue', value: string): void
}>()

const options = getData()
const value = ref<string>(props.modelValue)
watch(
  () => props.modelValue,
  () => {
    value.value = props.modelValue
  }
)
watch(value, () => {
  emit('update:modelValue', value.value)
})
</script>

<template>
  <el-select class="band-select" v-model="value" placeholder="请选择银行">
    <el-option
      v-for="item in options"
      :key="item.value"
      :label="item.text"
      :value="item.value"
    />
  </el-select>
</template>

<style scoped lang="scss"></style>
<script lang="ts">
export default {
  name: 'BandSelect'
}
</script>
