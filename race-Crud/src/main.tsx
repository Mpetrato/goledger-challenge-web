import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { App } from './App'
import { CarListProvider } from './context/carListContext'
import { GlobalStyle } from './GlobalStyle'
import { AppRoutes } from './routes'
import { DriverListProvider } from '../src/context/driverListContex'
import { TeamListProvider } from './context/teamListContext'
import { EventListProvider } from './context/eventListContext'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <EventListProvider>
    <TeamListProvider>
      <DriverListProvider>
        <CarListProvider>
          <BrowserRouter>
            <GlobalStyle />
            <App />
          </BrowserRouter>
        </CarListProvider>
      </DriverListProvider>
    </TeamListProvider>
  </EventListProvider>
)
