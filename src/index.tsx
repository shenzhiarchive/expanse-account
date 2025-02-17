import '@ant-design/v5-patch-for-react-19'
import ReactDOM from 'react-dom/client'
import './dayjs'
import './index.css'
import App from './App'

const rootEl = document.getElementById('root')
if (rootEl) {
  const root = ReactDOM.createRoot(rootEl)
  root.render(<App />)
}
