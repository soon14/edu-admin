<script setup lang="ts">
import commonApi from '@/api/module/common'
import { UPLOAD_API } from '@/constants/fetch'
const props = defineProps({
  modelValue: {
    type: String,
    default: ''
  }
})
const emit = defineEmits<{
  (e: 'update:modelValue', url: string): void
}>()
const inputRef = ref<any | null>(null)
const currentFile = ref()
const currentBlob = ref('')
const dialogVisible = ref(false)
const imageUrl = ref(props.modelValue)
const percentage = ref(0)
const isShowProgress = computed(() => {
  return !imageUrl.value && percentage.value !== 100 && percentage.value !== 0
})

watch(imageUrl, () => {
  emit('update:modelValue', imageUrl.value)
})
watch(
  () => props.modelValue,
  () => {
    imageUrl.value = props.modelValue
  }
)

const handleClick = () => {
  inputRef.value.click()
}
const handleChange = () => {
  const file = inputRef.value.files[0]
  currentFile.value = file
  if (!beforeAvatarUpload(file)) return
  if (file) {
    const blob = URL.createObjectURL(currentFile.value)
    currentBlob.value = blob
    dialogVisible.value = true
  } else {
    currentBlob.value = ''
  }
}
const handleConfirm = async (data: any) => {
  imageUrl.value = ''
  const formData = new FormData()
  const file = base64ImgToFile(data)
  formData.append('file', file)
  dialogVisible.value = false
  imageUrl.value = (await commonApi[UPLOAD_API]({
    data: formData,
    onUploadProgress(progressEvent: ProgressEvent) {
      percentage.value = Math.floor(
        (progressEvent.loaded / progressEvent.total) * 100
      )
      if (percentage.value === 100) {
        percentage.value = 0
      }
    }
  })) as any
}
function beforeAvatarUpload(rawFile: File) {
  if (rawFile.type !== 'image/jpeg') {
    ElMessage.error('必须是jpeg格式的图片!')
    return false
  } else if (rawFile.size / 1024 / 1024 > 2) {
    ElMessage.error('图片最大上限为 2MB!')
    return false
  }
  return true
}
function base64ImgToFile(dataUrl: string, filename = 'file') {
  const arr = dataUrl.split(',') as any
  const mime = arr[0].match(/:(.*?);/)[1]
  const suffix = mime.split('/')[1]
  const bstr = atob(arr[1])
  let n = bstr.length
  const u8arr = new Uint8Array(n)
  while (n--) {
    u8arr[n] = bstr.charCodeAt(n)
  }
  return new File([u8arr], `${filename}.${suffix}`, {
    type: mime
  })
}
</script>

<template>
  <div class="upload-crop">
    <div class="upload-crop-inner" @click="handleClick">
      <div @click="handleClick" v-if="!imageUrl && percentage === 0">+</div>
      <div v-if="imageUrl" class="upload-crop-preview-box">
        <img class="upload-crop-preview-img" :src="imageUrl" alt="" />
      </div>
      <el-progress
        :width="80"
        type="circle"
        :percentage="percentage"
        v-if="isShowProgress"
      />
    </div>
    <input
      class="upload-crop-input"
      ref="inputRef"
      type="file"
      name=""
      id=""
      @change="handleChange"
    />

    <DialogCropper
      v-model="currentBlob"
      v-model:visible="dialogVisible"
      @confirm="handleConfirm"
    />
  </div>
</template>

<style scoped lang="scss">
.upload-crop-inner {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 150px;
  height: 150px;
  border: 1px solid;
  .upload-crop-preview-box {
    width: 100%;
    height: 100%;
    object-fit: cover;
    .upload-crop-preview-img {
      width: 100%;
      display: block;
    }
  }
}
.upload-crop-input {
  display: none;
}
</style>
<script lang="ts">
export default {
  name: 'UploadCrop'
}
</script>
