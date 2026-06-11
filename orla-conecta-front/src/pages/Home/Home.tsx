import { useState } from 'react'
import { FaUtensils, FaCar, FaMapMarkerAlt, FaLandmark } from 'react-icons/fa'
import { FaUmbrellaBeach } from 'react-icons/fa6'
import { MdSearch } from 'react-icons/md'
import ServiceModal, { ServiceCategory } from '../../components/ServiceModal/ServiceModal'
import CadastroNegocioModal from '../../components/CadastroNegocioModal/CadastroNegocioModal'
import DestinationModal, { Destination } from '../../components/DestinationModal/DestinationModal'
import ContatoModal from '../../components/ContatoModal/ContatoModal'
import './Home.css'

const IMG_PDG = 'https://images.unsplash.com/photo-1641231767593-1184d3f32890?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400'
const IMG_REC = 'https://images.unsplash.com/photo-1583214582490-1485cb37b04b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400'
const IMG_TAM = 'https://images.unsplash.com/photo-1713112874630-4325e65570a7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400'
const IMG_CAR = 'https://images.unsplash.com/photo-1583214576557-ad0da1b440b1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400'

const serviceData: Record<string, ServiceCategory> = {
  'Pontos Turísticos': {
    title: 'Pontos Turísticos',
    providers: [
      { name: 'Igreja de Nossa Senhora do Carmo', rating: 4.9, city: 'Olinda',            description: 'Patrimônio histórico do século XVIII no centro histórico de Olinda', image: IMG_REC, isPublic: true },
      { name: 'Recife Antigo',                    rating: 4.8, city: 'Recife',            description: 'Bairro histórico com arquitetura colonial e museus',                image: IMG_REC, isPublic: true },
      { name: 'Dunas de Porto de Galinhas',        rating: 4.7, city: 'Porto de Galinhas', description: 'Paisagem natural única com dunas e piscinas naturais',             image: IMG_PDG, isPublic: true },
      { name: 'Capelas dos Aflitos',              rating: 4.6, city: 'Recife',            description: 'Uma das capelas mais antigas do Brasil, século XVII',              image: IMG_REC, isPublic: true },
    ],
  },
  Gastronomia: {
    title: 'Gastronomia',
    providers: [
      { name: 'Restaurante Maré Alta', rating: 4.7, city: 'Porto de Galinhas', description: 'Frutos do mar frescos com vista para o oceano',               image: IMG_PDG },
      { name: 'Boteco do Nordeste',    rating: 4.6, city: 'Olinda',            description: 'Culinária regional autêntica e ambiente descontraído',        image: IMG_REC },
      { name: 'Sabor da Orla',         rating: 4.8, city: 'Carneiros',         description: 'Peixes e mariscos preparados com receitas tradicionais',     image: IMG_CAR },
    ],
  },
  Atividades: {
    title: 'Atividades',
    providers: [
      { name: 'Passeios de Jangada',   rating: 4.9, city: 'Porto de Galinhas', description: 'Tour pelas piscinas naturais em jangadas tradicionais',      image: IMG_PDG },
      { name: 'Mergulho nos Corais',   rating: 5,   city: 'Tamandaré',         description: 'Experiência de mergulho em recifes de corais',              image: IMG_TAM },
      { name: 'Stand-up Paddle',       rating: 4.7, city: 'Carneiros',         description: 'Aluguel de pranchas nas águas calmas de Carneiros',         image: IMG_CAR },
      { name: 'Carnaval de Olinda',    rating: 4.9, city: 'Olinda',            description: 'O maior carnaval de rua do mundo, patrimônio imaterial',    image: IMG_REC },
    ],
  },
  Transporte: {
    title: 'Transporte',
    providers: [
      { name: 'Transfer Litoral PE',        rating: 4.8, city: 'Recife',            description: 'Transporte executivo do aeroporto para as praias', image: IMG_REC },
      { name: 'Aluguel de Buggy Adventure', rating: 4.6, city: 'Porto de Galinhas', description: 'Aluguel de buggys para explorar as praias',        image: IMG_PDG },
      { name: 'Táxi Aquático Carneiros',    rating: 4.9, city: 'Carneiros',         description: 'Travessia de lancha entre praias e ilhas',          image: IMG_CAR },
    ],
  },
}

const services = [
  {
    icon: <FaLandmark size={36} color="#0ea5e9" />,
    title: 'Pontos Turísticos',
    description: 'Lugares históricos e atrações imperdíveis do litoral',
  },
  {
    icon: <FaUtensils size={36} color="#0ea5e9" />,
    title: 'Gastronomia',
    description: 'Restaurantes e bares com sabor local',
  },
  {
    icon: <FaUmbrellaBeach size={36} color="#0ea5e9" />,
    title: 'Atividades',
    description: 'Experiências únicas e aventuras pelo litoral pernambucano',
  },
  {
    icon: <FaCar size={36} color="#0ea5e9" />,
    title: 'Transporte',
    description: 'Mobilidade fácil entre praias e cidades',
  },
]

