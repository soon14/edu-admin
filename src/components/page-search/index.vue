<script setup lang="ts">
import { ElFormType } from '@/types/element-plus'
import { FormRules } from 'element-plus'
import { PropType } from 'vue'

const props = defineProps({
  model: {
    type: Object,
    default: () => ({})
  },
  rules: {
    type: Object as PropType<FormRules>,
    default: () => ({})
  },
  showSelect: {
    type: Boolean,
    default: false
  },
  showSearch: {
    type: Boolean,
    default: false
  },
  selectOptions: {
    type: Array,
    default: () => []
  },
  loading: {
    type: Boolean,
    default: false
  },
  selectPlaceholder: {
    type: String,
    default: '请选择'
  },
  searchPlaceholder: {
    type: String,
    default: '请搜索'
  }
})
const emit = defineEmits<{
  (e: 'submit', data: any): void
}>()
const formRef = ref<ElFormType | null>(null)

const selected = ref('')
const search = ref('')

const handleSubmit = (e: Event) => {
  if (e && e.preventDefault) {
    e.preventDefault()
  }
  emit('submit', { selected: selected.value, search: search.value })
}
const validate = () => {
  return new Promise((resolve) => {
    formRef.value?.validate((valid) => {
      resolve(valid)
    })
  })
}
defineExpose({ validate })
</script>

<template>
  <div class="page-search">
    <el-form :model="model" :rules="rules" ref="formRef" @submit="handleSubmit">
      <el-row>
        <el-col :span="24" :md="12">
          <slot name="left"></slot>
        </el-col>
        <el-col :span="24" :md="12">
          <div class="flex lg:justify-end mt-2 lg:mt-0">
            <slot name="right"></slot>
            <el-select
              class="w-94px"
              v-model="selected"
              :placeholder="selectPlaceholder"
              v-if="showSelect"
            >
              <el-option
                v-for="item in (selectOptions as any)"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              >
              </el-option>
            </el-select>
            <el-input
              v-if="showSearch"
              class="w-150px md:w-240px mx-2"
              v-model="search"
              type="text"
              clearable
              :placeholder="searchPlaceholder"
            ></el-input>
            <el-button
              type="primary"
              v-if="showSearch"
              plain
              :loading="loading"
              native-type="submit"
              >搜索</el-button
            >
            <slot
              name="right_append"
              :selected="selected"
              :search="search"
            ></slot>
          </div>
        </el-col>
      </el-row>
    </el-form>
  </div>
</template>

<style scoped lang="scss">
.page-search {
  @apply mb-4;
}
</style>
<script lang="ts">
export default {
  name: 'PageSearch'
}
</script>
