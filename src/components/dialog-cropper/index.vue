<script setup lang="ts">
import 'vue-cropper/dist/index.css'
import { VueCropper } from 'vue-cropper'

const props = defineProps({
  modelValue: {
    type: String,
    default: ''
  },
  visible: {
    type: Boolean,
    default: false
  }
})
const emit = defineEmits<{
  (e: 'update:visible', flag: boolean): void
  (e: 'confirm', data: string): void
}>()
const currentVisible = ref(props.visible)
const tempBlob = ref('')
const cropper = ref<any>(null)

watch(currentVisible, () => {
  emit('update:visible', currentVisible.value)
})
watch(
  () => props.visible,
  () => {
    currentVisible.value = props.visible
  }
)
// 生成文件
const getCropData = () => {
  return new Promise((resolve) => {
    cropper.value.getCropData((data: string) => {
      resolve(data)
    })
  })
}
const realTime = () => {
  cropper.value.getCropBlob((data: File) => {
    tempBlob.value = URL.createObjectURL(data)
    setTimeout(() => {
      URL.revokeObjectURL(tempBlob.value)
    }, 30)
  })
}
const handleClose = () => {
  URL.revokeObjectURL(props.modelValue)
}
const handleConfirm = async () => {
  const data = await getCropData()
  emit('confirm', data as string)
}
defineExpose({ getCropData })
</script>

<template>
  <div class="dialog-cropper">
    <el-dialog
      title="裁剪图片"
      v-model="currentVisible"
      @close="handleClose"
      width="700px"
    >
      <div class="dialog-inner">
        <vue-cropper
          style="width: 400px; height: 400px"
          ref="cropper"
          :img="props.modelValue"
          :fixedNumber="[1, 1]"
          autoCrop
          centerBox
          fixed
          full
          @realTime="realTime"
        />
        <div class="preview-box">
          <img :src="tempBlob" alt="" />
        </div>
      </div>
      <template #footer>
        <el-button type="info" @click="currentVisible = false">取消</el-button>
        <el-button type="primary" @click="handleConfirm">确定</el-button>
      </template>
    </el-dialog>
  </div>
</template>

<style scoped lang="scss">
.dialog-inner {
  @apply flex;
}
.preview-box {
  width: 160px;
  height: 160px;
  margin-left: 40px;
  img {
    width: 160px;
    height: 160px;
  }
}
</style>
<script lang="ts">
export default {
  name: 'DialogCropper'
}
</script>
