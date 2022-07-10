<script setup lang="ts">
import { cloneDeep } from '@/utils/lodash'
import CCanvas from './components/canvas.vue'
import CEditor from './components/editor.vue'
import useRenovation from './hooks/useRenovation'
const route = useRoute()
const id = computed(() => route.params.id)
const { menus, getInfoData, templateCalc, pushTemplate } = useRenovation()
const handleItemClick = (item: any) => {
  pushTemplate(cloneDeep(item))
}

getInfoData(id.value)
</script>

<template>
  <div class="wrap flex absolute left-0 top-0 right-0 bottom-0 justify-between">
    <div class="w-320px mx-10 mt-10">
      <el-card body-style="padding:1rem;">
        <el-scrollbar height="71vh">
          <div class="select-none">组件列表</div>
          <div class="opacity-60 text-12px mt-2 mb-4 select-none">
            点击组件，添加至页面
          </div>
          <!-- 左侧菜单 -->
          <div class="flex flex-wrap justify-between">
            <template v-for="(item, index) in menus" :key="index">
              <div
                @click="handleItemClick(item)"
                class="menu-item c-border p-2 w-134px mb-3 flex items-center cursor-pointer select-none text-sm duration-300"
              >
                <div class="w-30px text-center">
                  <i :class="item?.icon"></i>
                </div>
                <span>{{ item?.title }}</span>
              </div>
            </template>
          </div>
          <!--  -->
        </el-scrollbar>
      </el-card>
    </div>
    <div class="w-460px mt-10 relative">
      <div class="p-0 absolute left-0 right-0">
        <el-card body-style="padding:0">
          <el-scrollbar height="74vh">
            <!-- 中间画布 -->
            <template v-for="(template, index) in templateCalc" :key="index">
              <CCanvas :template-data="template" :index="index"></CCanvas>
            </template>
            <!--  -->
          </el-scrollbar>
        </el-card>
      </div>
    </div>
    <div class="w-520px mx-10 mt-10">
      <el-card body-style="padding:0">
        <div class="flex justify-between p-4">
          <div class="">组件编辑</div>
          <el-button type="primary">保存</el-button>
        </div>
        <el-scrollbar height="74vh">
          <!-- 右侧编辑 -->
          <CEditor></CEditor>
          <!--  -->
        </el-scrollbar>
      </el-card>
    </div>
  </div>
</template>

<style scoped lang="scss">
.wrap {
  height: calc(100vh - 40px - 36px - 59px);
  min-width: 1500px;
}
.menu-item:hover {
  border-color: var(--el-color-primary);
  color: var(--el-color-primary);
}
</style>
