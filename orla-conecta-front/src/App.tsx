import { BrowserRouter as Router } from 'react-router-dom'
import './App.css'
import Header from './components/Header/Header'
import AppRoutes from './routes/Router/AppRoutes'
import Footer from './components/Footer/Footer'


function App() {


  return (
    <>
      <Router>
        <Header />
        <AppRoutes />
        <Footer/>
      </Router>
    </>
  )


}

export default App
