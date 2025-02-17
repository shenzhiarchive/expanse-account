import { Any } from '@/types/Global'

export interface BaseResponse {
  code: number
  message: string
}

export interface ApiResponse<T = Any> extends BaseResponse {
  data?: T
}

export interface PageResponse<T = Any[]> {
  list: T
  total: number
}
