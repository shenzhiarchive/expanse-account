import { Outlet } from 'react-router'

const LoginLayout = () => {
  console.log('触发 login layout')
  return (
    <div>
      <div>这是 LoginLayout</div>
      <Outlet />
    </div>
  )
}

export default LoginLayout
