import { BrowserRouter as Router, useLocation } from 'react-router-dom'
import './App.css'
import Header from './components/Header/Header'
import AppRoutes from './routes/Router/AppRoutes'
import Footer from './components/Footer/Footer'

const NO_CHROME = ['/login', '/register']

function AppShell() {
  const { pathname } = useLocation()
  const hideChrome = NO_CHROME.includes(pathname)
  return (
    <>
      {!hideChrome && <Header />}
      <AppRoutes />
      {!hideChrome && <Footer />}
    </>
  )
}

function App() {
  return (
    <Router>
      <AppShell />
    </Router>
  )
}

export default App
