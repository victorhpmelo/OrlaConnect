import { Link } from 'react-router-dom'
import './Footer.css'

function Footer() {
  return (
    <footer className="oc-footer" id="contato">
      <div className="oc-footer-inner">

        <div className="oc-footer-brand">
          <div className="oc-footer-logo">
            <span className="oc-footer-wave">≋</span>
            <span>Orla Conecta</span>
          </div>
          <p>Conectando turistas e serviços locais no litoral de Pernambuco</p>
        </div>

        <div className="oc-footer-col">
          <h3>Serviços</h3>
          <ul>
            <li><a href="#servicos">Hospedagem</a></li>
            <li><a href="#servicos">Gastronomia</a></li>
            <li><a href="#servicos">Passeios</a></li>
            <li><a href="#servicos">Transporte</a></li>
          </ul>
        </div>

        <div className="oc-footer-col">
          <h3>Destinos</h3>
          <ul>
            <li><a href="#destinos">Porto de Galinhas</a></li>
            <li><a href="#destinos">Recife &amp; Olinda</a></li>
            <li><a href="#destinos">Tamandaré</a></li>
            <li><a href="#destinos">Carneiros</a></li>
          </ul>
        </div>

        <div className="oc-footer-col">
          <h3>Contato</h3>
          <ul>
            <li><Link to="/sobre-nos">Sobre Nós</Link></li>
            <li><Link to="/para-empresas">Para Empresas</Link></li>
            <li><Link to="/suporte">Suporte</Link></li>
            <li><Link to="/blog">Blog</Link></li>
          </ul>
        </div>

      </div>
      <div className="oc-footer-bottom">
        <p>© 2026 Orla Conecta. Todos os direitos reservados.</p>
      </div>
    </footer>
  )
}

export default Footer
