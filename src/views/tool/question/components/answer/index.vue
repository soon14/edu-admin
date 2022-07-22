<script setup lang="ts">
import { PropType } from 'vue'
import { questionType, IValue } from '@/api/module/types/question'
import { radio, answer, completion } from './config/useTableColumns'
import { optionsLengthMap } from './config/options-length'

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
  (e: 'change-value', val: number[] | number): void
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
// 单选和多选 value 是数组格式
const handleRadioAndCheckboxUpdate = (index: any) => {
  const currentType = props.type
  let value = [...(props.value.value as unknown as number[])]
  const i = value.indexOf(index)
  if (i === -1) {
    if (currentType === 'radio') {
      value = [index]
    } else {
      value.push(index)
    }
  } else {
    if (currentType === 'checkbox') {
      value.splice(i, 1)
    }
  }
  emit('change-value', value)
}
// 判断 value 是字符串格式
const handleUpdate = (index: any) => {
  emit('change-value', Number(index))
}
const handleDelete = (row: any, index: number) => {
  const minLength = (optionsLengthMap as any)[props.type]
  if (minLength >= props.value.options.length) {
    const message = `删除失败, 最少保留 ${minLength} 条选项`
    ElMessage({
      type: 'warning',
      message,
      duration: 1500
    })
    return
  }
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
const answerColumns = answer()
const completionColumns = completion({ handleDelete })
</script>

<template>
  <el-form class="w-full">
    <template v-if="type === 'radio'">
      <PageTable :list="value.options" :columns="radioColumns">
        <template #option="{ index }">
          <el-radio
            :model-value="(value.value as any)[0]"
            @update:model-value="handleRadioAndCheckboxUpdate"
            :label="index"
            >&nbsp;</el-radio
          >
        </template>
        <template #letter="{ index }">
          {{ lettersCalc[index] }}
        </template>
        <template #answer="{ row, index }">
          <AnswerEditor
            :model-value="row + ''"
            @update:model-value="(val: any) => handleEditAnswer(val, index)"
          ></AnswerEditor>
        </template>
      </PageTable>
      <el-button
        class="mt-2"
        type="primary"
        @click="handleCreateOption('radio')"
        >新增</el-button
      >
    </template>
    <template v-else-if="type === 'checkbox'">
      <PageTable :list="value.options" :columns="radioColumns">
        <template #option="{ index }">
          <el-checkbox-group
            :model-value="(value.value as any)"
            @update:model-value="() => handleRadioAndCheckboxUpdate(index)"
          >
            <el-checkbox :label="index">&nbsp;</el-checkbox>
          </el-checkbox-group>
        </template>
        <template #letter="{ index }">
          {{ lettersCalc[index] }}
        </template>
        <template #answer="{ row, index }">
          <AnswerEditor
            :model-value="row + ''"
            @update:model-value="(val:any) => handleEditAnswer(val, index)"
          ></AnswerEditor>
        </template>
      </PageTable>
      <el-button
        class="mt-2"
        type="primary"
        @click="handleCreateOption('checkbox')"
        >新增</el-button
      >
    </template>
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
          <AnswerEditor
            :model-value="row + ''"
            @update:model-value="(val:any) => handleEditAnswer(val, index)"
          ></AnswerEditor>
        </template>
      </PageTable>
      <el-button
        class="mt-2"
        type="primary"
        @click="handleCreateOption('trueOrfalse')"
        >新增</el-button
      >
    </template>
    <template v-else-if="type === 'answer'">
      <PageTable :list="value.options" :columns="answerColumns">
        <template #option="{ index }">
          <el-radio
            :model-value="(value.value as any)[0]"
            @update:model-value="handleRadioAndCheckboxUpdate"
            :label="index"
            >&nbsp;</el-radio
          >
        </template>
        <template #letter="{ index }">
          {{ lettersCalc[index] }}
        </template>
        <template #answer="{ row, index }">
          <AnswerEditor
            :model-value="row + ''"
            @update:model-value="(val:any) => handleEditAnswer(val, index)"
          ></AnswerEditor>
        </template>
      </PageTable>
    </template>
    <template v-else-if="type === 'completion'">
      <PageTable :list="value.options" :columns="completionColumns">
        <template #option="{ row, index }">
          <AnswerEditor
            :model-value="row + ''"
            @update:model-value="(val:any) => handleEditAnswer(val, index)"
          ></AnswerEditor>
        </template>
      </PageTable>
      <el-button
        class="mt-2"
        type="primary"
        @click="handleCreateOption('completion')"
        >新增</el-button
      >
    </template>
  </el-form>
</template>

<style scoped lang="scss"></style>
<script lang="ts">
export default {
  name: 'CAnswer'
}
</script>
