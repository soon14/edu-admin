<script setup lang="ts">
import CHeader from './header/index.vue'
import Aside from './aside'
import MainHeader from './main-header/index.vue'
import { useSystem } from '@/store/system'
const systemStore = useSystem()
const collapse = computed(() => systemStore.collapse)
</script>

<template>
  <div class="layout">
    <el-container class="c-bg-base">
      <el-header class="layout-header el-card c-border">
        <!-- 头部logo 头像, 全屏, 消息 等组件 -->
        <CHeader></CHeader>
      </el-header>
      <el-container>
        <el-aside
          class="layout-left el-card c-border block absolute z-10 md:static"
          :class="[collapse ? 'is-phone-hide' : 'is-phone-show']"
          :width="collapse ? 'auto' : '200px'"
        >
          <el-scrollbar>
            <!--侧导航 -->
            <Aside></Aside>
            <Teleport to="body">
              <div
                @click="systemStore.changeCollapse()"
                v-show="!systemStore.collapse"
                class="mask left-[-1px] right-0 top-[59px] bottom-0 bg-black opacity-50 absolute block md:hidden duration-200"
              ></div>
              <!-- <transition name="el-fade-in-linear">
              </transition> -->
            </Teleport>
          </el-scrollbar>
        </el-aside>
        <el-main class="layout-right c-bg-base p-0">
          <!--面包屑 和 记忆模块 -->
          <el-header class="layout-right-header el-card c-border p-0">
            <MainHeader />
          </el-header>
          <!-- router view -->
          <el-card class="layout-right-content m-4" shadow="never">
            <router-view></router-view>
          </el-card>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<style scoped lang="scss">
.layout {
  @apply h-screen w-screen;
  .layout-header {
    @apply border-l-0 border-r-0 border-t-0 rounded-none;
  }
  .layout-left {
    @apply border-l-0 border-t-0 border-b-0 rounded-none;
    height: calc(100vh - 60px);
    transition: background 0.1s;
    &.is-phone-hide {
      @apply -left-16;
    }
    &.is-phone-show {
      @apply left-0;
    }
  }
  .layout-right {
    height: calc(100vh - 60px);
    .layout-right-header {
      @apply border-t-0 border-l-0 border-r-0 h-[78px] rounded-none;
    }
    .layout-right-content {
    }
  }
}
</style>