const destinations = [
  {
    name: 'Porto de Galinhas',
    count: '120+ serviços',
    image: 'https://images.unsplash.com/photo-1641231767593-1184d3f32890?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=600',
  },
  {
    name: 'Recife & Olinda',
    count: '250+ serviços',
    image: 'https://images.unsplash.com/photo-1583214582490-1485cb37b04b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=600',
  },
  {
    name: 'Tamandaré',
    count: '80+ serviços',
    image: 'https://images.unsplash.com/photo-1713112874630-4325e65570a7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=600',
  },
  {
    name: 'Carneiros',
    count: '65+ serviços',
    image: 'https://images.unsplash.com/photo-1583214576557-ad0da1b440b1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=600',
  },
]

const destinationData: Record<string, Destination> = {
  'Porto de Galinhas': {
    name: 'Porto de Galinhas',
    heroImage: 'https://images.unsplash.com/photo-1641231767593-1184d3f32890?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800',
    providers: [
      { name: 'Pousada Brisa do Mar',       category: 'Atividades',        rating: 4.8, city: 'Porto de Galinhas', description: 'Pousada charmosa à beira-mar com vista privilegiada',          image: IMG_PDG },
      { name: 'Restaurante Maré Alta',       category: 'Gastronomia',       rating: 4.7, city: 'Porto de Galinhas', description: 'Frutos do mar frescos com vista para o oceano',                  image: IMG_PDG },
      { name: 'Passeios de Jangada',         category: 'Atividades',        rating: 4.9, city: 'Porto de Galinhas', description: 'Tour pelas piscinas naturais em jangadas tradicionais',           image: IMG_PDG },
      { name: 'Aluguel de Buggy Adventure',  category: 'Transporte',        rating: 4.6, city: 'Porto de Galinhas', description: 'Aluguel de buggys para explorar as praias',                     image: IMG_PDG },
      { name: 'Dunas de Porto de Galinhas',  category: 'Pontos Turísticos', rating: 4.7, city: 'Porto de Galinhas', description: 'Paisagem natural única com dunas e piscinas naturais',           image: IMG_PDG },
    ],
  },
  'Recife & Olinda': {
    name: 'Recife & Olinda',
    heroImage: 'https://images.unsplash.com/photo-1583214582490-1485cb37b04b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800',
    providers: [
      { name: 'Hotel Recife Palace',       category: 'Pontos Turísticos', rating: 4.5, city: 'Recife',  description: 'Hotel no centro histórico de Recife',                          image: IMG_REC },
      { name: 'Boteco do Nordeste',         category: 'Gastronomia',       rating: 4.6, city: 'Olinda',  description: 'Culinária regional autêntica e ambiente descontraído',         image: IMG_REC },
      { name: 'City Tour Recife Antigo',    category: 'Atividades',        rating: 4.7, city: 'Recife',  description: 'Conheça a história e cultura do Recife histórico',             image: IMG_REC },
      { name: 'Transfer Litoral PE',        category: 'Transporte',        rating: 4.8, city: 'Recife',  description: 'Transporte executivo do aeroporto para as praias',            image: IMG_REC },
      { name: 'Recife Antigo',              category: 'Pontos Turísticos', rating: 4.8, city: 'Recife',  description: 'Bairro histórico com arquitetura colonial e museus',           image: IMG_REC },
    ],
  },
  'Tamandaré': {
    name: 'Tamandaré',
    heroImage: 'https://images.unsplash.com/photo-1713112874630-4325e65570a7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800',
    providers: [
      { name: 'Pousada Paraíso Tropical',  category: 'Pontos Turísticos', rating: 4.9, city: 'Tamandaré', description: 'Refúgio tranquilo com piscina e jardim tropical',              image: IMG_TAM },
      { name: 'Mergulho nos Corais',        category: 'Atividades',        rating: 5,   city: 'Tamandaré', description: 'Experiência de mergulho em recifes de corais',                image: IMG_TAM },
    ],
  },
  'Carneiros': {
    name: 'Carneiros',
    heroImage: 'https://images.unsplash.com/photo-1583214576557-ad0da1b440b1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800',
    providers: [
      { name: 'Sabor da Orla',             category: 'Gastronomia',       rating: 4.8, city: 'Carneiros', description: 'Peixes e mariscos preparados com receitas tradicionais',        image: IMG_CAR },
      { name: 'Táxi Aquático Carneiros',    category: 'Transporte',        rating: 4.9, city: 'Carneiros', description: 'Travessia de lancha entre praias e ilhas',                     image: IMG_CAR },
    ],
  },
}

