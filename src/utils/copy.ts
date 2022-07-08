import { ElMessage } from 'element-plus'

export const useCopy = (text: string) => {
  const input = document.createElement('input')
  input.value = text
  document.body.appendChild(input)
  input.select()
  document.execCommand('copy')
  document.body.removeChild(input)
  ElMessage({
    type: 'success',
    message: '已复制',
    duration: 1500
  })
  return text
}
