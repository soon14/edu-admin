<script setup lang="ts">
const props = defineProps({
  modelValue: {
    type: Boolean,
    default: false
  }
})
const emit = defineEmits<{
  (e: 'update:modelValue', dialogVisible: boolean): void
  (e: 'hide'): void
  (e: 'show'): void
}>()
const dialogVisible = ref(props.modelValue)
watch(dialogVisible, () => {
  emit('update:modelValue', dialogVisible.value)
})
watch(
  () => props.modelValue,
  () => {
    dialogVisible.value = props.modelValue
  }
)
const handleClose = () => {
  emit('hide')
}
const handleConfirm = () => {
  emit('show')
}
</script>

<template>
  <div class="dialog-base">
    <el-dialog
      v-model="dialogVisible"
      append-to-body
      destroy-on-close
      v-bind="$attrs"
    >
      <slot></slot>
      <template #footer>
        <slot name="footer"></slot>
      </template>
    </el-dialog>
  </div>
</template>

<style scoped lang="scss"></style>
<script lang="ts">
export default {
  name: 'DialogBase'
}
</script>
