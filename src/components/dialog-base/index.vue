<script setup lang="ts">
const props = defineProps({
  modelValue: {
    type: Boolean,
    default: false
  },
  showBtn: {
    type: Boolean,
    default: false
  },
  loading: {
    type: Boolean,
    default: false
  }
})
const emit = defineEmits<{
  (e: 'update:modelValue', dialogVisible: boolean): void
  (e: 'close'): void
  (e: 'show'): void
  (e: 'confirm'): void
}>()
const fullScreen = ref(false)
const dialogVisible = ref(props.modelValue)
watch(dialogVisible, () => {
  emit('update:modelValue', dialogVisible.value)
  if (dialogVisible.value) {
    if (window.innerWidth < 1280) {
      fullScreen.value = true
    } else {
      fullScreen.value = false
    }
  }
})
watch(
  () => props.modelValue,
  () => {
    dialogVisible.value = props.modelValue
  }
)
const handleClose = () => {
  emit('close')
  emit('update:modelValue', false)
}
const handleConfirm = () => {
  emit('confirm')
}
</script>

<template>
  <div class="dialog-base">
    <el-dialog
      v-model="dialogVisible"
      append-to-body
      destroy-on-close
      width="70%"
      :fullscreen="fullScreen"
      :close-on-click-modal="false"
      v-bind="$attrs"
      @close="handleClose"
    >
      <el-scrollbar height="60vh">
        <slot></slot>
      </el-scrollbar>
      <template #footer>
        <slot name="footer" v-if="showBtn">
          <el-button type="info" @click="handleClose" :loading="loading"
            >取消</el-button
          >
          <el-button type="primary" @click="handleConfirm" :loading="loading"
            >确定</el-button
          >
        </slot>
      </template>
      <slot name="append"></slot>
    </el-dialog>
  </div>
</template>

<style scoped lang="scss"></style>
<script lang="ts">
export default {
  name: 'DialogBase'
}
</script>
