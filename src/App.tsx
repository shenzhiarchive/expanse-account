import './App.css'
import { createBrowserRouter, RouterProvider } from 'react-router'
import { routes } from './router'
import { ConfigProvider } from 'antd'

const App = () => {
  return (
    <ConfigProvider>
      <RouterProvider router={createBrowserRouter(routes)} />
    </ConfigProvider>
  )
}

export default App
