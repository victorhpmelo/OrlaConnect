import { useState, FormEvent } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { MdEmail } from 'react-icons/md'
import { FaLock, FaEye, FaEyeSlash } from 'react-icons/fa'
import { login, dispatchAuthChange } from '../../services/authService'
import './Login.css'

function Login() {
  const navigate = useNavigate()
  const [showPassword, setShowPassword] = useState(false)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  async function handleSubmit(e: FormEvent) {
    e.preventDefault()
    setError(null)
    setLoading(true)
    try {
      const data = await login(email, password)
      localStorage.setItem('token', data.token)
      localStorage.setItem('user', JSON.stringify({ name: data.name, email: data.email, picture: data.picture }))
      dispatchAuthChange()
      navigate('/')
    } catch (err: unknown) {
      const msg =
        (err as { response?: { data?: { message?: string } } })?.response?.data?.message ??
        'Email ou senha incorretos.'
      setError(msg)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="login-page">

      {/* Left: beach photo + branding */}
      <div className="login-left">
        <div className="login-left-content">
          <div className="login-brand">
            <span className="login-wave">≋</span>
            <h2>Orla Conecta</h2>
          </div>
          <p>Conectando turistas aos melhores serviços locais do litoral pernambucano</p>
        </div>
      </div>

      {/* Right: form */}
      <div className="login-right">
        <div className="login-form-wrap">
          <h1>Bem-vindo de volta!</h1>
          <p className="login-subtitle">Faça login para acessar sua conta</p>

          <form className="login-form" onSubmit={handleSubmit}>
            <div className="login-field">
              <label htmlFor="email">Email</label>
              <div className="login-input-wrap">
                <MdEmail className="login-icon-left" size={18} />
                <input
                  type="email"
                  id="email"
                  placeholder="seu@email.com"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="login-field">
              <label htmlFor="password">Senha</label>
              <div className="login-input-wrap">
                <FaLock className="login-icon-left" size={15} />
                <input
                  type={showPassword ? 'text' : 'password'}
                  id="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  required
                />
                <button
                  type="button"
                  className="login-eye"
                  onClick={() => setShowPassword(v => !v)}
                >
                  {showPassword ? <FaEyeSlash size={16} /> : <FaEye size={16} />}
                </button>
              </div>
            </div>

            {error && <p className="login-error">{error}</p>}

            <button type="submit" className="login-btn-submit" disabled={loading}>
              {loading ? 'Entrando...' : 'Entrar'}
            </button>
          </form>

          <p className="login-signup">
            Não tem uma conta? <Link to="/register">Cadastre-se</Link>
          </p>

          <Link to="/" className="login-back">← Voltar para a página inicial</Link>
        </div>
      </div>

    </div>
  )
}

export default Login
