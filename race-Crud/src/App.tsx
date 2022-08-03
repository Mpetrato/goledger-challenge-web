import * as C from './AppStyles'
import { Header } from "./components/Header"
import { AppRoutes } from './routes'
import { Link } from 'react-router-dom'
 
export const App = () => {
  
  return (
    <>
      <Header />
      <C.Section>
        <C.Container>
          <Link to={'/cars'}>Cars</Link>
          <Link to={'/drivers'}>Drivers</Link>
          <Link to={'/teams'}>Teams</Link>
          <Link to={'/events'}>Events</Link>
          <AppRoutes />
        </C.Container>
      </C.Section>
    </>
  )
}