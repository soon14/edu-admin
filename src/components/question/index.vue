<script setup lang="ts">
import { questionTypes } from '@/constants/question'
const props = defineProps({
  question: {
    type: Object,
    default: () => ({})
  },
  index: {
    type: Number,
    default: 0
  },
  maxScore: {
    type: Number,
    default: 200
  },
  userAnswer: {
    type: [Array, String, Number],
    default: ''
  }
})

const emit = defineEmits<{
  (e: 'changeQuestion', question: any): void
  (e: 'delete', id: number): void
}>()

const currentScore = computed({
  get() {
    return props.question.score
  },
  set(val) {
    emit('changeQuestion', { ...props.question, score: val })
  }
})

const options = computed(() => props.question?.question?.value?.options)
const value = computed(() => props.question?.question?.value?.value)

// a-z 字母
const lettersCalc = computed(() => {
  const result = []
  for (let i = 'A'.charCodeAt(0); i <= 'Z'.charCodeAt(0); i++) {
    result.push(String.fromCharCode(i))
  }
  return result
})

const parseAnswerFilter = (type: string, answer: any = '无') => {
  if (
    type === 'radio' ||
    type === 'checkbox' ||
    type === 'trueOrfalse' ||
    type === 'completion'
  ) {
    if (Array.isArray(answer)) {
      const arr = [...answer].map((it) => lettersCalc.value[it])
      return arr.join(', ')
    } else {
      return lettersCalc.value[answer]
    }
  } else {
    return answer
  }
}

const handleDelete = () => {
  emit('delete', props.question.question.id)
}
</script>

<template>
  <div class="w-full el-card p-4 mb-4">
    <div class="flex items-center">
      <div class="flex items-center">
        <el-tag type="" class="mr-4">{{
          questionTypes[question.question.type]
        }}</el-tag>
        <div>
          第
          <span class="w-5 inline-block text-center">{{ index + 1 }}</span> 题
        </div>
        <div
          class="text-lg ml-4 line-clamp-1"
          v-html="question.question.title"
        ></div>
      </div>
      <div class="flex items-center ml-auto pr-4">
        <div>分值:</div>
        <el-input-number
          class="mx-4"
          v-model="currentScore"
          :min="0"
          :max="maxScore"
        ></el-input-number>
        <slot name="delete_btn">
          <el-popconfirm title="确定删除吗？" @confirm="handleDelete">
            <template #reference>
              <el-button type="danger"> 删除 </el-button>
            </template>
          </el-popconfirm>
        </slot>
      </div>
    </div>
    <el-divider v-if="question.question.type !== 'answer'"></el-divider>
    <div class="py-2" v-if="question.question.type !== 'answer'">
      <template v-for="(item, index) in options" :key="index">
        <div class="flex items-center h-14">
          <el-tag
            type="info"
            class="mr-4"
            v-if="question.question.type !== 'completion'"
            >{{ lettersCalc[index] }}</el-tag
          >
          <el-tag type="info" class="mr-4" v-else>{{ index + 1 }}</el-tag>
          <div v-html="item"></div>
        </div>
      </template>
    </div>
    <div v-if="question.question.type !== 'completion'">
      <el-divider></el-divider>
      标准答案:
      <template v-if="question.question.type === 'answer'">
        <span
          class="text-xl ml-4"
          v-html="question.question.value.options"
        ></span>
      </template>
      <template v-else>
        <span class="text-xl ml-4">{{
          parseAnswerFilter(question.question.type, value)
        }}</span>
      </template>
    </div>

    <div v-if="userAnswer">
      <el-divider></el-divider>
      用户答案:
      <template v-if="question.question.type === 'answer'">
        <span class="text-xl ml-4" v-html="userAnswer"></span>
      </template>
      <template v-else>
        <span class="text-xl ml-4">{{
          parseAnswerFilter(question.question.type, userAnswer) ||
          '(用户未填写答案)'
        }}</span>
      </template>
    </div>
  </div>
</template>

<style scoped lang="scss"></style>
<script lang="ts">
export default {
  name: 'CQuestion'
}
</script>
