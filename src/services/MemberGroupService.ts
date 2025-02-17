import { HttpUtil } from '@/utils/HttpUtil'
import { ApiResponse, PageResponse } from '@/types/ApiResponse'
import { PageRequest } from '@/types/ApiRequest'
import { Any } from '@/types/Global'

export class MemberGroupService {
  static index(params: PageRequest) {
    return HttpUtil.get<ApiResponse<PageResponse>>({
      url: '/admin/member/group/index',
      params,
    })
  }

  static create(data: Any) {
    return HttpUtil.post<ApiResponse>({
      url: '/admin/member/group/create',
      data,
    })
  }

  static update(data: Any) {
    return HttpUtil.post<ApiResponse>({
      url: '/admin/member/group/update',
      data,
    })
  }

  static delete(id: number) {
    return HttpUtil.post<ApiResponse>({
      url: '/admin/member/group/delete',
      data: { id },
    })
  }
}
