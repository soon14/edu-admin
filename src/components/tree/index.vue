<script setup lang="ts">
import type Node from 'element-plus/es/components/tree/src/model/node'
import { DropType } from 'element-plus/es/components/tree/src/tree.type'
import { ElTreeType } from '@/types/element-plus'
import { PropType } from 'vue'
const props = defineProps({
  data: {
    type: Array,
    default: () => []
  },
  checkedKeys: {
    type: Array as PropType<(string | number)[]>,
    default: () => []
  },
  defaultProps: {
    type: Object,
    default: () => ({})
  }
})

const emit = defineEmits<{
  (e: 'update:modelValue', keys: string[]): void
}>()

const treeRef = ref<ElTreeType | null>(null)

// const defaultProps = {
//   children: 'children',
//   label: (data: any) => data.label || data.name
// }
// const checkedKeys = ref(['1-1', '2-1-2'])

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

const handleGetKeys = () => {
  // [父级半选中, 当前选中子节点]
  return {
    half: treeRef.value?.getHalfCheckedKeys(),
    keys: treeRef.value?.getCheckedKeys()
  }
}
// 监听节点选中事件
const handleCheck = (data: any, treeData: any) => {
  emit('update:modelValue', treeData.checkedKeys)
}
function init() {
  props.checkedKeys.forEach((key) => {
    const node = treeRef.value?.getNode(key)
    if (node && node.isLeaf) {
      node.setChecked(true)
    }
  })
}
defineExpose({
  getKeys: handleGetKeys
})
watch(
  () => props.data,
  () => {
    nextTick(() => {
      init()
    })
  },
  { immediate: true }
)
</script>

<template>
  <el-tree
    ref="treeRef"
    :data="data"
    :props="defaultProps"
    :allow-drop="handleAllowDrop"
    @check="handleCheck"
    draggable
    node-key="id"
    show-checkbox
  />
</template>

<style scoped lang="scss"></style>
