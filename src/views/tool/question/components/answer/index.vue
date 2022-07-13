<script setup lang="ts">
import { PropType } from 'vue'
import { questionType, IValue } from '@/api/module/types/question'
import { radio } from './config/useTableColumns'
// import answerTemplate from './config/answer-template'

const props = defineProps({
  type: {
    type: String as PropType<questionType>,
    default: ''
  },
  value: {
    type: Object as PropType<IValue>,
    default: () => ({})
  }
})

// a-z 字母
const lettersCalc = computed(() => {
  const result = []
  for (let i = 'A'.charCodeAt(0); i <= 'Z'.charCodeAt(0); i++) {
    result.push(String.fromCharCode(i))
  }
  return result
})

const emit = defineEmits<{
  (e: 'change-value', val: number): void
  (e: 'change-options', val: any): void
}>()

const handleCreateOption = (type: string) => {
  const options = [...props.value.options]
  // if (type === 'radio') {
  //   options.push('点击编辑')
  // } else if (type === 'checkbox') {
  //   options.push('')
  // } else if (type === 'trueOrfalse') {

  // } else if (type === 'answer') {
  // } else if (type === 'completion') {
  // }
  options.push('点击编辑内容')
  emit('change-options', options)
}
const handleUpdate = (index: any) => {
  emit('change-value', Number(index))
}
const handleDelete = (row: any, index: number) => {
  // TODO 判断当前删除数量下限
  const options = [...props.value.options]
  options.splice(index, 1)
  emit('change-options', options)
}
// 编辑答案
const handleEditAnswer = (val: string, index: number) => {
  const options = [...props.value.options]
  options[index] = val
  emit('change-options', options)
}
const radioColumns = radio({
  handleDelete
})
</script>

<template>
  <el-form class="w-full">
    <template v-if="type === 'radio'">
      <PageTable :list="value.options" :columns="radioColumns">
        <template #option="{ index }">
          <el-radio
            :model-value="(value.value as any)"
            @update:model-value="handleUpdate"
            :label="index"
            >&nbsp;</el-radio
          >
        </template>
        <template #letter="{ index }">
          {{ lettersCalc[index] }}
        </template>
        <template #answer="{ row }">
          {{ row }}
        </template>
      </PageTable>
      <el-button
        class="mt-2"
        type="primary"
        @click="handleCreateOption('radio')"
        >新增</el-button
      >
    </template>
    <template v-else-if="type === 'checkbox'"> </template>
    <template v-else-if="type === 'trueOrfalse'">
      <PageTable :list="value.options" :columns="radioColumns">
        <template #option="{ index }">
          <el-radio
            :model-value="(value.value as any)"
            @update:model-value="handleUpdate"
            :label="index"
            >&nbsp;</el-radio
          >
        </template>
        <template #letter="{ index }">
          {{ lettersCalc[index] }}
        </template>
        <template #answer="{ row, index }">
          <el-input
            :model-value="row"
            @update:model-value="(val) => handleEditAnswer(val, index)"
          ></el-input>
        </template>
      </PageTable>
      <el-button
        class="mt-2"
        type="primary"
        @click="handleCreateOption('radio')"
        >新增</el-button
      >
    </template>
    <template v-else-if="type === 'answer'"> </template>
    <template v-else-if="type === 'completion'"> </template>
  </el-form>
</template>

<style scoped lang="scss"></style>
<script lang="ts">
export default {
  name: 'CAnswer'
}
</script>
