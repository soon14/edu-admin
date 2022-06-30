export interface IStorage {
  namespace: string
  get(key: string): any
  set(key: string, value: any, expired: number): void
  remove(key: string): void
  clear(): void
}
