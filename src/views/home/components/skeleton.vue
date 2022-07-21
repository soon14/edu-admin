<script setup lang="ts"></script>

<template>
  <div>
    <el-row :gutter="18">
      <template v-for="(item, index) in 4" :key="index">
        <el-col :span="12" :md="6">
          <el-card shadow="never">
            <div class="flex items-center justify-start">
              <el-skeleton animated :rows="1" style=""></el-skeleton>
            </div>
          </el-card>
        </el-col>
      </template>
    </el-row>
    <el-row :gutter="18" class="mt-4">
      <el-col :span="24" :md="12">
        <el-card shadow="never" header="运营小助手">
          <el-row>
            <template v-for="(item, index) in 4" :key="index">
              <el-col :span="12" class="flex items-center justify-start">
                <el-skeleton
                  animated
                  :rows="1"
                  style="margin-top: 1rem; width: 150px"
                ></el-skeleton>
              </el-col>
            </template>
          </el-row>
        </el-card>
      </el-col>
      <el-col :span="24" :md="12" class="mt-4 lg:mt-0">
        <el-card shadow="never" header="常见功能">
          <el-row>
            <template v-for="(item, index) in 4" :key="index">
              <el-col :span="12" class="flex items-center justify-start">
                <el-skeleton
                  animated
                  :rows="1"
                  style="margin-top: 1rem; width: 150px"
                ></el-skeleton>
              </el-col>
            </template>
          </el-row>
        </el-card>
      </el-col>
    </el-row>
    <!--  -->
    <el-row :gutter="18" class="mt-4">
      <el-col :span="24" :md="12">
        <el-card shadow="never" header="最新课程">
          <el-skeleton
            animated
            :rows="4"
            style="margin-top: 1rem"
          ></el-skeleton>
        </el-card>
      </el-col>
      <el-col :span="24" :md="12" class="mt-4 lg:mt-0">
        <el-card shadow="never" header="最新订单">
          <el-skeleton
            animated
            :rows="4"
            style="margin-top: 1rem"
          ></el-skeleton>
        </el-card>
      </el-col>
    </el-row>
    <!--  -->
  </div>
</template>

<style scoped lang="scss"></style>
<script lang="ts">
export default {
  name: 'Draggable'
}
</script>
