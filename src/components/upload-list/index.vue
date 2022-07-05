<template>
  <el-upload
    class="upload-demo"
    :limit="1"
    :before-upload="beforeAvatarUpload"
    :http-request="customUpload"
    :show-file-list="false"
  >
    <el-button type="primary">{{ text }}</el-button>
    <template #tip>
      <div class="el-upload__tip">
        支持mp4，avi，wmv，mov，flv，rmvb，3gp，m4v，mkv格式；文件最大不超过2G。
        当前最大支持720高清转码
      </div>
      <div class="file-list" v-if="modelValue">
        {{ modelValue }}
        <i class="fas fa-x icon-close" @click="handleRemove"></i>
      </div>
    </template>
  </el-upload>
</template>
<script lang="ts" setup>
import { ElMessage } from 'element-plus'
import commonApi from '@/api/module/common'
import { UPLOAD_API } from '@/constants/fetch'
import type { UploadProps } from 'element-plus'

const props = defineProps({
  modelValue: {
    type: String,
    default: ''
  },
  text: {
    type: String,
    default: ''
  }
})
const emit = defineEmits<{
  (e: 'update:modelValue', url: string): void
}>()
const beforeAvatarUpload: UploadProps['beforeUpload'] = (rawFile) => {
  console.log(rawFile.type)
  if (rawFile.type !== 'video/mp4') {
    ElMessage.error('必须是mp4格式的视频!')
    return false
  } else if (rawFile.size / 1024 / 1024 / 1024 > 2) {
    ElMessage.error('视频最大上限为 2G!')
    return false
  }
  return true
}
const customUpload: UploadProps['httpRequest'] = async ({ file }) => {
  const formData = new FormData()
  formData.append('file', file)
  const data = await commonApi[UPLOAD_API]({
    data: formData
  })
  emit('update:modelValue', data as any as string)
}
const handleRemove = () => {
  ElMessageBox.confirm('确定要删除该文件？', '提示', {
    type: 'warning',
    confirmButtonText: '确定',
    cancelButtonText: '取消'
  }).then(async () => {
    emit('update:modelValue', '')
  })
}
</script>
<style scoped lang="scss">
.file-list {
  @apply flex items-center h-6 m-auto mt-2 text-sm opacity-75;
  .icon-close {
    @apply ml-4 text-[12px] cursor-pointer top-[1px] relative hover:opacity-75;
  }
}
</style>
