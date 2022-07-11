<script setup lang="ts">
import commonApi from '@/api/module/common'
import { UPLOAD_API } from '@/constants/fetch'
import { UploadProps } from 'element-plus'

const props = defineProps({
  modelValue: {
    type: String,
    default: ''
  }
})
const emit = defineEmits<{
  (e: 'update:modelValue', imageUrl: string): void
}>()
const percentage = ref(0)
const imageUrl = ref(props.modelValue)
const beforeAvatarUpload: UploadProps['beforeUpload'] = (rawFile) => {
  if (rawFile.type !== 'image/jpeg') {
    ElMessage.error('必须是jpeg格式的图片!')
    return false
  } else if (rawFile.size / 1024 / 1024 > 2) {
    ElMessage.error('图片最大上限为 2MB!')
    return false
  }
  return true
}
const customUpload = async (e: any) => {
  imageUrl.value = ''
  const formData = new FormData()
  formData.append('file', e.file)
  try {
    const data = await commonApi[UPLOAD_API]({
      data: formData,
      onUploadProgress(progressEvent: ProgressEvent) {
        percentage.value = Math.floor(
          (progressEvent.loaded / progressEvent.total) * 100
        )
        if (percentage.value === 100) {
          percentage.value = 0
        }
      }
    })
    // imageUrl.value = URL.createObjectURL(data)
    imageUrl.value = data as any
  } catch (err) {
    imageUrl.value = ''
    percentage.value = 0
    ElMessage.error('上传失败, 请稍后再试')
  } finally {
    emit('update:modelValue', imageUrl.value)
  }
}
const isShowProgress = computed(() => {
  return !imageUrl.value && percentage.value !== 0
})
</script>

<template>
  <el-upload
    :disabled="isShowProgress"
    class="upload-image"
    :before-upload="beforeAvatarUpload"
    :http-request="(customUpload as any)"
    :show-file-list="false"
  >
    <div class="icon-upload">
      <el-progress
        :width="80"
        type="circle"
        :percentage="percentage"
        v-if="isShowProgress"
      />
      <template v-else>
        <img v-if="imageUrl" :src="imageUrl" class="image" />
        <img v-else class="opacity-10" src="./svg/upload.svg" alt="" />
      </template>
    </div>
  </el-upload>
</template>

<style scoped lang="scss">
.upload-image {
  width: 108px;
  height: 108px;
  display: block;
  border: 1px dashed #474747;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: border 0.3s;
  &:hover {
    border-color: #929292;
  }
}
.icon-upload {
  width: 100px;
  height: 100px;
  display: flex;
  justify-content: center;
  align-items: center;
  user-select: none;
  & > img {
    width: 40%;
  }
  .image {
    display: block;
    width: 100%;
  }
}
</style>

<script lang="ts">
export default {
  name: 'UploadImage'
}
</script>
