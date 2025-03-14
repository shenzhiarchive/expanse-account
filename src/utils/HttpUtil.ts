import axios, { AxiosRequestConfig, AxiosResponse } from 'axios'
import { ApiResponse, BaseResponse } from '@/types/ApiResponse'
import { message } from 'antd'
import { router } from '@/router'
import { useAppStore } from '@/stores/app'
import { buildRedirectUri } from '@/utils/HelperUtil'

export interface RequestConfig<D = object> extends AxiosRequestConfig<D> {
  ignoreError?: boolean
}

const parseCodeMessage = (code: number): string | undefined => {
  const codeMessage: Record<number, string> = {
    400: '请求有错误',
    405: '请求URL不存在',
    500: '服务器发生错误',
    502: '网关错误',
    503: '服务不可用，服务器暂时过载或维护',
    504: '网关超时',
  }
  return codeMessage[code]
}

export class HttpUtil {
  private static request<T = ApiResponse, D = object>(
    config?: RequestConfig<D>,
  ): Promise<T> {
    config = config ?? {}
    let url = config.url ?? ''
    if (!url.startsWith('http://') && !url.startsWith('https://')) {
      url = `${import.meta.env.PUBLIC_API_URL}${url}`
    }
    config.url = url
    config.withCredentials = true

    // 设置 header Authorization
    // const authorization = useAppStore.getState().token
    // if (authorization) {
    //   config.headers = config.headers || {}
    //   config.headers['Authorization'] = authorization
    // }

    const ignoreError = config.ignoreError

    return axios
      .request(config)
      .then((res: AxiosResponse<T, D>) => {
        if (res.status >= 200 && res.status < 300) {
          return res
        }

        return Promise.reject({
          code: res.status,
          message: parseCodeMessage(res.status),
        })
      })
      .then((res) => {
        if (typeof res.data === 'object') {
          const data = res.data as BaseResponse
          if (typeof data.code === 'undefined' || data.code < 0) {
            return Promise.reject(res.data)
          }
        }
        return res.data
      })
      .catch((err: BaseResponse) => {
        err.code = err.code ?? -1
        if (err.code > 0) {
          err.code *= -1
        }
        err.message = err.message ?? `请求异常，状态码：${err.code}`
        const redirectUri = buildRedirectUri(router.encodeLocation(location))

        const handleLogoutRedirect = () => {
          useAppStore.getState().onLogout() // 本地退出登录
          router.navigate(`/login?redirectUri=${redirectUri}`) // 重定向到登录页
        }

        switch (err.code) {
          case -1001:
            // 未登录
            handleLogoutRedirect()
            break
          default:
            // 其他错误
            if (!ignoreError) {
              message.error(err.message)
            }
        }

        return Promise.resolve(err as T)
      })
  }

  static get<T = ApiResponse>(config?: RequestConfig): Promise<T> {
    config = config ?? {}
    config.method = 'GET'
    return HttpUtil.request<T>(config)
  }

  static post<T = ApiResponse, D = object>(
    config?: RequestConfig<D>,
  ): Promise<T> {
    config = config ?? {}
    config.method = 'POST'
    return HttpUtil.request<T, D>(config)
  }

  static put<T = ApiResponse, D = object>(
    config?: RequestConfig<D>,
  ): Promise<T> {
    config = config ?? {}
    config.method = 'PUT'
    return HttpUtil.request<T, D>(config)
  }

  static delete<T = ApiResponse, D = object>(
    config?: RequestConfig<D>,
  ): Promise<T> {
    config = config ?? {}
    config.method = 'DELETE'
    return HttpUtil.request<T, D>(config)
  }

  static patch<T = ApiResponse, D = object>(
    config?: RequestConfig<D>,
  ): Promise<T> {
    config = config ?? {}
    config.method = 'PATCH'
    return HttpUtil.request<T, D>(config)
  }
}
