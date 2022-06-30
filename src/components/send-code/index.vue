<script setup lang="ts">
const props = defineProps({
  time: {
    type: Number,
    default: 60
  }
})
const emit = defineEmits<{
  (e: 'send'): void
}>()
const currentTime = ref(props.time)
let timer: any = null
let isLock = false

const msgCalc = computed(() => {
  if (currentTime.value <= 0 || currentTime.value === props.time) {
    return '获取验证码'
  }
  return currentTime.value + 's'
})

const send = () => {
  if (isLock) return
  isLock = true
  currentTime.value--
  timer = setInterval(() => {
    currentTime.value--
    if (currentTime.value === 0) {
      currentTime.value = props.time
      clearInterval(timer)
      isLock = false
      emit('send')
    }
  }, 1000)
}

defineExpose({ send })
</script>

<template>
  <div class="send-code">
    <el-button type="" :disabled="isLock">{{ msgCalc }}</el-button>
  </div>
</template>

<style scoped lang="scss">
.send-code {
  .el-button {
    @apply w-28;
  }
}
</style>
<script lang="ts">
export default {
  name: 'SendCode'
}
</script>
