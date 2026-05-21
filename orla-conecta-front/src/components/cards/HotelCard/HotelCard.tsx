import { Carousel } from 'react-bootstrap'

interface HotelInfo {
  title: string
  description: string
  price: string
  images: string[]
  button: string
}

const hotels: HotelInfo[] = [
  {
    title: 'Café & Vista',
    description: 'Comece o dia com um café incrível e vista para o mar.',
    price: 'R$ 320',
    images: ['/img/coffemanha.jpg', '/img/hotelmar.jpg'],
    button: 'Conferir oferta',
  },
  {
    title: 'Quarto com conforto',
    description: 'Relaxe em um quarto planejado para seu descanso.',
    price: 'R$ 280',
    images: ['/img/hotelquarto.jpg'],
    button: 'Ver detalhes',
  },
  {
    title: 'Natureza & Luxo',
    description: 'Vista deslumbrante aliada a uma experiência sofisticada.',
    price: 'R$ 350',
    images: ['/img/hotelvista.jpg', '/img/hotelluxo.jpg'],
    button: 'Reservar agora',
  },
  {
    title: 'Diversão em família',
    description: 'Hospedagem perfeita para crianças e diversão.',
    price: 'R$ 400',
    images: ['/img/hotelkids.jpg'],
    button: 'Ver oferta',
  },
  {
    title: 'Refresco & Piscina',
    description: 'Relaxe em uma piscina rodeada de tranquilidade.',
    price: 'R$ 300',
    images: ['/img/hotelpiscina.jpg'],
    button: 'Saiba mais',
  },
  {
    title: 'Praia exclusiva',
    description: 'Acorde com o som das ondas em um lugar paradisíaco.',
    price: 'R$ 420',
    images: ['/img/hotelmar.jpg'],
    button: 'Ver experiência',
  },
]

function HotelCard({ title, description, price, images, button }: HotelInfo) {
  return (
    <div
      className="card mb-5"
      style={{
        width: '90%',
        maxWidth: '1400px',
        height: '300px',
        borderRadius: '1rem',
        overflow: 'hidden',
        marginLeft: 'auto',
      }}
    >
      <div className="row g-0 h-100">
        <div className="col-md-6">
          <Carousel>
            {images.map((img, idx) => (
              <Carousel.Item key={idx}>
                <img
                  src={img}
                  alt="Imagem hotel"
                  className="d-block w-100 h-100"
                  style={{
                    objectFit: 'cover',
                    borderRadius: '1rem 0 0 1rem',
                    height: '300px',
                  }}
                />
              </Carousel.Item>
            ))}
          </Carousel>
        </div>
        <div className="col-md-6 p-4 d-flex flex-column justify-content-between h-100">
          <div>
            <h4 className="fw-bold">{title}</h4>
            <p>{description}</p>
          </div>
          <div>
            <h5 className="text-primary">{price}</h5>
            <button className="btn btn-success w-100">{button}</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function HotelCardsPage() {
  return (
    <div className="container py-5 d-flex flex-column align-items-end">
      {hotels.map((hotel, index) => (
        <HotelCard key={index} {...hotel} />
      ))}
    </div>
  )
}
