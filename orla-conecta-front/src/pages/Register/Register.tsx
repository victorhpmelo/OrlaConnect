import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { register } from '../../services/authService'
import { CreateClientDTO } from '../../types/User'
import '@fortawesome/fontawesome-free/css/all.min.css'
import './Register.css'

function Register() {
  const navigate = useNavigate()

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
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const response = await register(formData)
      console.log('Cadastro realizado com sucesso:', response)
      alert('Cadastro realizado com sucesso!')
      navigate('/login')
    } catch (error) {
      console.error('Erro ao cadastrar:', error)
      alert('Erro ao cadastrar. Verifique os dados e tente novamente.')
    }
  }

  return (
    <div>
      <div className='register-container'>
        <div className="card-register">
          <div className="register-content">
            <form className="form-card" onSubmit={handleSubmit}>
              <p>Faça seu Cadastro</p>

              <div className="inputs-register">
                <input type="text" name="name" placeholder="Nome Completo" required onChange={handleChange} />
              </div>
              <div className="inputs-register">
                <input type="email" name="email" placeholder="Email" required onChange={handleChange} />
              </div>
              <div className="inputs-register">
                <input type="password" name="password" placeholder="Senha" required onChange={handleChange} />
              </div>
              <div className="inputs-register">
                <input type="text" name="cpf" placeholder="CPF (ex: 123.456.789-00)" required onChange={handleChange} />
              </div>
              <div className="inputs-register">
                <input type="tel" name="phoneNumber" placeholder="Telefone (ex: +5511999999999)" required onChange={handleChange} />
              </div>
              <div className="inputs-register">
                <input type="text" name="addressStreet" placeholder="Rua" onChange={handleChange} />
              </div>
              <div className="inputs-register">
                <input type="text" name="addressCity" placeholder="Cidade" onChange={handleChange} />
              </div>
              <div className="inputs-register">
                <input type="text" name="addressState" placeholder="Estado (ex: SP)" maxLength={2} onChange={handleChange} />
              </div>
              <div className="inputs-register">
                <input type="text" name="addressZipCode" placeholder="CEP (ex: 12345-678)" onChange={handleChange} />
              </div>

              <button type="submit">Cadastrar</button>
              <span>Já é cadastrado? <a href="/login" className="link-login">Fazer Login</a></span>
            </form>
          </div>
        </div>
        <div className='img-register'>
          <img src="https://i.pinimg.com/736x/99/de/98/99de98eb4e7bd078d39db104da78444e.jpg" alt="imagem-register" />
        </div>
      </div>
    </div>
  )
}

export default Register
