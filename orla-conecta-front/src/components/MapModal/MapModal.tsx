import { useEffect } from 'react'
import { FaTimes, FaExternalLinkAlt } from 'react-icons/fa'
import { getEmbedUrl, openMap } from '../../services/mapService'
import './MapModal.css'

interface Props {
  placeName: string | null
  city?: string
  onClose: () => void
}

function MapModal({ placeName, city, onClose }: Props) {
  const address = [placeName, city, 'Pernambuco, Brasil'].filter(Boolean).join(', ')

  useEffect(() => {
    if (!placeName) return
    const handler = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose() }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [placeName, onClose])

  if (!placeName) return null

  return (
    <div className="mm-backdrop" onClick={onClose}>
      <div className="mm-modal" onClick={e => e.stopPropagation()} role="dialog" aria-modal="true" aria-label={`Como chegar em ${placeName}`}>
        <div className="mm-header">
          <div className="mm-header-text">
            <span className="mm-label">Como Chegar</span>
            <h2 className="mm-title">{placeName}</h2>
            {city && <p className="mm-sub">{city}, Pernambuco</p>}
          </div>
          <div className="mm-header-actions">
            <button
              className="mm-open-btn"
              onClick={() => openMap(address)}
              title="Abrir no Google Maps"
            >
              <FaExternalLinkAlt size={12} />
              <span>Abrir no Maps</span>
            </button>
            <button className="mm-close" onClick={onClose} aria-label="Fechar">
              <FaTimes size={16} />
            </button>
          </div>
        </div>

        <div className="mm-map-wrap">
          <iframe
            className="mm-iframe"
            src={getEmbedUrl(address)}
            title={`Mapa de ${placeName}`}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
      </div>
    </div>
  )
}

export default MapModal
