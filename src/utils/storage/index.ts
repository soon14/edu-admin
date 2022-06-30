import { STORAGE_NAMESPACE } from '@/constants/storage'
import { IStorage } from './storage.type'

class Storage implements IStorage {
  namespace: string = ''
  constructor(namespace: string) {
    this.namespace = namespace
  }

  get<T = any>(key: string): T | null {
    try {
      const result = JSON.parse(
        localStorage.getItem(this.namespace + key) || 'null'
      )
      if (result.expired !== 0 && result.expired <= Date.now()) {
        this.remove(this.namespace + key)
        return null
      }
      return result.value
    } catch (error) {
      return null
    }
  }

  set(key: string, value: any = null, expired: number = 0) {
    const tempObj = { expired, value }
    if (expired !== 0) {
      tempObj.expired = Date.now() + expired * 1000 // 秒
    }
    tempObj.value = value
    localStorage.setItem(this.namespace + key, JSON.stringify(tempObj))
  }

  remove(key: string) {
    localStorage.removeItem(this.namespace + key)
  }

  clear() {
    localStorage.clear()
  }
}

export const storage = new Storage(STORAGE_NAMESPACE)
