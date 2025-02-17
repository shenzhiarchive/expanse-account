import { Outlet, useLocation } from 'react-router'
import { useEffect, useState } from 'react'
import LazyLoading from '@/components/LazyLoading'
import { Result } from 'antd'

const PagePermissionMiddleware = () => {
  const [loading, setLoading] = useState(true)
  const [auth, setAuth] = useState(false)
  const location = useLocation()
  const [oldPathname, setOldPathname] = useState('')
  useEffect(() => {
    console.log('执行 PagePermissionMiddleware')
    // 切换了路径，需要做鉴权 Loading 处理
    if (oldPathname !== location.pathname) {
      setLoading(true)
    }
    setOldPathname(location.pathname)
    setTimeout(() => {
      // 随机返回 0 或 1
      const authed = Math.round(Math.random())
      if (authed) {
        console.log('拥有访问权 PagePermissionMiddleware')
        setAuth(true)
      } else {
        console.log('没有访问权 PagePermissionMiddleware')
        setAuth(false)
      }
      setLoading(false)
    }, 2000)
  }, [location.pathname, oldPathname])
  if (loading) {
    return <LazyLoading />
  }
  if (!auth) {
    return <Result status="403" title="403" subTitle="没有权限访问此页面" />
  }
  return <Outlet />
}

export default PagePermissionMiddleware
