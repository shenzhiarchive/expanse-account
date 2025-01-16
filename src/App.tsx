import './App.css'
import { RouterProvider } from 'react-router'
import { router } from './router'
import { ConfigProvider } from 'antd'

const App = () => {
  return (
    <ConfigProvider>
      <RouterProvider router={router} />
    </ConfigProvider>
  )
}

export default App
