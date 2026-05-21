import { Link } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css'
import { FaPlaneDeparture } from 'react-icons/fa'

function Header() {
  return (
    <header>
     <nav className="navbar navbar-expand-lg navbar-dark bg-orla-conecta px-4">
        <Link to="/" className="navbar-brand d-flex align-items-center text-white">
          <FaPlaneDeparture className="me-2" />
          <strong>Orla Conecta</strong>
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse justify-content-center" id="navbarNav">
          <ul className="navbar-nav">
            <li className="nav-item"><Link className="nav-link text-white" to="/">Home</Link></li>
            <li className="nav-item"><Link className="nav-link text-white" to="/search">Buscar</Link></li>
            <li className="nav-item"><Link className="nav-link text-white" to="/details">Detalhes</Link></li>
            <li className="nav-item"><Link className="nav-link text-white" to="/payment">Pagamento</Link></li>
            <li className="nav-item"><Link className="nav-link text-white" to="/register">Cadastrar</Link></li>
            <li className="nav-item"><Link className="nav-link text-white" to="/pacotes">Pacotes</Link></li>
            <li className="nav-item"><Link className="nav-link text-white" to="/promocoes">Promoções</Link></li>
          </ul>
        </div>

        {/* Botão de Login no canto direito */}
        <div className="d-flex ms-auto">
          <Link to="/login" className="btn btn-outline-light">Login</Link>
        </div>
      </nav>
    </header>
  )
}

export default Header
