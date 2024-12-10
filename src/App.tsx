import { ConfigProvider } from 'antd'
import './App.css'
import { useRoutes } from 'react-router'
import { routes } from './router'

const App = () => {
  return <ConfigProvider>{useRoutes(routes)}</ConfigProvider>
}

export default App
