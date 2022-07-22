import { $api } from '@/api'
import {
  CREATE_API,
  DELETE_API,
  INFO_API,
  LIST_API,
  UPDATE_API,
  UPDATE_STATE_API
} from '@/constants/fetch'

export default <T = any>({
  queryParams,
  module
}: {
  queryParams?: any
  module: string
}) => {
  const loading = ref(false)
  const total = ref(0)
  const list = ref<T[]>([])

  const getListData = async () => {
    loading.value = true
    try {
      const fetchApi = ($api[module] as any)[LIST_API]
      const data = await fetchApi({ ...queryParams.value })
      data.items.forEach((it: Record<string, any>, index: number) => {
        it.custom_index =
          index + queryParams.value.limit * (queryParams.value.page - 1) + 1
      })
      list.value = data.items
      total.value = data.total
    } finally {
      loading.value = false
    }
  }
  const getInfoData = async (id: number) => {
    const fetchApi = ($api[module] as any)[INFO_API]
    return await fetchApi(id)
  }
  const deleteData = (
    row: any,
    title: string,
    otherParams?: Record<string, any>
  ) => {
    ElMessageBox.confirm(title, '提示', {
      type: 'warning',
      confirmButtonText: '确定',
      cancelButtonText: '取消'
    }).then(async () => {
      loading.value = true
      try {
        const fetchApi = ($api[module] as any)[DELETE_API]
        let params: any = {}
        if (otherParams) {
          params = { ...otherParams }
        }
        params.ids = [row.id]
        await fetchApi(params)
        ElMessage({
          type: 'success',
          message: '删除成功',
          duration: 1500
        })
      } finally {
        loading.value = false
      }
      await getListData()
    })
  }
  const createData = async (row: any) => {
    const fetchApi = ($api[module] as any)[CREATE_API]
    await fetchApi(row)
  }
  const updateData = async (row: any) => {
    const fetchApi = ($api[module] as any)[UPDATE_API]
    await fetchApi(row)
  }
  // editLoading 会增加 editLoading 状态字段
  // msg: ['已下架', '上架成功']
  const updateStateData = async (row: any, msg: [string, string]) => {
    row.stateLoading = true
    try {
      await ($api[module] as any)[UPDATE_STATE_API]({
        id: row.id,
        status: row.status
      })
      setTimeout(() => {
        ElMessage({
          type: row.status ? 'success' : 'warning',
          message: row.status ? msg[1] : msg[0]
        })
      }, 500)
    } catch (err) {
    } finally {
      row.stateLoading = false
    }
    await getListData()
  }
  const searchData = () => {
    queryParams.value.page = 1
    getListData()
  }
  return {
    loading,
    total,
    list,
    getListData,
    getInfoData,
    deleteData,
    createData,
    updateData,
    updateStateData,
    searchData
  }
}
