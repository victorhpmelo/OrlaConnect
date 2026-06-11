import { useState } from 'react'
import { FaEnvelope, FaPhone, FaChevronDown } from 'react-icons/fa'
import ContatoModal from '../../components/ContatoModal/ContatoModal'
import './Suporte.css'

const faqs = [
  {
    q: 'Como faço para cadastrar meu negócio?',
    a: 'Clique no botão "Cadastrar Negócio" no header ou na página inicial, preencha o formulário com as informações do seu estabelecimento e envie. Nossa equipe irá revisar e aprovar seu cadastro em até 24 horas.',
  },
  {
    q: 'O serviço é gratuito?',
    a: 'Sim! O cadastro básico na plataforma é totalmente gratuito. Você pode aparecer nas buscas e receber contatos de turistas sem nenhum custo.',
  },
  {
    q: 'Como os turistas podem me encontrar?',
    a: 'Seu negócio será listado nas categorias relevantes (hospedagem, gastronomia, passeios ou transporte) e aparecerá nos resultados de busca dos turistas que procuram serviços na sua região.',
  },
  {
    q: 'Posso editar as informações do meu negócio depois?',
    a: 'Sim. Após a aprovação do cadastro, você terá acesso a um painel onde poderá atualizar fotos, descrição, contatos e outras informações a qualquer momento.',
  },
  {
    q: 'Como funciona o sistema de reservas?',
    a: 'Os turistas podem entrar em contato diretamente com o seu negócio pelo telefone ou e-mail cadastrado. O sistema de reservas online está em desenvolvimento e em breve será disponibilizado.',
  },
  {
    q: 'Vocês cobram comissão pelas reservas?',
    a: 'Não cobramos comissão. O contato entre turistas e prestadores é direto, sem intermediação financeira da plataforma.',
  },
]

function Suporte() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)
  const [contatoOpen, setContatoOpen] = useState(false)

  return (
    <div className="sp-page">
      {/* Hero */}
      <section className="sp-hero">
        <p className="sp-hero-tag">Ajuda</p>
        <h1>Central de Suporte</h1>
        <p className="sp-hero-sub">
          Estamos aqui para ajudar você. Encontre respostas rápidas ou entre em contato conosco
        </p>
      </section>

      {/* Fale Conosco */}
      <section className="sp-section">
        <div className="sp-container">
          <div className="sp-section-header">
            <h2>Fale Conosco</h2>
            <p>Escolha a melhor forma de entrar em contato</p>
          </div>
          <div className="sp-contact-grid">
            <a href="mailto:contato@orlaconecta.com" className="sp-contact-card">
              <div className="sp-contact-icon"><FaEnvelope size={22} /></div>
              <h3>Email</h3>
              <p>contato@orlaconecta.com</p>
            </a>
            <a href="tel:+5581999999999" className="sp-contact-card">
              <div className="sp-contact-icon"><FaPhone size={22} /></div>
              <h3>Telefone</h3>
              <p>(81) 99999-9999</p>
            </a>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="sp-section sp-section-gray">
        <div className="sp-container">
          <div className="sp-section-header">
            <h2>Perguntas Frequentes</h2>
          </div>
          <div className="sp-faq-list">
            {faqs.map((faq, i) => (
              <div key={i} className={`sp-faq-item${openIndex === i ? ' open' : ''}`}>
                <button
                  className="sp-faq-question"
                  onClick={() => setOpenIndex(openIndex === i ? null : i)}
                  aria-expanded={openIndex === i}
                >
                  <span>{faq.q}</span>
                  <FaChevronDown size={13} className="sp-faq-chevron" />
                </button>
                {openIndex === i && (
                  <div className="sp-faq-answer">{faq.a}</div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="sp-cta">
        <div className="sp-container">
          <h2>Não Encontrou o Que Procurava?</h2>
          <p>Nossa equipe está pronta para ajudar você</p>
          <button className="sp-cta-btn" onClick={() => setContatoOpen(true)}>
            Entrar em Contato
          </button>
        </div>
      </section>

      <ContatoModal open={contatoOpen} onClose={() => setContatoOpen(false)} />
    </div>
  )
}

export default Suporte
