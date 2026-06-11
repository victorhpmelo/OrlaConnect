import { useEffect, useState } from 'react'
import { FaTimes, FaStar, FaMapMarkerAlt, FaHeart, FaRegHeart, FaCheck, FaEnvelope, FaPlus, FaMap } from 'react-icons/fa'
import {
  TrackedPlace, placeId,
  isFavorite, toggleFavorite,
  isVisited, toggleVisited,
  isInItinerary, addToItinerary, removeFromItinerary,
} from '../../services/trackingService'
import MapModal from '../MapModal/MapModal'
import './ServiceModal.css'

export interface Provider {
  name: string
  rating: number
  city: string
  description: string
  image: string
  category?: string
  isPublic?: boolean
}

export interface ServiceCategory {
  title: string
  providers: Provider[]
}

interface Props {
  service: ServiceCategory | null
  onClose: () => void
  onEnquiry: (providerName: string, category: string) => void
}

function toTracked(p: Provider, category: string): TrackedPlace {
  return {
    id: placeId(category, p.name),
    name: p.name,
    category,
    city: p.city,
    description: p.description,
    image: p.image,
    rating: p.rating,
  }
}

function ProviderCard({ p, category, onEnquiry, onShowMap }: {
  p: Provider
  category: string
  onEnquiry: (name: string, cat: string) => void
  onShowMap: (name: string, city: string) => void
}) {
  const place = toTracked(p, category)
  const id = place.id

  // Local state that re-renders when tracking storage changes
  const [fav,   setFav]   = useState(() => isFavorite(id))
  const [vis,   setVis]   = useState(() => isVisited(id))
  const [itin,  setItin]  = useState(() => isInItinerary(id))

  useEffect(() => {
    function sync() {
      setFav(isFavorite(id))
      setVis(isVisited(id))
      setItin(isInItinerary(id))
    }
    window.addEventListener('tracking-changed', sync)
    return () => window.removeEventListener('tracking-changed', sync)
  }, [id])

  function handleFav() { toggleFavorite(place); setFav(isFavorite(id)) }
  function handleVis() { toggleVisited(place);  setVis(isVisited(id)) }
  function handleItin() {
    if (itin) { removeFromItinerary(id); setItin(false) }
    else      { addToItinerary(place);   setItin(true)  }
  }

  return (
    <div className="sm-card">
      <div className="sm-card-top">
        <img src={p.image} alt={p.name} className="sm-thumb" />
        <div className="sm-card-info">
          <h3 className="sm-card-name">{p.name}</h3>
          <div className="sm-card-meta">
            <FaStar size={12} className="sm-star" />
            <span className="sm-rating">{p.rating}</span>
            <FaMapMarkerAlt size={11} className="sm-pin" />
            <span className="sm-city">{p.city}</span>
          </div>
          <p className="sm-card-desc">{p.description}</p>
        </div>
      </div>

      <div className="sm-card-actions">
        <button
          className={`sm-btn sm-btn-icon${fav ? ' sm-active-heart' : ''}`}
          onClick={handleFav}
          title={fav ? 'Remover dos favoritos' : 'Adicionar aos favoritos'}
        >
          {fav ? <FaHeart size={13} /> : <FaRegHeart size={13} />}
          <span>{fav ? 'Favorito' : 'Favoritar'}</span>
        </button>

        <button
          className={`sm-btn sm-btn-icon${vis ? ' sm-active-check' : ''}`}
          onClick={handleVis}
          title={vis ? 'Remover de visitados' : 'Marcar como visitado'}
        >
          <FaCheck size={12} />
          <span>{vis ? 'Visitado' : 'Já visitei'}</span>
        </button>

        <button
          className={`sm-btn sm-btn-icon${itin ? ' sm-active-itin' : ''}`}
          onClick={handleItin}
          title={itin ? 'Remover do roteiro' : 'Adicionar ao roteiro'}
        >
          <FaPlus size={12} />
          <span>{itin ? 'No roteiro' : 'Roteiro'}</span>
        </button>

        <button
          className="sm-btn sm-btn-map"
          onClick={() => onShowMap(p.name, p.city)}
          title="Ver no mapa"
        >
          <FaMap size={12} />
          <span>Como Chegar</span>
        </button>

        {!p.isPublic && (
          <button
            className="sm-btn sm-btn-enquiry"
            onClick={() => onEnquiry(p.name, category)}
          >
            <FaEnvelope size={12} />
            <span>Entrar em Contato</span>
          </button>
        )}
      </div>
    </div>
  )
}

function ServiceModal({ service, onClose, onEnquiry }: Props) {
  const [mapPlace, setMapPlace] = useState<{ name: string; city: string } | null>(null)

  useEffect(() => {
    if (!service) return
    const handler = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose() }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [service, onClose])

  if (!service) return null

  return (
    <>
      <div className="sm-backdrop" onClick={onClose}>
        <div className="sm-modal" onClick={e => e.stopPropagation()} role="dialog" aria-modal="true" aria-label={service.title}>
          <div className="sm-header">
            <div>
              <h2 className="sm-title">{service.title}</h2>
              <p className="sm-subtitle">{service.providers.length} lugares disponíveis</p>
            </div>
            <button className="sm-close" onClick={onClose} aria-label="Fechar">
              <FaTimes size={16} />
            </button>
          </div>

          <div className="sm-list">
            {service.providers.map((p) => (
              <ProviderCard
                key={p.name}
                p={p}
                category={service.title}
                onEnquiry={onEnquiry}
                onShowMap={(name, city) => setMapPlace({ name, city })}
              />
            ))}
          </div>
        </div>
      </div>

      <MapModal
        placeName={mapPlace?.name ?? null}
        city={mapPlace?.city}
        onClose={() => setMapPlace(null)}
      />
    </>
  )
}

export default ServiceModal
