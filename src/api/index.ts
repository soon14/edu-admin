import { ApiModuleType, IApis } from './types'

export const apis: Partial<IApis> = {}

export function setupFetchApi() {
  const modules = import.meta.globEager('./module/*.ts')
  Object.entries(modules).forEach(([file, module]) => {
    const moduleName = file.split('/').pop()?.replace('.ts', '')
    if (moduleName) {
      apis[moduleName] = { ...module } as ApiModuleType
    }
  })
}
const s = 'user'
// const b = 'loginApi'
apis[s]?.CREATE_API()
