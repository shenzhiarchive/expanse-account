import { Outlet, useNavigate } from 'react-router'
import { useEffect, useState } from 'react'
import { Spin } from 'antd'

const AdminMiddleware = () => {
  const [loading, setLoading] = useState(true)
  const navigate = useNavigate()
  useEffect(() => {
    setTimeout(() => {
      // 随机返回 0 或 1
      const authed = Math.round(Math.random())
      console.log('admin authed', authed)
      if (authed) {
        setLoading(false)
      } else {
        // 非管理员，跳转到登录页
        navigate('/login')
      }
    }, 3000)
    console.log('AdminMiddleware 中间件触发')
  }, [])
  return !loading ? <Outlet /> : <Spin spinning />
}

export default AdminMiddleware
