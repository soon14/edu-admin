<script setup lang="ts">
import { ElFormType } from '@/types/element-plus'
import { IQuestionItem, questionType } from '@/api/module/types/question'
import { rules } from './config/edit-rules'
import { cloneDeep } from '@/utils/lodash/'
import usePageAction from '@/hooks/usePageAction'
import Answer from './answer/index.vue'
import { templates } from './answer/config/answer-template'

const props = defineProps({
  getList: {
    type: Function,
    default: () => ({})
  }
})
const { createData, updateData } = usePageAction({
  module: 'question'
})
const visible = ref(false)
const dialogTitle = ref('')
const formData = ref<Partial<IQuestionItem>>({
  id: null,
  school_id: 11,
  title: '',
  remark: '',
  type: 'radio',
  value: {
    options: [],
    value: null
  }
})
const currentType = computed(() => formData.value.type)
const values = ref({
  radio: null,
  checkbox: null,
  trueOrfalse: null,
  answer: null,
  completion: null
})

// watch(visible, () => {
//   const currentType = formData.value.type
//   if (visible.value) {
//     values.value.radio = templates['radio']() as any
//     values.value.checkbox = templates['checkbox']() as any
//     values.value.trueOrfalse = templates['trueOrfalse']() as any
//     values.value.answer = templates['answer']() as any
//     values.value.completion = templates['completion']() as any
//     if (formData.value.id) {
//       // @ts-ignore
//       values.value[currentType] = formData.value
//       console.log(formData.value)
//     }
//   } else {
//     formData.value = {
//       id: null,
//       school_id: 11,
//       title: '',
//       remark: '',
//       type: 'radio',
//       value: {
//         options: [],
//         value: null
//       }
//     }
//   }
// })

const formRef = ref<ElFormType | null>(null)
const formLoading = ref(false)

const handleConfirm = () => {
  formRef.value?.validate(async (valid) => {
    if (valid) {
      formLoading.value = true
      const params = {
        ...formData.value,
        // @ts-ignore
        value: values.value[currentType.value]
      }
      try {
        if (formData.value.id) {
          await updateData(params)
        } else {
          await createData(params)
        }
        ElMessage({
          type: 'success',
          message: formData.value.id ? '编辑成功' : '新增成功'
        })
      } finally {
        formLoading.value = false
      }
      visible.value = false
      await props.getList()
    }
  })
}
const handleClose = () => {
  formRef.value?.resetFields()
  formData.value.type = 'radio'
  // setTimeout(() => {
  //   formData.value = {
  //     id: null,
  //     school_id: 11,
  //     title: '',
  //     remark: '',
  //     type: 'radio',
  //     value: {
  //       options: [],
  //       value: null
  //     }
  //   }
  // }, 1000)
}
const open = (title: string, row?: IQuestionItem) => {
  visible.value = true
  dialogTitle.value = title
  values.value.radio = templates['radio']() as any
  values.value.checkbox = templates['checkbox']() as any
  values.value.trueOrfalse = templates['trueOrfalse']() as any
  values.value.answer = templates['answer']() as any
  values.value.completion = templates['completion']() as any
  if (row && row.id) {
    formData.value = cloneDeep({
      ...row
    })
    // @ts-ignore
    values.value[currentType.value] = { ...formData.value.value }
  }
}
const handleChangeValue = (index: any) => {
  // @ts-ignore
  values.value[currentType.value].value = index
}
const handleChangeOptions = (options: any) => {
  // @ts-ignore
  values.value[currentType.value].options = options
}
defineExpose({ open })
</script>

<template>
  <div class="edit-dialog">
    <DialogBase
      :loading="formLoading"
      v-model="visible"
      :title="dialogTitle"
      show-btn
      @confirm="handleConfirm"
      @close="handleClose"
    >
      <el-form
        ref="formRef"
        :model="formData"
        :rules="rules"
        label-width="80px"
        size="default"
      >
        <el-form-item label="题目" prop="title">
          <el-input v-model="formData.title"></el-input>
        </el-form-item>
        <el-form-item label="题目类型" prop="type">
          <el-radio-group v-model="formData.type">
            <el-radio-button label="radio">单选题</el-radio-button>
            <el-radio-button label="checkbox">多选题</el-radio-button>
            <el-radio-button label="trueOrfalse">判断题</el-radio-button>
            <el-radio-button label="answer">问答题</el-radio-button>
            <el-radio-button label="completion">填空题</el-radio-button>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="解析" prop="remark">
          <!-- <Editor v-model="formData.remark"></Editor> -->
        </el-form-item>
        <el-form-item label="题目答案">
          <Answer
            :type="formData.type"
            :value="(values as any)[currentType!]"
            @change-value="handleChangeValue"
            @change-options="handleChangeOptions"
          ></Answer>
        </el-form-item>
      </el-form>
    </DialogBase>
  </div>
</template>

<style scoped lang="scss"></style>
