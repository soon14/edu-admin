import { ApiEnum } from '@/constants/fetch'

export type ApiModuleType = Record<ApiEnum, any>
export type IApis = Record<string, ApiModuleType>
