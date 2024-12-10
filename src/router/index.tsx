import { lazy } from 'react'
import { LazyImport } from '@/components/LazyImport'
import { buildRoutes, RouteConfig } from './utils'

const routeConfig: RouteConfig[] = [
  {
    element: <LazyImport lazy={lazy(() => import('@/layout/BasicLayout'))} />,
    children: [
      {
        path: '/',
        element: <LazyImport lazy={lazy(() => import('@/pages/index'))} />,
      },
    ],
  },
  {
    element: <LazyImport lazy={lazy(() => import('@/layout/LoginLayout'))} />,
    children: [
      {
        path: '/login',
        element: <LazyImport lazy={lazy(() => import('@/pages/login'))} />,
      },
    ],
  },
]

export const routes = buildRoutes(routeConfig)
