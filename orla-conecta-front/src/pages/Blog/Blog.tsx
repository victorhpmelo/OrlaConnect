import './Blog.css'

const posts = [
  {
    tag: 'Destinos',
    date: '10 de Abril, 2026',
    title: '10 Praias Imperdíveis no Litoral de Pernambuco',
    excerpt: 'Descubra os destinos mais paradisíacos do nosso litoral, desde Porto de Galinhas até Carneiros.',
    img: 'https://images.unsplash.com/photo-1641231767593-1184d3f32890?w=800&h=500&fit=crop',
  },
  {
    tag: 'Gastronomia',
    date: '5 de Abril, 2026',
    title: 'Gastronomia Pernambucana: Um Guia Completo',
    excerpt: 'Conheça os pratos típicos e os melhores restaurantes para experimentar a culinária local.',
    img: 'https://images.unsplash.com/photo-1583214576557-ad0da1b440b1?w=800&h=500&fit=crop',
  },
  {
    tag: 'Dicas de Viagem',
    date: '1 de Abril, 2026',
    title: 'Como Planejar Sua Viagem para Porto de Galinhas',
    excerpt: 'Dicas essenciais para aproveitar ao máximo sua estadia em um dos destinos mais procurados.',
    img: 'https://images.unsplash.com/photo-1583214582490-1485cb37b04b?w=800&h=500&fit=crop',
  },
  {
    tag: 'Passeios',
    date: '28 de Março, 2026',
    title: 'Passeios de Jangada: Uma Experiência Única',
    excerpt: 'Tudo sobre os passeios tradicionais de jangada pelas piscinas naturais do litoral.',
    img: 'https://images.unsplash.com/photo-1713112874630-4325e65570a7?w=800&h=500&fit=crop',
  },
  {
    tag: 'Cultura',
    date: '25 de Março, 2026',
    title: 'Recife e Olinda: História e Cultura',
    excerpt: 'Explore o patrimônio histórico e cultural das cidades mais charmosas de Pernambuco.',
    img: 'https://images.unsplash.com/photo-1724372658025-c65ab9d79ccc?w=800&h=500&fit=crop',
  },
  {
    tag: 'Dicas de Viagem',
    date: '20 de Março, 2026',
    title: 'Melhor Época para Visitar o Litoral de Pernambuco',
    excerpt: 'Saiba qual é a melhor temporada para aproveitar as praias e evitar multidões.',
    img: 'https://images.unsplash.com/photo-1641231767593-1184d3f32890?w=800&h=500&fit=crop',
  },
]

function Blog() {
  return (
    <div className="bl-page">
      {/* Hero */}
      <section className="bl-hero">
        <p className="bl-hero-tag">Blog</p>
        <h1>Blog Orla Conecta</h1>
        <p className="bl-hero-sub">
          Dicas, guias e histórias sobre o litoral pernambucano
        </p>
      </section>

      {/* Posts grid */}
      <section className="bl-section">
        <div className="bl-container">
          <div className="bl-grid">
            {posts.map(post => (
              <article key={post.title} className="bl-card">
                <div className="bl-card-img-wrap">
                  <img src={post.img} alt={post.title} className="bl-card-img" />
                </div>
                <div className="bl-card-body">
                  <div className="bl-card-meta">
                    <span className="bl-tag">{post.tag}</span>
                    <span className="bl-date">{post.date}</span>
                  </div>
                  <h3 className="bl-card-title">{post.title}</h3>
                  <p className="bl-card-excerpt">{post.excerpt}</p>
                  <button className="bl-read-more">Ler mais</button>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bl-cta">
        <div className="bl-container">
          <h2>Quer Contribuir com o Blog?</h2>
          <p>Compartilhe suas experiências e dicas sobre o litoral pernambucano</p>
          <a href="mailto:blog@orlaconecta.com" className="bl-cta-btn">
            Entre em Contato
          </a>
        </div>
      </section>
    </div>
  )
}

export default Blog
