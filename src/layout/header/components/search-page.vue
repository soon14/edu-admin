<script setup lang="ts">
import { useAuthStore } from '@/store/auth'
import { RouteRecordRaw } from 'vue-router'
import { ElInputType } from '@/types/element-plus'
import deepCopy from 'lodash/cloneDeep'

const dialogVisible = ref(false)
const searchWord = ref('')
const list = ref<RouteRecordRaw[][]>([])
const authStore = useAuthStore()
const inputRef = ref<ElInputType | null>(null)
const handleOpen = () => {
  searchWord.value = ''
  dialogVisible.value = true
  nextTick(() => {
    inputRef?.value?.input?.focus()
  })
}
const handleToPage = (routePath: string) => {
  router.push(routePath)
  dialogVisible.value = false
}
const router = useRouter()
const routes = router.getRoutes()
const menus = authStore.menus

watch(searchWord, () => {
  const word = searchWord.value.trim()
  if (word) {
    // [ {},{} ] =>  [ [{},{}], [{},{}] ]
    const currents = getRouteByWord(word, deepCopy(routes))
    list.value = getParentAndCurrent(currents, deepCopy(menus))
  } else {
    list.value = []
  }
})
function getRouteByWord(word: string, menus: RouteRecordRaw[]) {
  const result: RouteRecordRaw[] = []
  const deep = (word: string, menuItem: RouteRecordRaw) => {
    const titleFlag = menuItem.meta?.title?.includes(word)
    let nameFlag = false
    if (menuItem.name) {
      nameFlag = (menuItem.name as string)
        .toLowerCase()
        .includes(word.toLowerCase())
    }
    if (nameFlag || titleFlag) {
      result.push(menuItem)
    }
    if (menuItem.children && menuItem.children.length) {
      menuItem.children.forEach((it) => {
        deep(word, it)
      })
    }
  }
  menus.forEach((menu) => {
    deep(word, menu)
  })
  return result.filter((it) => !it?.meta?.hidden && !it?.meta?.hiddenHistory)
}
// [ {},{} ] =>  [ [{},{}], [{},{}] ]
function getParentAndCurrent(
  currentResults: RouteRecordRaw[],
  menus: RouteRecordRaw[]
) {
  const result: RouteRecordRaw[][] = []
  currentResults.forEach((current, index) => {
    if (current.name === 'layout') return
    result[index] = []
    result[index].push(current)
    menus.forEach((menu) => {
      if (menu.children && menu.children.length) {
        const target = menu.children.find(
          (it: RouteRecordRaw) => it.name === current.name
        )
        if (target) {
          result[index].unshift({ ...menu })
        }
      }
    })
  })
  return result
}
function getTitleStr(menuList: RouteRecordRaw[]) {
  return menuList
    .map((it) => it.meta?.title)
    .join(' - ')
    .trim()
}
</script>

<template>
  <div class="search-page">
    <i class="fab fa-searchengin cursor-pointer" @click="handleOpen"></i>
    <dialog-base
      v-model="dialogVisible"
      title="搜索"
      custom-class="c-bg-base w-[90%] md:w-[40%]"
    >
      <el-input
        v-model="searchWord"
        placeholder="搜索"
        size="large"
        clearable
        ref="inputRef"
      >
        <template #prefix>
          <i class="fas fa-magnifying-glass"></i>
        </template>
      </el-input>
      <el-scrollbar class="mt-2 duration-200" max-height="40vh">
        <template v-for="item in list" :key="item[0].name">
          <div
            @click="handleToPage(item[item.length - 1].path)"
            shadow="never"
            class="el-card my-2 !h-14 p-0 flex items-center px-4 cursor-pointer hover:text-blue-500"
          >
            <span>
              {{ getTitleStr(item) }}
            </span>
          </div>
        </template>
      </el-scrollbar>
    </dialog-base>
  </div>
</template>

<style scoped lang="scss"></style>
<script lang="ts">
export default {
  name: 'SearchPage'
}
</script>
