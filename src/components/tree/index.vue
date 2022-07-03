<script setup lang="ts">
import type Node from 'element-plus/es/components/tree/src/model/node'
import { DropType } from 'element-plus/es/components/tree/src/tree.type'
import { ElTreeType } from '@/types/element-plus'

const treeRef = ref<ElTreeType | null>(null)
const data = ref([
  {
    id: '1',
    label: 'Level one 1',
    children: [
      {
        id: '1-1',
        label: 'Level two 1-1'
      },
      {
        id: '1-2',
        label: 'Level two 1-2'
      },
      {
        id: '1-3',
        label: 'Level two 1-3'
      }
    ]
  },
  {
    id: '2',
    label: 'Level one 2',
    children: [
      {
        id: '2-1',
        label: 'Level two 2-1',
        children: [
          {
            id: '2-1-1',
            name: 'Level three 2-1-1'
          },
          {
            id: '2-1-2',
            name: 'Level three 2-1-1'
          },
          {
            id: '2-1-3',
            name: 'Level three 2-1-1'
          }
        ]
      },
      {
        id: '2-2',
        label: 'Level two 2-2',
        children: [
          {
            id: '2-1-2',
            name: 'Level three 2-2-1'
          }
        ]
      }
    ]
  }
])
const defaultProps = {
  children: 'children',
  label: (data: any) => data.label || data.name
}
const checkedKeys = ref(['1-1', '2-1-2'])

const handleAllowDrop = (
  draggingNode: Node,
  dropNode: Node,
  type: DropType
) => {
  // 父节点相同的兄弟节点才可以拖拽
  if (
    type !== 'inner' &&
    draggingNode.parent.data.label === dropNode.parent.data.label
  ) {
    return true
  }
}
const handleNodeDrop = (
  draggingNode: Node,
  dropNode: Node,
  dropType: DropType,
  ev: any
) => {
  const parentKey = ev.target?.parentNode?.parentNode?.dataset?.key
  if (parentKey) {
    const r = treeRef.value?.getNode(parentKey) as Node
    console.log(r.data.children)
  } else {
    console.log(data.value)
  }
  init()
}
const handleGetKeys = () => {
  // [父级半选中, 当前选中子节点]
  console.log(treeRef.value?.getHalfCheckedKeys())
  console.log(treeRef.value?.getCheckedKeys())
}
// 监听节点选中事件
const handleCheck = (data: any, treeData: any) => {
  checkedKeys.value = treeData.checkedKeys
}
function init() {
  checkedKeys.value.forEach((key) => {
    const node = treeRef.value?.getNode(key)
    if (node && node.isLeaf) {
      node.setChecked(true)
    }
  })
}
onMounted(() => {
  init()
})
</script>

<template>
  <el-card shadow="never" class="md:m-4">
    <el-tree
      ref="treeRef"
      :data="data"
      :props="defaultProps"
      :allow-drop="handleAllowDrop"
      @node-drop="handleNodeDrop"
      @check="handleCheck"
      draggable
      default-expand-all
      node-key="id"
      show-checkbox
    />
    <el-button type="primary" @click="handleGetKeys">获取选中</el-button>
  </el-card>
</template>

<style scoped lang="scss"></style>
