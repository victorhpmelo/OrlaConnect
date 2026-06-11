import { useState } from 'react'
import { FaEye, FaUsers, FaCog, FaCheck } from 'react-icons/fa'
import CadastroNegocioModal from '../../components/CadastroNegocioModal/CadastroNegocioModal'
import './ParaEmpresas.css'

const beneficios = [
  {
    icon: <FaEye size={26} color="#111827" />,
    title: 'Aumente Sua Visibilidade',
    desc: 'Apareça para turistas que buscam ativamente serviços na sua região',
  },
  {
    icon: <FaUsers size={26} color="#111827" />,
    title: 'Conquiste Novos Clientes',
    desc: 'Conecte-se diretamente com turistas interessados em seus serviços',
  },
  {
    icon: <FaCog size={26} color="#111827" />,
    title: 'Fácil de Usar',
    desc: 'Cadastro simples e rápido. Comece a receber contatos em minutos',
  },
]

const incluso = [
  'Perfil completo com fotos e descrição do seu negócio',
  'Informações de contato direto (telefone e email)',
  'Localização no mapa para facilitar o acesso',
  'Avaliações e depoimentos de clientes',
  'Destaque em buscas por categoria e região',
  'Suporte dedicado para ajudar seu negócio',
]

function ParaEmpresas() {
  const [cadastroOpen, setCadastroOpen] = useState(false)

  return (
    <div className="pe-page">
      {/* Hero */}
      <section className="pe-hero">
        <h1>Orla Conecta para Empresas</h1>
        <p className="pe-hero-sub">
          Conecte seu negócio com milhares de turistas que visitam o litoral de Pernambuco
        </p>
        <button className="pe-hero-btn" onClick={() => setCadastroOpen(true)}>
          Cadastre Seu Negócio Gratuitamente
        </button>
      </section>

      {/* Benefícios */}
      <section className="pe-section">
        <div className="pe-container">
          <div className="pe-section-header">
            <h2>Por Que Escolher o Orla Conecta?</h2>
            <p>Benefícios exclusivos para seu negócio crescer</p>
          </div>
          <div className="pe-benefits-grid">
            {beneficios.map(b => (
              <div key={b.title} className="pe-benefit-card">
                <div className="pe-benefit-icon">{b.icon}</div>
                <h3>{b.title}</h3>
                <p>{b.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* O Que Está Incluso */}
      <section className="pe-section pe-section-gray">
        <div className="pe-container pe-incluso-wrap">
          <div className="pe-section-header">
            <h2>O Que Está Incluso</h2>
          </div>
          <ul className="pe-incluso-list">
            {incluso.map(item => (
              <li key={item} className="pe-incluso-item">
                <FaCheck size={14} className="pe-check" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* CTA */}
      <section className="pe-cta">
        <div className="pe-container">
          <h2>Pronto Para Começar?</h2>
          <p>Cadastre seu negócio gratuitamente e comece a receber mais clientes hoje</p>
          <button className="pe-cta-btn" onClick={() => setCadastroOpen(true)}>
            Cadastrar Agora
          </button>
        </div>
      </section>

      <CadastroNegocioModal open={cadastroOpen} onClose={() => setCadastroOpen(false)} />
    </div>
  )
}

export default ParaEmpresas
