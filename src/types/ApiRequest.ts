interface Pagination {
  current?: number
  pageSize?: number
}

export interface PageRequest<T = object, S = object> {
  pagination?: Pagination
  search?: T
  sort?: S
}
