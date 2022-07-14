<script setup lang="ts">
const props = defineProps({
  modelValue: {
    type: String,
    default: ''
  }
})
const emit = defineEmits<{
  (e: 'update:modelValue', id: string): void
}>()

const currentValue = computed({
  get() {
    return props.modelValue
  },
  set(val) {
    emit('update:modelValue', val)
  }
})

const showEditor = ref(false)

const handleOutSide = () => {
  showEditor.value = false
}
</script>

<template>
  <div class="answer-editor">
    <div
      v-if="!showEditor"
      class="min-h-6 c-border border-dashed cursor-text pl-1"
      v-html="currentValue"
      @click="showEditor = true"
    ></div>
    <template v-else>
      <Editor
        v-model="currentValue"
        :height="300"
        v-click-outside="handleOutSide"
      ></Editor>
      <el-button class="mt-2" type="success" @click="showEditor = false"
        >完成</el-button
      >
    </template>
  </div>
</template>

<style scoped lang="scss"></style>
<script lang="ts">
export default {
  name: 'AnswerEditor'
}
</script>
