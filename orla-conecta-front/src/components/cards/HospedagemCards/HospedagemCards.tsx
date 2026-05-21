import 'bootstrap/dist/css/bootstrap.min.css'
import { Link } from 'react-router-dom'

const hospedagens = [
  {
    titulo: 'Praia dos Carneiros - PE',
    imagem: '/img/hotelmar.jpg',
    preco: 'R$ 320',
  },
  {
    titulo: 'Maragogi - AL',
    imagem: '/img/praia2.jpg',
    preco: 'R$ 280',
  },
  {
    titulo: 'Jericoacoara - CE',
    imagem: '/img/hotelmar.jpg',
    preco: 'R$ 350',
  },
  {
    titulo: 'Porto de Galinhas - PE',
    imagem: '/img/vistahotel.jpg',
    preco: 'R$ 300',
  },
  {
    titulo: 'Pipa - RN',
    imagem: '/img/praia2.jpg',
    preco: 'R$ 270',
  },
  {
    titulo: 'São Miguel do Gostoso - RN',
    imagem: '/img/vistahotel.jpg',
    preco: 'R$ 290',
  },
  {
    titulo: 'Barra Grande - PI',
    imagem: '/img/hotelquarto.jpg',
    preco: 'R$ 260',
  },
  {
    titulo: 'Canoa Quebrada - CE',
    imagem: '/img/hotelmar.jpg',
    preco: 'R$ 240',
  },
  {
    titulo: 'Praia do Forte - BA',
    imagem: '/img/praia2.jpg',
    preco: 'R$ 310',
  },
]

function HospedagemCards() {
  return (
    <>
      <h2 className="text-center mb-4">Ofertas de hotel imperdíveis</h2>

      <section className="container py-5">
        <div className="row">
          {hospedagens.map((item, index) => (
            <div className="col-md-4 mb-4" key={index}>
              <div className="card h-100 shadow-sm">
                <img src={item.imagem} className="card-img-top" alt={item.titulo} />
                <div className="card-body">
                  <h5 className="card-title">{item.titulo}</h5>
                  <p className="card-text">1 noite, valor por pessoa</p>
                  <h2 className="text-primary">{item.preco}</h2>
                  <p className="text-muted" style={{ fontSize: '0.9rem' }}>
                    *Taxas e impostos não inclusos
                  </p>
                  <Link to="/details" className="btn btn-success w-100">
                    Conferir oferta
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  )
}

export default HospedagemCards
