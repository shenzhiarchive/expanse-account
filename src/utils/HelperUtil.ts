import { BaseResponse } from '@/types/ApiResponse'
import { Path } from 'react-router'

export const isSuccess = (ret: BaseResponse): boolean => {
  return ret.code === 0
}

export const buildRedirectUri = (location: Path) => {
  const pathname = location.pathname
  const search = location.search.includes('?')
    ? location.search
    : `?${location.search}`
  const hash = location.hash
  return encodeURIComponent(`${pathname}${search}${hash}`)
}
