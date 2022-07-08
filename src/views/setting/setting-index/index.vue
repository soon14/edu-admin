<script setup lang="ts">
import schoolApi from '@/api/module/school'
import { ISchoolInfo } from '@/api/module/types/school'
import { INFO_API, UPDATE_API } from '@/constants/fetch'
import { useCopy } from '@/utils/copy'
const loading = ref(false)
const schoolInfo = ref<Partial<ISchoolInfo>>({})
const getSchoolInfoData = async () => {
  loading.value = true
  schoolInfo.value = await schoolApi[INFO_API](11)
  loading.value = false
}
const updateSchoolInfo = async (name: string) => {
  await schoolApi[UPDATE_API]({ id: 11, name })
}
const handleSettingName = () => {
  ElMessageBox.prompt('请输入店铺名称', '设置', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    inputPattern: /.{1,}/,
    inputErrorMessage: '不能为空',
    inputValue: schoolInfo.value.name
  }).then(async ({ value }) => {
    await updateSchoolInfo(value)
    await getSchoolInfoData()
    ElMessage({
      type: 'success',
      message: `店铺名称已改为: ${value}`
    })
  })
}

const handleCopy = (value: string) => {
  useCopy(value)
}
getSchoolInfoData()
</script>

<template>
  <el-card class="md:m-4 flex justify-center" v-loading="loading">
    <div>
      <div class="item">
        <div class="left">店铺名称</div>
        <div class="c-border-bottom right">{{ schoolInfo.name }}</div>
        <el-button type="primary" @click="handleSettingName">设置</el-button>
      </div>
      <div class="item">
        <div class="left">店铺地址</div>
        <div class="c-border-bottom right">https://www.google.com</div>
        <el-button type="primary" @click="handleCopy(schoolInfo.weburl!)"
          >复制</el-button
        >
      </div>
      <div class="item">
        <div class="left">店铺管理员</div>
        <div class="c-border-bottom right">{{ schoolInfo.user?.phone }}</div>
      </div>
      <div class="item">
        <div class="left">店铺appid</div>
        <div class="c-border-bottom right">{{ schoolInfo.appid }}</div>
        <el-button type="primary" @click="handleCopy(schoolInfo.appid!)"
          >复制</el-button
        >
      </div>
    </div>
  </el-card>
</template>

<style scoped lang="scss">
.item {
  @apply flex mb-10;
  .left {
    @apply w-30 h-14 flex items-center;
  }
  .right {
    @apply h-14 w-130 flex items-center px-4;
  }
}
</style>
