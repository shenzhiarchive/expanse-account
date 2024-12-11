import { lazy } from 'react'
import { buildRoutes, RouteConfig } from './utils'

const routeConfig: RouteConfig[] = [
  {
    element: lazy(() => import('@/layouts/BasicLayout')),
    middlewares: [
      lazy(() => import('@/middlewares/AuthMiddleware')),
      lazy(() => import('@/middlewares/AdminMiddleware')),
    ],
    children: [
      {
        path: '/',
        element: lazy(() => import('@/pages/index')),
      },
    ],
  },
  {
    element: lazy(() => import('@/layouts/LoginLayout')),
    children: [
      {
        path: '/login',
        element: lazy(() => import('@/pages/login')),
      },
    ],
  },
]

export const routes = buildRoutes(routeConfig)
