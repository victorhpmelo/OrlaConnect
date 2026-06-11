import { Routes, Route } from 'react-router-dom'
import Home from '../../pages/Home/Home'
import Login from '../../pages/Login/Login'
import Register from '../../pages/Register/Register'
import NotFound from '../../pages/NotFound/NotFound'
import Details from '../../pages/Details/Details'
import Payment from '../../pages/Payment/Payment'
import Search from '../../pages/Search/Search'
import Perfil from '../../pages/Perfil/Perfil'
import MinhasReservas from '../../pages/MinhasReservas/MinhasReservas'
import MeuRoteiro from '../../pages/MeuRoteiro/MeuRoteiro'
import SobreNos from '../../pages/SobreNos/SobreNos'
import ParaEmpresas from '../../pages/ParaEmpresas/ParaEmpresas'
import Suporte from '../../pages/Suporte/Suporte'
import Blog from '../../pages/Blog/Blog'

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/search" element={<Search />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/details" element={<Details />} />
      <Route path="/payment" element={<Payment />} />
      <Route path="/perfil" element={<Perfil />} />
      <Route path="/minhas-reservas" element={<MinhasReservas />} />
      <Route path="/meu-roteiro" element={<MeuRoteiro />} />
      <Route path="/sobre-nos" element={<SobreNos />} />
      <Route path="/para-empresas" element={<ParaEmpresas />} />
      <Route path="/suporte" element={<Suporte />} />
      <Route path="/blog" element={<Blog />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  )
}

export default AppRoutes
