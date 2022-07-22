<script setup lang="ts">
import type { InsertFnType } from './types/editor'
import '@wangeditor/editor/dist/css/style.css'
import {
  createEditor,
  createToolbar,
  IEditorConfig,
  IDomEditor,
  IToolbarConfig,
  Toolbar
} from '@wangeditor/editor'

const props = defineProps({
  modelValue: {
    type: String,
    default: ''
  },
  height: {
    type: Number,
    default: 400
  }
})
const emit = defineEmits<{
  (e: 'update:modelValue', value: string): void
}>()
let editor: IDomEditor, toolbar: Toolbar

// 编辑器配置
const editorConfig: Partial<IEditorConfig> = {
  MENU_CONF: {
    uploadImage: {
      // 自定义上传
      async customUpload(file: File, insertFn: InsertFnType) {
        // file 即选中的文件
        // 自己实现上传，并得到图片 url alt href
        // 最后插入图片
        // insertFn(url, alt, href)
        insertFn(
          'https://images.unsplash.com/photo-1599420186946-7b6fb4e297f0?ixlib=rb-1.2.1&ixid=MnwxMjA3fDF8MHxlZGl0b3JpYWwtZmVlZHwxfHx8ZW58MHx8fHw%3D&auto=format&fit=crop&w=800&q=60',
          '',
          ''
        )
      }
    }
  }
}
editorConfig.placeholder = '请输入内容'
editorConfig.onChange = (editor: IDomEditor) => {
  // 当编辑器选区、内容变化时，即触发
  // console.log('content', editor.children)
  // console.log('html', editor.getHtml())
  emit('update:modelValue', editor.getHtml())
}
const editorRef = ref<any>(null)
const toolbarRef = ref<any>(null)
const init = () => {
  // 工具栏配置
  const toolbarConfig: Partial<IToolbarConfig> = {}
  // 创建编辑器
  editor = createEditor({
    selector: editorRef.value,
    config: editorConfig,
    mode: 'default', // 或 'simple'
    html: props.modelValue
  })
  // 创建工具栏
  toolbar = createToolbar({
    editor,
    selector: toolbarRef.value,
    config: toolbarConfig,
    mode: 'default' // 或 'simple'
  })
}
onMounted(() => {
  init()
  setTimeout(() => {
    editor.setHtml(props.modelValue)
  }, 0)
})
onBeforeUnmount(() => {
  editor && editor.destroy()
  toolbar && toolbar.destroy()
})
</script>

<template>
  <div>
    <div id="toolbar-container" ref="toolbarRef"></div>
    <div
      id="editor-container"
      ref="editorRef"
      :style="{ height: height + 'px' }"
    ></div>
  </div>
</template>

<style scoped lang="scss"></style>
