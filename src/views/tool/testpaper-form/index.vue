<script setup lang="ts">
import { ITestInfoRes, ITestUpdateReq } from '@/api/module/types/testpaper'
import testpaperApi from '@/api/module/testpaper'
import { CREATE_API, INFO_API, UPDATE_API } from '@/constants/fetch'
import { cloneDeep } from '@/utils/lodash'
import DialogSelectQuestion from '@/components/dialog-select-question/index.vue'

const rules = ref({})
const formData = ref<ITestInfoRes>({
  id: null,
  title: '',
  total_score: 100,
  pass_score: 60,
  expire: 60,
  status: 1,
  questions: [] // 题目列表
})
const loading = ref(false)
const showSke = ref(true)
const route = useRoute()
const idCalc = computed(() => route.params.id)
const scoreCalc = computed(() => {
  let num = 0
  formData.value.questions?.forEach((it) => (num += it.score))
  return num
})

const handleChangeQuestion = (questions: any, index: number) => {
  formData.value.questions![index] = questions
}
const getInfoData = async () => {
  try {
    loading.value = true
    formData.value = (await testpaperApi[INFO_API](
      Number(idCalc.value)
    )) as unknown as ITestInfoRes
  } finally {
    loading.value = false
  }
}

const handleDelete = async (id: number, index: number) => {
  ;(formData.value.questions as any[]).splice(index, 1)
  // try {
  //   loading.value = true
  //   await testpaperApi[DELETE_API]({ ids: [id] })
  //   await getInfoData()
  //   ElMessage({
  //     type: 'success',
  //     message: '删除成功',
  //     duration: 1500
  //   })
  // } finally {
  //   loading.value = false
  // }
}
const router = useRouter()
const handleSave = async () => {
  try {
    loading.value = true
    const params = cloneDeep(formData.value)
    params.questions?.forEach((it) => {
      it.question_id = it.question.id
    })
    if (idCalc.value) {
      await testpaperApi[UPDATE_API](params as any)
    } else {
      await testpaperApi[CREATE_API](params as any)
    }
    idCalc.value && (await getInfoData())
    ElMessage({
      type: 'success',
      message: '保存成功',
      duration: 1500
    })
    router.back()
  } finally {
    loading.value = false
  }
}
const questionDialogRef = ref<InstanceType<typeof DialogSelectQuestion> | null>(
  null
)
const handleCreate = () => {
  questionDialogRef.value?.open()
}
const handleSelected = (questions: any[]) => {
  questions.forEach((question) => {
    const tempObj: Record<string, any> = {}
    tempObj.question = question
    tempObj.question_id = question.id
    tempObj.score = 0
    formData.value.questions!.push(tempObj as any)
  })
}
onMounted(async () => {
  if (idCalc.value) {
    await getInfoData()
  }
  showSke.value = false
})
</script>

<template>
  <el-card class="md:m-4" v-loading="loading">
    <el-header>
      <el-page-header title="返回" @back="router.back()"></el-page-header>
    </el-header>
    <template v-if="showSke">
      <div class="w-50vw">
        <el-skeleton animated :rows="3" class="my-10"></el-skeleton>
        <el-skeleton animated :rows="2" class="my-10"></el-skeleton>
        <el-skeleton animated :rows="2" class="my-10 mb-20"></el-skeleton>
      </div>
    </template>

    <template v-else>
      <el-form
        ref="formRef"
        class="w-full"
        :model="formData"
        :rules="rules"
        label-width="180px"
      >
        <el-form-item label="试卷名称" prop="title">
          <el-input v-model="formData.title"></el-input>
        </el-form-item>
        <el-form-item label="是否公开" prop="status">
          <el-radio-group v-model="formData.status">
            <el-radio :label="1">是</el-radio>
            <el-radio :label="0">否</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="总分" prop="total_score">
          <el-input-number
            v-model="formData.total_score"
            :min="0"
          ></el-input-number>
        </el-form-item>
        <el-form-item label="及格分" prop="pass_score">
          <el-input-number
            v-model="formData.pass_score"
            :min="0"
          ></el-input-number>
        </el-form-item>
        <el-form-item label="时间限制" prop="expire">
          <el-input-number v-model="formData.expire" :min="0"></el-input-number>
        </el-form-item>
        <el-form-item label="题目列表" prop="questions">
          <template v-if="(formData.questions as any[]).length">
            <template v-for="(item, index) in formData.questions" :key="index">
              <Question
                :index="(index as unknown as number)"
                :question="(item as any)"
                @delete="(id: number) => handleDelete(id, index)"
                @change-question="
                  (question:any) => handleChangeQuestion(question, index)
                "
              ></Question>
            </template>
          </template>
          <el-empty
            v-else
            :image-size="100"
            description="暂无题目, 请点击添加题目"
            class="mt-2"
          />
        </el-form-item>
      </el-form>
      <BottomBar>
        <div class="ml-auto text-sm">
          当前已有题目
          {{ (formData.questions as any[]).length }} 题 &nbsp;&nbsp;分数:
          {{ scoreCalc }} 分
        </div>
        <el-button class="ml-4 mr-2" type="success" @click="handleCreate"
          >添加题目</el-button
        >
        <el-button class="mr-10" type="primary" @click="handleSave"
          >保存</el-button
        >
      </BottomBar>
    </template>
    <DialogSelectQuestion
      ref="questionDialogRef"
      @selected="handleSelected"
    ></DialogSelectQuestion>
  </el-card>
</template>

<style scoped lang="scss"></style>
