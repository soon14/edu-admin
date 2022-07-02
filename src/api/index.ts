import { ApiModuleType, IApis } from './types'

export const $api: Partial<IApis> = {}

/**
 * 作用: 收集所有module文件夹下的api;
 * 注意: 该收集是用于抽取封装hook逻辑的, 比如增删改查, 不要用在定制的场景中,
 *      定制的场景直接去对应的api文件里引入, ts类型很完美
 * export , export default 两种方式都支持 (建议export default, 可以使用枚举给请求方法命名);
 */
export function setupFetchApi() {
  const modules = import.meta.globEager('./module/*.ts')
  Object.entries(modules).forEach(([file, module]) => {
    const moduleName = file.split('/').pop()?.replace('.ts', '')
    if (moduleName) {
      if (module.default) {
        $api[moduleName] = { ...module.default } as ApiModuleType
      } else if (module && Object.keys(module).length) {
        $api[moduleName] = { ...module } as ApiModuleType
      }
    }
  })
}
