import { ConfigProvider, App as AppContainer } from 'antd'
import zhCN from 'antd/locale/zh_CN'
import './App.less'
import { RouterProvider } from 'react-router'
import { router } from './router'
import { HelmetProvider } from 'react-helmet-async'

const App = () => {
  return (
    <HelmetProvider>
      <ConfigProvider locale={zhCN}>
        <AppContainer component={false}>
          <RouterProvider router={router} />
        </AppContainer>
      </ConfigProvider>
    </HelmetProvider>
  )
}

export default App
