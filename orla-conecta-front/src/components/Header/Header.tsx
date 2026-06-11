import { useState, useEffect, useRef } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { FaSignInAlt, FaUser, FaCalendarAlt, FaSignOutAlt, FaRoute } from 'react-icons/fa'
import { getCurrentUser, logout } from '../../services/authService'
import ContatoModal from '../ContatoModal/ContatoModal'
import './Header.css'

function getInitials(name: string) {
  const parts = name.trim().split(' ')
  return parts.length >= 2
    ? (parts[0][0] + parts[parts.length - 1][0]).toUpperCase()
    : name.slice(0, 2).toUpperCase()
}

function Header() {
  const navigate = useNavigate()
  const [contatoOpen, setContatoOpen] = useState(false)
  const [user, setUser] = useState(getCurrentUser)
  const [panelOpen, setPanelOpen] = useState(false)
  const panelRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handler = () => setUser(getCurrentUser())
    window.addEventListener('auth-changed', handler)
    return () => window.removeEventListener('auth-changed', handler)
  }, [])

  useEffect(() => {
    function onClickOutside(e: MouseEvent) {
      if (panelRef.current && !panelRef.current.contains(e.target as Node)) {
        setPanelOpen(false)
      }
    }
    document.addEventListener('mousedown', onClickOutside)
    return () => document.removeEventListener('mousedown', onClickOutside)
  }, [])

  function handleLogout() {
    logout()
    setPanelOpen(false)
    navigate('/')
  }

  function nav(to: string) {
    setPanelOpen(false)
    navigate(to)
  }

  return (
    <>
      <header className="oc-header">
        <div className="oc-header-inner">
          <Link to="/" className="oc-logo">
            <span className="oc-logo-wave">≋</span>
            <span className="oc-logo-name">Orla Conecta</span>
          </Link>

          <nav className="oc-nav-links">
            <Link to="/" className="oc-nav-link">Página Inicial</Link>
            <a href="#servicos" className="oc-nav-link">Serviços</a>
            <a href="#destinos" className="oc-nav-link">Destinos</a>
            <button className="oc-nav-link" onClick={() => setContatoOpen(true)}>Contato</button>
          </nav>

          {user ? (
            <div className="oc-user-wrap" ref={panelRef}>
              <button
                className="oc-user-btn"
                onClick={() => setPanelOpen(v => !v)}
                aria-expanded={panelOpen}
                aria-label="Minha conta"
              >
                <span className="oc-avatar">{getInitials(user.name)}</span>
                <span className="oc-user-name">{user.name.split(' ')[0]}</span>
              </button>

              {panelOpen && (
                <div className="oc-panel" role="dialog" aria-label="Minha Conta">
                  <div className="oc-panel-header">
                    <span className="oc-panel-title">Minha Conta</span>
                    <button className="oc-panel-close" onClick={() => setPanelOpen(false)} aria-label="Fechar">×</button>
                  </div>
                  <div className="oc-panel-user">
                    <div className="oc-panel-avatar">{getInitials(user.name)}</div>
                    <div className="oc-panel-user-info">
                      <span className="oc-panel-name">{user.name}</span>
                      <span className="oc-panel-email">{user.email}</span>
                    </div>
                  </div>
                  <hr className="oc-panel-divider" />
                  <button className="oc-panel-item" onClick={() => nav('/perfil')}>
                    <FaUser size={14} />
                    <span>Meu Perfil</span>
                  </button>
                  <button className="oc-panel-item" onClick={() => nav('/meu-roteiro')}>
                    <FaRoute size={14} />
                    <span>Meu Roteiro</span>
                  </button>
                  <hr className="oc-panel-divider" />
                  <button className="oc-panel-item oc-panel-logout" onClick={handleLogout}>
                    <FaSignOutAlt size={14} />
                    <span>Sair</span>
                  </button>
                </div>
              )}
            </div>
          ) : (
            <Link to="/login" className="oc-btn-entrar">
              <FaSignInAlt size={14} />
              <span>Entrar</span>
            </Link>
          )}
        </div>
      </header>

      <ContatoModal open={contatoOpen} onClose={() => setContatoOpen(false)} />
    </>
  )
}

export default Header
