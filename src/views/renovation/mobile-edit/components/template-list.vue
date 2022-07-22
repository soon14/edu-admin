<script setup lang="ts">
import useRenovation from '../hooks/useRenovation'
const { currentActiveTemplateCalc } = useRenovation()
const type = computed(() => currentActiveTemplateCalc.value?.type)
const props = defineProps({
  data: {
    type: Object,
    default: () => ({})
  },
  index: {
    type: Number,
    default: 0
  }
})
</script>

<template>
  <div class="template-list">
    <div class="header">
      <div>{{ data.title }}</div>
      <div v-if="data.showMore" class="opacity-60 text-sm">查看全部</div>
    </div>
    <div class="list-box" :class="{ one: data.listType === 'one' }">
      <template v-for="(item, index) in data.data" :key="index">
        <div class="item el-card">
          <div class="img-box">
            <img :src="item.cover" alt="" />
          </div>
          <div class="desc">
            <div class="title">{{ item.title }}</div>
            <div class="price">
              <span class="red">&yen; {{ item.price }}</span>
              <span class="del">&yen; {{ item.t_price }}</span>
            </div>
          </div>
        </div>
      </template>
    </div>
  </div>
</template>

<style scoped lang="scss">
.template-list {
  @apply cursor-pointer mb-2;
  .header {
    @apply flex justify-between select-none m-4 mb-0;
  }
  .list-box {
    .item {
      @apply flex h-30 m-4;
      .img-box {
        @apply object-cover w-30 overflow-hidden mr-2;
        img {
          @apply w-full;
        }
      }
      .desc {
        @apply flex flex-col  h-30 justify-between;
        .title {
          @apply mt-1;
        }
        .price {
          @apply mb-1;
          .red {
            @apply text-red-600 mr-1;
          }
          .del {
            @apply text-sm opacity-60;
            text-decoration: line-through;
          }
        }
      }
    }
    &.one {
      @apply flex flex-wrap;
      .item {
        @apply flex-col m-0 mt-21px ml-21px h-66;
        width: 43%;
        .img-box {
          @apply mr-0 w-full;
        }
        .desc {
          @apply h-10 pl-2 box-border p-2;
          .title {
            // @apply mt-2;
          }
          .price {
            // @apply mt-2;
          }
        }
      }
    }
  }
}
</style>
<script lang="ts">
export default {
  name: 'CanvasList'
}
</script>
