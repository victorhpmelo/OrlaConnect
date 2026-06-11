import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { register } from '../../services/authService'
import { CreateClientDTO } from '../../types/User'
import { FaUser, FaLock, FaEye, FaEyeSlash, FaPhone, FaIdCard } from 'react-icons/fa'
import { MdEmail } from 'react-icons/md'
import './Register.css'

function Register() {
  const navigate = useNavigate()
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirm, setShowConfirm] = useState(false)
  const [confirmPassword, setConfirmPassword] = useState('')

  const [formData, setFormData] = useState<CreateClientDTO>({
    name: '',
    email: '',
    password: '',
    cpf: '',
    phoneNumber: '',
    addressStreet: '',
    addressCity: '',
    addressState: '',
    addressZipCode: ''
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    // Auto-format CPF as 123.456.789-00
    if (name === 'cpf') {
      const digits = value.replace(/\D/g, '').slice(0, 11)
      const formatted = digits
        .replace(/(\d{3})(\d)/, '$1.$2')
        .replace(/(\d{3}\.\d{3})(\d)/, '$1.$2')
        .replace(/(\d{3}\.\d{3}\.\d{3})(\d{1,2})/, '$1-$2')
      setFormData(prev => ({ ...prev, cpf: formatted }))
      return
    }
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (formData.password !== confirmPassword) {
      alert('As senhas não coincidem.')
      return
    }
    try {
      await register(formData)
      alert('Cadastro realizado com sucesso!')
      navigate('/login')
    } catch (error: unknown) {
      const err = error as { response?: { data?: { message?: string } } }
      const msg = err?.response?.data?.message ?? 'Verifique os dados e tente novamente.'
      alert(`Erro ao cadastrar: ${msg}`)
    }
  }

  return (
    <div className="reg-page">

      {/* Left: beach photo + branding */}
      <div className="reg-left">
        <div className="reg-left-content">
          <div className="reg-brand">
            <span className="reg-wave">≋</span>
            <h2>Orla Conecta</h2>
          </div>
          <p>Conectando turistas aos melhores serviços locais do litoral pernambucano</p>
        </div>
      </div>

      {/* Right: form */}
      <div className="reg-right">
        <div className="reg-form-wrap">
          <h1>Crie sua conta</h1>
          <p className="reg-subtitle">Cadastre-se para explorar o litoral</p>

          <form className="reg-form" onSubmit={handleSubmit}>

            <div className="reg-field">
              <label htmlFor="name">Nome Completo</label>
              <div className="reg-input-wrap">
                <FaUser className="reg-icon-left" size={15} />
                <input
                  type="text"
                  id="name"
                  name="name"
                  placeholder="Seu nome completo"
                  required
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="reg-field">
              <label htmlFor="email">Email</label>
              <div className="reg-input-wrap">
                <MdEmail className="reg-icon-left" size={18} />
                <input
                  type="email"
                  id="email"
                  name="email"
                  placeholder="seu@email.com"
                  required
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="reg-field">
              <label htmlFor="cpf">CPF</label>
              <div className="reg-input-wrap">
                <FaIdCard className="reg-icon-left" size={15} />
                <input
                  type="text"
                  id="cpf"
                  name="cpf"
                  placeholder="123.456.789-00"
                  required
                  maxLength={14}
                  value={formData.cpf}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="reg-field">
              <label htmlFor="phoneNumber">Telefone</label>
              <div className="reg-input-wrap">
                <FaPhone className="reg-icon-left" size={14} />
                <input
                  type="tel"
                  id="phoneNumber"
                  name="phoneNumber"
                  placeholder="81999999999"
                  required
                  maxLength={15}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="reg-field">
              <div className="reg-input-wrap">
                <FaLock className="reg-icon-left" size={15} />
                <input
                  type={showPassword ? 'text' : 'password'}
                  id="password"
                  name="password"
                  placeholder="••••••••"
                  required
                  onChange={handleChange}
                />
                <button type="button" className="reg-eye" onClick={() => setShowPassword(v => !v)}>
                  {showPassword ? <FaEyeSlash size={16} /> : <FaEye size={16} />}
                </button>
              </div>
            </div>

            <div className="reg-field">
              <label htmlFor="confirmPassword">Confirmar Senha</label>
              <div className="reg-input-wrap">
                <FaLock className="reg-icon-left" size={15} />
                <input
                  type={showConfirm ? 'text' : 'password'}
                  id="confirmPassword"
                  name="confirmPassword"
                  placeholder="••••••••"
                  required
                  value={confirmPassword}
                  onChange={e => setConfirmPassword(e.target.value)}
                />
                <button type="button" className="reg-eye" onClick={() => setShowConfirm(v => !v)}>
                  {showConfirm ? <FaEyeSlash size={16} /> : <FaEye size={16} />}
                </button>
              </div>
            </div>

            <button type="submit" className="reg-btn-submit">Criar Conta</button>
          </form>

          <p className="reg-login">
            Já tem uma conta? <Link to="/login">Faça login</Link>
          </p>

          <Link to="/" className="reg-back">← Voltar para a página inicial</Link>
        </div>
      </div>

    </div>
  )
}

export default Register
