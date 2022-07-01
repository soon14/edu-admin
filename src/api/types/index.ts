import { ApiEnum } from '@/constants/fetch'

export type ApiModuleType = Record<ApiEnum, Function>
export type IApis = Record<string, ApiModuleType>
