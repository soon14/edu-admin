import renovationApi from '@/api/module/renovation'
import { INFO_API } from '@/constants/fetch'
import {
  IRenovationUpdateRequest,
  Template
} from '@/api/module/types/renovation'
import menusConfig from '../config/menus'

export const data = ref<IRenovationUpdateRequest>({
  id: null,
  ismobile: 1,
  template: [],
  title: ''
})
// 当前激活
const activeIndex = ref(-1)

export default () => {
  // 当前菜单组件配置
  const menus = menusConfig()
  // 当前所有模板
  const templateCalc = computed(() => data.value.template || [])

  // 当前激活模板
  const currentActiveTemplateCalc = computed(() => {
    if (activeIndex.value !== -1) {
      return templateCalc.value[activeIndex.value]
    }
  })

  // 获取当前模板详情
  async function getInfoData(id: any) {
    data.value = await renovationApi[INFO_API](id)
    console.log(data.value)
  }
  function resetStore(value: any) {
    data.value = {
      id: null,
      ismobile: 1,
      template: [],
      title: ''
    }
    activeIndex.value = -1
  }
  function pushTemplate(template: Template) {
    data.value.template.push(template)
  }
  // 根据索引向上移动模板
  function moveTop(index: number) {
    if (index !== 0) {
      const target = data.value.template.splice(index, 1)[0]
      data.value.template.splice(index - 1, 0, target)
    }
  }
  // 根据索引向下移动模板
  function moveBottom(index: number) {
    if (index < data.value.template.length - 1) {
      const target = data.value.template.splice(index, 1)[0]
      data.value.template.splice(index + 1, 0, target)
    }
  }
  function removeTemplateByIndex(index: number) {
    // data.value.template.splice(index, 1)
  }
  return {
    data,
    menus,
    getInfoData,
    activeIndex,
    currentActiveTemplateCalc,
    templateCalc,
    resetStore,
    pushTemplate,
    moveTop,
    moveBottom,
    removeTemplateByIndex
  }
}
