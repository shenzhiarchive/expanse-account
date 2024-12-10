import { RouteObject } from 'react-router'
import { ComponentType, LazyExoticComponent } from 'react'
import { LazyImport } from '@/components/LazyImport'

export type RouteMiddleware = LazyExoticComponent<ComponentType>

export type RouteConfig = {
  middlewares?: RouteMiddleware[]
} & RouteObject

export const buildRoutes = (routes: RouteConfig[]): RouteObject[] => {
  return routes.map((item) => {
    const { middlewares, children, ...restProps } = item

    // 递归处理子路由
    if (children) {
      item.children = buildRoutes(children as RouteConfig[])
    }

    // 如果有 middlewares，需要构造嵌套结构
    if (middlewares && middlewares.length > 0) {
      let node: RouteObject = { ...restProps }

      // 从最后一个 middleware 开始嵌套
      for (let i = middlewares.length - 1; i >= 0; i--) {
        const middleware = middlewares[i]
        node = {
          element: <LazyImport lazy={middleware} />, // 当前 middleware 包裹下一层
          children: [node], // 下一层作为子路由
        }
      }

      // 返回嵌套后的结构
      return node
    }

    // 如果没有 middlewares，直接返回原始路由
    return item
  })
}
