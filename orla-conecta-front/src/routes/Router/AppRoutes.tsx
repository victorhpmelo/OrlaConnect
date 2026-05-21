import { Routes, Route } from 'react-router-dom'
import Home from '../../pages/Home/Home'
import Login from '../../pages/Login/Login'
import Register from '../../pages/Register/Register'
import NotFound from '../../pages/NotFound/NotFound'
import Details from '../../pages/Details/Details'
import Payment from '../../pages/Payment/Payment'
import Search from '../../pages/Search/Search'

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/search" element={<Search />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/details" element={<Details />} />
      <Route path="/payment" element={<Payment />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  )
}

export default AppRoutes
