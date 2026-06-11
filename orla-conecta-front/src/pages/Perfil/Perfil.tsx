import { useEffect } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { FaUser, FaEnvelope, FaCalendarAlt, FaSignOutAlt } from 'react-icons/fa'
import { getCurrentUser, logout } from '../../services/authService'
import './Perfil.css'

function getInitials(name: string) {
  const parts = name.trim().split(' ')
  return parts.length >= 2
    ? (parts[0][0] + parts[parts.length - 1][0]).toUpperCase()
    : name.slice(0, 2).toUpperCase()
}

function Perfil() {
  const navigate = useNavigate()
  const user = getCurrentUser()

  useEffect(() => {
    if (!user) navigate('/login')
  }, [user, navigate])

  if (!user) return null

  function handleLogout() {
    logout()
    navigate('/')
  }

  return (
    <div className="pf-page">
      <div className="pf-container">

        {/* Sidebar */}
        <aside className="pf-sidebar">
          <div className="pf-avatar-wrap">
            <div className="pf-avatar">{getInitials(user.name)}</div>
          </div>
          <h2 className="pf-sidebar-name">{user.name}</h2>
          <p className="pf-sidebar-email">{user.email}</p>

          <nav className="pf-nav">
            <Link to="/perfil" className="pf-nav-item active">
              <FaUser size={14} />
              <span>Meu Perfil</span>
            </Link>
            <Link to="/meu-roteiro" className="pf-nav-item">
              <FaCalendarAlt size={14} />
              <span>Meu Roteiro</span>
            </Link>
          </nav>

          <button className="pf-logout-btn" onClick={handleLogout}>
            <FaSignOutAlt size={14} />
            Sair da conta
          </button>
        </aside>

        {/* Main content */}
        <main className="pf-main">
          <h1 className="pf-main-title">Meu Perfil</h1>
          <p className="pf-main-sub">Suas informações pessoais</p>

          <div className="pf-info-card">
            <div className="pf-info-row">
              <div className="pf-info-icon-wrap"><FaUser size={16} /></div>
              <div className="pf-info-text">
                <span className="pf-info-label">Nome completo</span>
                <span className="pf-info-value">{user.name}</span>
              </div>
            </div>
            <div className="pf-divider" />
            <div className="pf-info-row">
              <div className="pf-info-icon-wrap"><FaEnvelope size={16} /></div>
              <div className="pf-info-text">
                <span className="pf-info-label">Email</span>
                <span className="pf-info-value">{user.email}</span>
              </div>
            </div>
          </div>

          {/* Quick-access card */}
          <div className="pf-quick-card" onClick={() => navigate('/meu-roteiro')}>
            <div className="pf-quick-icon"><FaCalendarAlt size={24} /></div>
            <div>
              <h3>Meu Roteiro</h3>
              <p>Veja seus favoritos, visitados e roteiro planejado</p>
            </div>
            <span className="pf-quick-arrow">→</span>
          </div>
        </main>

      </div>
    </div>
  )
}

export default Perfil