function Home() {
  const [activeService, setActiveService] = useState<string | null>(null)
  const [cadastroOpen, setCadastroOpen] = useState(false)
  const [activeDestination, setActiveDestination] = useState<string | null>(null)
  const [contatoOpen, setContatoOpen] = useState(false)
  const [enquirySubject, setEnquirySubject] = useState('')
  const [enquiryMessage, setEnquiryMessage] = useState('')

  function handleEnquiry(providerName: string, category: string) {
    setEnquirySubject(`Interesse em: ${providerName} (${category})`)
    setEnquiryMessage(`Olá! Tenho interesse em saber mais sobre "${providerName}". Poderia me enviar mais informações?`)
    setActiveService(null)
    setContatoOpen(true)
  }

  return (
    <>
      {/* ── Hero ── */}
      <section className="oc-hero">
        <div className="oc-hero-content">
          <div className="oc-hero-brand">
            <span className="oc-hero-wave">≋</span>
            <h1>Orla Conecta</h1>
          </div>
          <p className="oc-hero-subtitle">
            Conectando turistas aos melhores serviços locais<br />
            do litoral pernambucano
          </p>
          <div className="oc-hero-buttons">
            <a href="#servicos" className="oc-hero-btn-primary">
              <MdSearch size={18} />
              Explorar Serviços
              <span className="oc-arrow">→</span>
            </a>
            <button className="oc-hero-btn-secondary" onClick={() => setCadastroOpen(true)}>Sou um Prestador</button>
          </div>
        </div>
      </section>

      {/* ── Services ── */}
      <section id="servicos" className="oc-services">
        <div className="oc-container">
          <div className="oc-section-header">
            <h2>Explore Serviços Locais</h2>
            <p>Descubra experiências autênticas e conecte-se com quem conhece cada canto do litoral</p>
          </div>
          <div className="oc-services-grid">
            {services.map((s) => (
              <div
                className="oc-service-card"
                key={s.title}
                onClick={() => setActiveService(s.title)}
                role="button"
                tabIndex={0}
                onKeyDown={e => e.key === 'Enter' && setActiveService(s.title)}
              >
                <div className="oc-service-icon-wrap">{s.icon}</div>
                <div className="oc-service-body">
                  <h3>{s.title}</h3>
                  <p>{s.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Destinations ── */}
      <section id="destinos" className="oc-destinations">
        <div className="oc-container">
          <div className="oc-section-header">
            <h2>Destinos Populares</h2>
            <p>Do agito urbano às praias paradisíacas</p>
          </div>
          <div className="oc-destinations-grid">
            {destinations.map((d) => (
              <div
                className="oc-dest-card"
                key={d.name}
                onClick={() => setActiveDestination(d.name)}
                role="button"
                tabIndex={0}
                onKeyDown={e => e.key === 'Enter' && setActiveDestination(d.name)}
              >
                <img src={d.image} alt={d.name} className="oc-dest-img" />
                <div className="oc-dest-overlay">
                  <div className="oc-dest-count">
                    <FaMapMarkerAlt size={11} />
                    <span>{d.count}</span>
                  </div>
                  <h3>{d.name}</h3>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="oc-cta">
        <div className="oc-cta-content">
          <h2>Você tem um negócio no litoral?</h2>
          <p>Conecte-se com milhares de turistas que buscam experiências autênticas</p>
          <div className="oc-cta-buttons">
            <button className="oc-cta-btn-primary" onClick={() => setCadastroOpen(true)}>Cadastrar Meu Negócio</button>
            <button className="oc-cta-btn-secondary" onClick={() => setContatoOpen(true)}>Saiba Mais</button>
          </div>
        </div>
      </section>

      <ServiceModal
        service={activeService ? serviceData[activeService] : null}
        onClose={() => setActiveService(null)}
        onEnquiry={handleEnquiry}
      />
      <CadastroNegocioModal
        open={cadastroOpen}
        onClose={() => setCadastroOpen(false)}
      />
      <DestinationModal
        destination={activeDestination ? destinationData[activeDestination] : null}
        onClose={() => setActiveDestination(null)}
      />
      <ContatoModal
        open={contatoOpen}
        onClose={() => { setContatoOpen(false); setEnquirySubject(''); setEnquiryMessage('') }}
        prefillSubject={enquirySubject}
        prefillMessage={enquiryMessage}
      />
    </>
  )
}

export default Home