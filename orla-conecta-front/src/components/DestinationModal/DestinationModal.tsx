import { useEffect } from 'react'
import { FaTimes, FaStar, FaMapMarkerAlt, FaEnvelope, FaExternalLinkAlt, FaMap } from 'react-icons/fa'
import './DestinationModal.css'

export interface DestinationProvider {
  name: string
  category: string
  rating: number
  city: string
  description: string
  image: string
}

export interface Destination {
  name: string
  heroImage: string
  providers: DestinationProvider[]
}

interface Props {
  destination: Destination | null
  onClose: () => void
}

function DestinationModal({ destination, onClose }: Props) {
  useEffect(() => {
    if (!destination) return
    const handler = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose() }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [destination, onClose])

  if (!destination) return null

  // Group providers by category
  const grouped = destination.providers.reduce<Record<string, DestinationProvider[]>>((acc, p) => {
    if (!acc[p.category]) acc[p.category] = []
    acc[p.category].push(p)
    return acc
  }, {})

  const categoryOrder = ['Hospedagem', 'Gastronomia', 'Passeios', 'Transporte']
  const sortedCategories = Object.keys(grouped).sort(
    (a, b) => categoryOrder.indexOf(a) - categoryOrder.indexOf(b)
  )

  return (
    <div className="dm-backdrop" onClick={onClose}>
      <div className="dm-modal" onClick={e => e.stopPropagation()} role="dialog" aria-modal="true" aria-label={destination.name}>
        {/* Hero banner */}
        <div className="dm-hero">
          <img src={destination.heroImage} alt={destination.name} className="dm-hero-img" />
          <div className="dm-hero-overlay">
            <div className="dm-hero-text">
              <div className="dm-hero-icon">
                <FaMap size={16} />
              </div>
              <h2 className="dm-hero-title">{destination.name}</h2>
              <p className="dm-hero-count">{destination.providers.length} serviços disponíveis</p>
            </div>
          </div>
          <button className="dm-close" onClick={onClose} aria-label="Fechar">
            <FaTimes size={16} />
          </button>
        </div>

        {/* Provider list grouped by category */}
        <div className="dm-list">
          {sortedCategories.map(cat => (
            <div key={cat} className="dm-category-group">
              <div className="dm-category-tag">{cat}</div>
              {grouped[cat].map(p => (
                <div className="dm-card" key={p.name}>
                  <div className="dm-card-top">
                    <img src={p.image} alt={p.name} className="dm-thumb" />
                    <div className="dm-card-info">
                      <h3 className="dm-card-name">{p.name}</h3>
                      <div className="dm-card-meta">
                        <FaStar size={12} className="dm-star" />
                        <span className="dm-rating">{p.rating}</span>
                        <FaMapMarkerAlt size={11} className="dm-pin" />
                        <span className="dm-city">{p.city}</span>
                      </div>
                      <p className="dm-card-desc">{p.description}</p>
                    </div>
                  </div>
                  <div className="dm-card-actions">
                    <button className="dm-btn">
                      <FaEnvelope size={13} />
                      Email
                    </button>
                    <button className="dm-btn">
                      <FaExternalLinkAlt size={12} />
                      Detalhes
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default DestinationModal
