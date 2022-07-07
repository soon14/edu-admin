<script setup lang="ts">
import schoolUserApi from '@/api/module/school-user'
import { ISchoolUser } from '@/api/module/types/school-user'
import DescPane from './desc-pane.vue'
import DescInfo from './desc-info.vue'
const visible = ref(false)
const dialogTitle = ref('')
const schoolId = ref(-1)
const infoLoading = ref(false)
const descData = ref<Partial<ISchoolUser>>({})
const userId = ref<number>(-1)
const activeTabName = ref('course')
const tabOptions = [
  { label: '课程订阅', name: 'course' },
  { label: '专栏订阅', name: 'column' },
  { label: '订单记录', name: 'order' },
  { label: '观看历史', name: 'history' }
  // { label: '用户评论', name: 'comment' }
]
const descLoading = ref(false)
const getInfoData = async () => {
  descLoading.value = true
  descData.value = await schoolUserApi.getSchoolUserDescByIdApi(schoolId.value)
  userId.value = Number(descData.value.user_id)
  descLoading.value = false
}

const handleConfirm = () => {
  visible.value = false
}
const handleClose = () => {
  activeTabName.value = 'course'
  userId.value = -1
}
const open = async (title: string, id: number) => {
  dialogTitle.value = title
  schoolId.value = id
  await getInfoData()
  nextTick(async () => {
    visible.value = true
  })
}

defineExpose({ open })
</script>

<template>
  <div class="edit-dialog">
    <DialogBase
      :loading="infoLoading"
      v-model="visible"
      :title="dialogTitle"
      show-btn
      @confirm="handleConfirm"
      @close="handleClose"
    >
      <DescInfo :data="descData"></DescInfo>
      <div class="flex">
        <template v-for="(item, index) in tabOptions" :key="index">
          <div
            class="mx-2 py-2 cursor-pointer mb-4 duration-200"
            :class="{
              'text-blue-500 border-b-1 border-blue-500':
                activeTabName === item.name
            }"
            @click="activeTabName = item.name"
          >
            {{ item.label }}
          </div>
        </template>
      </div>
      <DescPane
        :key="activeTabName"
        :name="activeTabName"
        :user-id="userId"
      ></DescPane>
    </DialogBase>
  </div>
</template>

<style scoped lang="scss"></style>
