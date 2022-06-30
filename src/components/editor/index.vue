<!--
  使用包:
  npm i @wangeditor/editor @wangeditor/editor-for-vue@next
  文档: https://www.wangeditor.com/v5/installation.html#npm
 -->
<script setup lang="ts">
import '@wangeditor/editor/dist/css/style.css' // 引入 css
import { onBeforeUnmount, ref, shallowRef, onMounted } from 'vue'
import { Editor, Toolbar } from '@wangeditor/editor-for-vue'
import { IEditorConfig } from '@wangeditor/core'
type InsertFnType = (url: string, alt: string, href: string) => void

// 编辑器实例，必须用 shallowRef
const editorRef = shallowRef()

// 内容 HTML
const valueHtml = ref('<p>hello</p>')

// 模拟 ajax 异步获取内容
onMounted(() => {
  setTimeout(() => {
    valueHtml.value = '<p>模拟 Ajax 异步设置内容</p>'
  }, 1500)
})

const toolbarConfig = {}
const editorConfig: Partial<IEditorConfig> = {
  placeholder: '请输入内容...',
  MENU_CONF: {
    uploadImage: {
      // 自定义插入图片
      customUpload(file: File, insertFn: InsertFnType) {
        const formData = new FormData()
        formData.append('file', file)
        fetch('http://127.0.0.1:8888/api/upload', {
          method: 'POST',
          body: formData
        })
          .then((res) => {
            return res.json()
          })
          .then((res) => {
            insertFn(`http://127.0.0.1:8888/${res.data}`, '', '')
          })
      }
    }
  }
}

const mode = 'default'
// 组件销毁时，也及时销毁编辑器
onBeforeUnmount(() => {
  const editor = editorRef.value
  if (editor == null) return
  editor.destroy()
})

const handleCreated = (editor: string) => {
  editorRef.value = editor // 记录 editor 实例，重要！
}
</script>

<template>
  <div class="">
    <div style="border: 1px solid #ccc">
      <Toolbar
        style="border-bottom: 1px solid #ccc"
        :editor="editorRef"
        :default-config="toolbarConfig"
        :mode="mode"
      />
      <Editor
        style="height: 500px; overflow-y: hidden"
        v-model="valueHtml"
        :default-config="editorConfig"
        :mode="mode"
        @onCreated="handleCreated"
      />
    </div>
  </div>
</template>

<style scoped lang="scss"></style>
<script lang="ts">
export default {
  name: 'Editor'
}
</script>
