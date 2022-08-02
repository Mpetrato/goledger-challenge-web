import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { App } from './App'
import { GlobalStyle } from './GlobalStyle'
import { AppRoutes } from './routes'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <BrowserRouter>
    <GlobalStyle />
    <App />
  </BrowserRouter>
)
