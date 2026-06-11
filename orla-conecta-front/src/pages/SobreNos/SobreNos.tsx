import { Link } from 'react-router-dom'
import { FaStar, FaLink, FaUsers } from 'react-icons/fa'
import './SobreNos.css'

const valores = [
  {
    icon: <FaStar size={28} color="#111827" />,
    title: 'Autenticidade',
    desc: 'Valorizamos as experiências genuínas e a cultura local de Pernambuco',
  },
  {
    icon: <FaLink size={28} color="#111827" />,
    title: 'Conexão',
    desc: 'Criamos pontes entre turistas e prestadores de serviços locais',
  },
  {
    icon: <FaUsers size={28} color="#111827" />,
    title: 'Comunidade',
    desc: 'Fortalecemos a economia local e o turismo sustentável',
  },
]

function SobreNos() {
  return (
    <div className="sn-page">
      {/* Hero */}
      <section className="sn-hero">
        <p className="sn-hero-tag">Sobre nós</p>
        <h1>Sobre o Orla Conecta</h1>
        <p className="sn-hero-sub">
          Conectando turistas aos melhores serviços locais do litoral pernambucano desde 2026
        </p>
      </section>

      {/* História */}
      <section className="sn-section">
        <div className="sn-container sn-historia">
          <div className="sn-historia-text">
            <h2>Nossa História</h2>
            <p>
              O Orla Conecta nasceu da necessidade de aproximar turistas das experiências
              autênticas que o litoral de Pernambuco tem a oferecer. Percebemos que muitos
              visitantes tinham dificuldade em descobrir os melhores serviços locais, enquanto
              pequenos negócios lutavam para alcançar seu público.
            </p>
            <p>
              Nossa plataforma foi criada para resolver essa desconexão, oferecendo um espaço
              onde turistas podem facilmente encontrar hospedagens, restaurantes, passeios e
              transporte, enquanto prestadores de serviços locais ganham visibilidade e
              oportunidades de crescimento.
            </p>
          </div>
          <div className="sn-historia-img">
            <img
              src="https://images.unsplash.com/photo-1641231767593-1184d3f32890?w=600&h=400&fit=crop"
              alt="Orla Pernambuco"
            />
          </div>
        </div>
      </section>

      {/* Valores */}
      <section className="sn-section sn-section-gray">
        <div className="sn-container">
          <div className="sn-section-header">
            <h2>Nossos Valores</h2>
            <p>O que nos guia todos os dias</p>
          </div>
          <div className="sn-values-grid">
            {valores.map(v => (
              <div key={v.title} className="sn-value-card">
                <div className="sn-value-icon">{v.icon}</div>
                <h3>{v.title}</h3>
                <p>{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="sn-cta">
        <div className="sn-container">
          <h2>Faça Parte Dessa História</h2>
          <p>Junte-se a nós e descubra o melhor do litoral pernambucano</p>
          <Link to="/" className="sn-cta-btn">Explorar Serviços</Link>
        </div>
      </section>
    </div>
  )
}

export default SobreNos
