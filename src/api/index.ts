export const apis: Record<string, any> = {}

export function setupFetchApi() {
  const modules = import.meta.globEager('./module/*.ts')
  Object.entries(modules).forEach(([file, module]) => {
    const moduleName = file.split('/').pop()?.replace('.ts', '')
    if (moduleName) {
      apis[moduleName] = { ...module }
    }
  })
}
// const s = 'user'
// const b = 'loginApi'
// apis[s][b]()
