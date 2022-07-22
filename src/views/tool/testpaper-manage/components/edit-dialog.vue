<script setup lang="ts">
import { ElFormType } from '@/types/element-plus'
import { ITestUpdateStateReq, ITestItem } from '@/api/module/types/user-test'
import { rules } from './config/edit-rules'
import { cloneDeep } from '@/utils/lodash/'
import usePageAction from '@/hooks/usePageAction'
import userTestApi from '@/api/module/user-test'
import { UPDATE_STATE_API } from '@/constants/fetch'

const props = defineProps({
  getList: {
    type: Function,
    default: () => ({})
  }
})
const { getInfoData, loading } = usePageAction({
  module: 'user-test'
})
const showSke = ref(true)
const visible = ref(false)
const dialogTitle = ref('')
const formData = ref<ITestUpdateStateReq>({
  id: null,
  scores: []
})
const infoData = ref({})
// 标准答案分数与用户答案分数融合
const questionsMergeValues = ref({
  questions: []
})
const formRef = ref<ElFormType | null>(null)

const scoreCalc = computed(() => {
  let num = 0
  ;((questionsMergeValues.value as any).questions as any[]).forEach((it) => {
    num += it.score
  })
  return num
})

const handleConfirm = async () => {
  try {
    loading.value = true
    await userTestApi[UPDATE_STATE_API]({
      id: (questionsMergeValues.value as any).id as number,
      scores: questionsMergeValues.value.questions.map((it: any) => it.score)
    })
    await props.getList()
    ElMessage({
      type: 'success',
      message: formData.value.id ? '编辑成功' : '新增成功'
    })
  } finally {
    loading.value = false
  }
  visible.value = false
}
const handleClose = () => {
  formRef.value?.resetFields()
  showSke.value = true
}
// 提供给Question组件的融合对象
// 融合了 用户答案, 标准答案, 每题分数最大限制, 每题打分
const mergeInfoData = () => {
  const infoTemp: any = cloneDeep(infoData.value)
  infoTemp.questions.forEach((item: any, index: number) => {
    const maxScore = item.score
    item.score = infoTemp.values[index].score
    item.maxScore = maxScore
    const userAnswer = infoTemp.values[index].answer
    if (userAnswer === '') {
      item.userAnswer = ''
    } else if (Array.isArray(userAnswer)) {
      if (userAnswer.length === 0 && userAnswer.includes('')) {
        item.userAnswer = ''
      }
    } else if (item.userAnswer === -1) {
      item.userAnswer = ''
    } else {
      item.userAnswer = userAnswer
    }
  })
  questionsMergeValues.value = infoTemp
}

const open = async (title: string, row?: ITestItem) => {
  try {
    loading.value = true
    visible.value = true
    dialogTitle.value = `${title}  -  ${row!.testpaper.title}`
    infoData.value = await getInfoData(row!.id as number)
    mergeInfoData()
  } finally {
    loading.value = false
    showSke.value = false
  }
}

const handleChangeQuestion = (questions: any, index: number) => {
  ;(questionsMergeValues.value as any).questions![index] = questions
}
defineExpose({ open })
</script>

<template>
  <div class="edit-dialog">
    <DialogBase
      :loading="loading"
      v-model="visible"
      :title="dialogTitle"
      show-btn
      @confirm="handleConfirm"
      @close="handleClose"
    >
      <!-- <pre>
      {{ infoData }}
    </pre
      > -->
      <div v-loading="loading" v-if="!showSke">
        <template
          v-for="(item, index) in (questionsMergeValues as any).questions"
          :key="item.id"
        >
          <Question
            :index="(index as unknown as number)"
            :question="(item as any)"
            :max-score="item.maxScore"
            @change-question="
              (question : any) => handleChangeQuestion(question, index)
            "
            :user-answer="item.userAnswer || '(用户未填写答案)'"
          >
            <template #delete_btn>
              {{ `本题分值${item.maxScore}` }}
            </template>
          </Question>
        </template>
      </div>
      <div v-else>
        <el-skeleton
          v-if="loading"
          animated
          :rows="3"
          class="pt-10"
        ></el-skeleton>
        <el-skeleton
          v-if="loading"
          animated
          :rows="4"
          class="pt-10"
        ></el-skeleton>
      </div>
      <template #append>
        <div class="ml-auto text-sm mt-6">
          共
          <span class="text-red-500"
            >{{ ((questionsMergeValues as any).questions as any[]).length }}
          </span>
          题 &nbsp;&nbsp;分数:
          <span class="text-red-500">{{ scoreCalc }}</span> 分
        </div>
      </template>
    </DialogBase>
  </div>
</template>

<style scoped lang="scss"></style>
