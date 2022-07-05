import mediaApi from '@/api/module/media'
import {
  CREATE_API,
  DELETE_API,
  LIST_API,
  UPDATE_API,
  UPDATE_STATE_API
} from '@/constants/fetch'

export default ({ queryParams }: { queryParams?: any }) => {
  const loading = ref(false)
  const total = ref(0)
  const list = ref<any>([])

  const getListData = async () => {
    loading.value = true
    try {
      const fetchApi = mediaApi[LIST_API]
      const data = await fetchApi({ ...queryParams.value })
      data.items.forEach((it, index) => {
        it.custom_index =
          index + queryParams.value.limit * (queryParams.value.page - 1) + 1
      })
      list.value = data.items
      total.value = data.total
    } finally {
      loading.value = false
    }
  }
  const deleteData = (row: any) => {
    const title = `是否删除标题为 ${row.title} 的图文吗?`
    ElMessageBox.confirm(title, '提示', {
      type: 'warning',
      confirmButtonText: '确定',
      cancelButtonText: '取消'
    }).then(async () => {
      loading.value = true
      try {
        const fetchApi = mediaApi[DELETE_API]
        await fetchApi({ ids: [row.id] })
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
    const fetchApi = mediaApi[CREATE_API]
    await fetchApi(row)
  }
  const updateData = async (row: any) => {
    const fetchApi = mediaApi[UPDATE_API]
    await fetchApi(row)
  }
  const updateStateData = async (row: any, msg: [string, string]) => {
    row.editLoading = true
    try {
      await mediaApi[UPDATE_STATE_API]({
        id: row.id,
        status: row.status === 1 ? 0 : 1
      })
      ElMessage({
        type: row.status ? 'warning' : 'success',
        message: row.status ? msg[1] : msg[0]
      })
    } catch (err) {
    } finally {
      row.editLoading = false
    }
    await getListData()
  }
  return {
    loading,
    total,
    list,
    getListData,
    deleteData,
    createData,
    updateData,
    updateStateData
  }
}
