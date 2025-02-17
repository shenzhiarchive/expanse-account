import { lazy } from 'react'
import { buildRoutes, RouteConfig } from './utils'
import { createBrowserRouter } from 'react-router'
import ErrorBoundary from '@/components/ErrorBoundary'

const routeConfig: RouteConfig[] = [
  {
    ErrorBoundary: ErrorBoundary,
    element: lazy(() => import('@/layouts/AppLayout')),
    children: [
      {
        path: '/login',
        element: lazy(() => import('@/pages/Login')),
      },
      {
        // 应用基础布局
        element: lazy(() => import('@/layouts/BasicLayout')),
        middlewares: [
          // 管理员登录验证中间件
          lazy(() => import('../middlewares/AuthMiddleware')),
          // 页面权限验证中间件
          lazy(() => import('../middlewares/PagePermissionMiddleware')),
        ],
        children: [
          {
            path: '/',
            index: true,
            element: lazy(() => import('@/pages/Home')),
          },
        ],
      },
    ],
  },
]

export const routes = buildRoutes(routeConfig)

export const router = createBrowserRouter(routes)
