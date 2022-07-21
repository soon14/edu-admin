<script setup lang="ts">
import { CountTo } from 'vue3-count-to'
import { formatDate } from '@/utils/date'
import { $api } from '@/api/index'
import { LIST_API } from '@/constants/fetch'
import { getImg, getTitle } from '@/api/utils/data'
import axios from 'axios'
import Skeleton from './components/skeleton.vue'
const cards = ref([
  { title: '今日收入', value: 1888, icon: 'fas fa-coins' },
  { title: '今日付费用户', value: 9999, icon: 'fas fa-user' },
  { title: '总付费用户', value: 299, icon: 'fas fa-wallet' },
  { title: '可提现(元)', value: 12000, icon: 'fas fa-credit-card' }
])
// 运营小助手
const operationMenus = ref([
  {
    title: '拼团',
    sub: '多人拼团享受优惠',
    name: 'Group',
    icon: 'fas fa-users'
  },
  {
    title: '秒杀',
    sub: '限时秒杀享低价',
    name: 'Flashsale',
    icon: 'fas fa-clock'
  },
  {
    title: '优惠券',
    sub: '有偿激励课程推广',
    name: 'Coupon',
    icon: 'fas fa-money-bill-1-wave'
  },
  {
    title: '限时折扣',
    sub: '限时限量打折降价',
    name: 'Flashsale',
    icon: 'fas fa-coins'
  }
])
// 常见功能
const commonMenus = ref([
  { title: '图文', sub: '图文课程', name: 'Media', icon: 'fas fa-book' },
  { title: '音频', sub: '音频课程', name: 'Audio', icon: 'fas fa-headphones' },
  { title: '视频', sub: '视频课程', name: 'Video', icon: 'fas fa-video' },
  { title: '专栏', sub: '专栏', name: 'Column', icon: 'fas fa-graduation-cap' }
])
// 获取课程
const audioList = ref([])
const getAudioListData = async () => {
  const data = await $api.audio![LIST_API]!()
  data.items.forEach((item: any) => {
    item.title = getTitle()
    item.cover = getImg()
  })
  audioList.value = data.items
}
// 获取订单
const orderList = ref([])
const getOrderListData = async () => {
  const data = await $api.order![LIST_API]!()
  data.items.forEach((item: any) => (item.title = getTitle()))
  orderList.value = data.items
}

const first = ref(true)
const getAllData = () => {
  const fetchList = [getAudioListData(), getOrderListData()]
  axios.all(fetchList).then((_) => {
    first.value = false
  })
}
getAllData()
</script>

<template>
  <div class="md:m-4 flashale" shadow="never">
    <template v-if="first">
      <Skeleton></Skeleton>
    </template>
    <template v-else>
      <el-row :gutter="18">
        <template v-for="(item, index) in cards" :key="index">
          <el-col :span="12" :md="6" class="mt-4 md:mt-0">
            <el-card shadow="never">
              <div class="flex items-center justify-start">
                <i class="text-42px" :class="item.icon"></i>
                <div class="flex flex-col ml-4">
                  <div class="text-12px">{{ item.title }}</div>
                  <count-to
                    class="mt-2"
                    :start-val="0"
                    :end-val="(item.value as any)"
                    :duration="600"
                  ></count-to>
                </div>
              </div>
            </el-card>
          </el-col>
        </template>
      </el-row>
      <el-row :gutter="18" class="mt-4">
        <el-col :span="24" :md="12">
          <el-card shadow="never" header="运营小助手">
            <el-row>
              <template v-for="(item, index) in operationMenus" :key="index">
                <el-col
                  :span="12"
                  class="flex items-center justify-start my-5 select-none cursor-pointer"
                  @click="$router.push({ name: item.name })"
                >
                  <div class="w-12 flex items-center justify-center">
                    <i class="text-4xl" :class="item.icon"></i>
                  </div>
                  <div class="flex flex-col ml-4">
                    <div class="text-base">{{ item.title }}</div>
                    <div class="text-12px mt-2 opacity-50">
                      {{ item.sub }}
                    </div>
                  </div>
                </el-col>
              </template>
            </el-row>
          </el-card>
        </el-col>
        <el-col :span="24" :md="12" class="mt-4 lg:mt-0">
          <el-card shadow="never" header="常见功能">
            <el-row>
              <template v-for="(item, index) in commonMenus" :key="index">
                <el-col
                  :span="12"
                  class="flex items-center justify-start my-5 select-none cursor-pointer"
                  @click="$router.push({ name: item.name })"
                >
                  <div class="w-12 flex items-center justify-center">
                    <i class="text-4xl" :class="item.icon"></i>
                  </div>
                  <div class="flex flex-col ml-4">
                    <div class="text-base">{{ item.title }}</div>
                    <div class="text-12px mt-2 opacity-50">
                      {{ item.sub }}
                    </div>
                  </div>
                </el-col>
              </template>
            </el-row>
          </el-card>
        </el-col>
      </el-row>
      <!--  -->

      <el-row :gutter="18" class="mt-4">
        <el-col :span="24" :md="12">
          <el-card shadow="never" body-style="padding: 0">
            <template #header>
              <div class="card-header flex justify-between">
                <span>最新课程</span>
                <span
                  class="text-sm text-primary cursor-pointer select-none"
                  @click="$router.push({ name: 'Media' })"
                  >更多</span
                >
              </div>
            </template>
            <el-table :data="audioList">
              <el-table-column label="内容">
                <template #default="{ row }">
                  <div class="flex">
                    <el-image
                      lazy
                      :src="row.cover"
                      fit="cover"
                      class="w-12 h-12 mr-4"
                    ></el-image>
                    <div>
                      <div v-html="row.title" class="line-clamp-1"></div>
                      <div class="mt-2 text-sm text-red-500">
                        &yen;{{ row.price }}
                      </div>
                    </div>
                  </div>
                </template>
              </el-table-column>
              <el-table-column label="创建时间" align="center" width="200">
                <template #default="{ row }">
                  {{ formatDate(row.created_time) }}
                </template>
              </el-table-column>
            </el-table>
          </el-card>
        </el-col>
        <el-col :span="24" :md="12" class="mt-4 lg:mt-0">
          <el-card shadow="never" body-style="padding: 0">
            <template #header>
              <div class="card-header flex justify-between">
                <span>最新订单</span>
                <span
                  class="text-sm text-primary select-none cursor-pointer"
                  @click="$router.push({ name: 'Order' })"
                  >更多</span
                >
              </div>
            </template>
            <el-table :data="orderList">
              <el-table-column label="商品名称" width="400">
                <template #default="{ row }">
                  <div class="h-51px flex items-center line-clamp-1">
                    {{ row.title }}
                  </div>
                </template>
              </el-table-column>
              <el-table-column label="订单类型" align="center">
                <template #default="{ row }">
                  <el-tag type="" v-if="row.type === 'default'">普通</el-tag>
                  <el-tag type="danger" v-else>拼团</el-tag>
                </template>
              </el-table-column>
              <el-table-column label="订单状态" align="center">
                <template #default="{ row }">
                  <el-tag type="info" v-if="row.status === 'closed'"
                    >关闭</el-tag
                  >
                  <el-tag type="success" v-else>成功</el-tag>
                </template>
              </el-table-column>
              <el-table-column label="创建时间" align="center" width="200">
                <template #default="{ row }">
                  {{ formatDate(row.created_time) }}
                </template>
              </el-table-column>
            </el-table>
          </el-card>
        </el-col>
      </el-row>
    </template>
  </div>
</template>

<style scoped lang="scss"></style>
