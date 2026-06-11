import { useState, useEffect, useCallback } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { FaMapMarkerAlt, FaTrash, FaCalendarAlt, FaUser, FaSignOutAlt, FaStar } from 'react-icons/fa'
import { getCurrentUser, logout } from '../../services/authService'
import { createHotelReview } from '../../services/ratingService'
import StarRating from '../../components/StarRating/StarRating'
import api from '../../services/api'
import './MinhasReservas.css'

// ─── Types ──────────────────────────────────────────────────────────────────

type ReserveStatus = 'Confirmada' | 'Pendente' | 'Cancelada'

interface Reservation {
  reserveId: number
  hotelId: number | null
  hotelName: string
  hotelCity: string
  hotelImage: string | null
  checkInDate: string
  checkOutDate: string
  numberOfPeople: number
  totalPrice: number
  status: ReserveStatus
}

// ─── Helpers ─────────────────────────────────────────────────────────────────

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString('pt-BR', { day: '2-digit', month: 'long', year: 'numeric' })
}

function formatCurrency(value: number) {
  return `R$ ${value.toFixed(2).replace('.', ',')}`
}

const STATUS_LABELS: Record<string, ReserveStatus> = {
  CONFIRMED: 'Confirmada',
  PENDING: 'Pendente',
  CANCELLED: 'Cancelada',
}

// Fallback images per city for demo
const CITY_IMAGES: Record<string, string> = {
  'Porto de Galinhas': 'https://images.unsplash.com/photo-1641231767593-1184d3f32890?w=400&h=280&fit=crop',
  'Recife': 'https://images.unsplash.com/photo-1583214582490-1485cb37b04b?w=400&h=280&fit=crop',
  'Tamandaré': 'https://images.unsplash.com/photo-1713112874630-4325e65570a7?w=400&h=280&fit=crop',
  'Carneiros': 'https://images.unsplash.com/photo-1583214576557-ad0da1b440b1?w=400&h=280&fit=crop',
}
const FALLBACK_IMAGE = 'https://images.unsplash.com/photo-1641231767593-1184d3f32890?w=400&h=280&fit=crop'

// ─── Rating modal ─────────────────────────────────────────────────────────────

interface RatingModalProps {
  reservation: Reservation
  userId: number
  onClose: () => void
}

function RatingModal({ reservation, userId, onClose }: RatingModalProps) {
  const [rating, setRating] = useState(0)
  const [comment, setComment] = useState('')
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState<string | null>(null)

  async function handleSubmit() {
    if (!rating) { setError('Selecione uma nota.'); return }
    if (!reservation.hotelId) { setError('Reserva sem hotel associado.'); return }
    setError(null)
    setLoading(true)
    try {
      await createHotelReview(reservation.hotelId, { userId, rating, comment: comment || undefined })
      setSuccess(true)
    } catch {
      setError('Erro ao enviar avaliação. Tente novamente.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="mr-overlay" onClick={onClose}>
      <div className="mr-rating-modal" onClick={e => e.stopPropagation()}>
        <div className="mr-rating-header">
          <h3>Avaliar Reserva</h3>
          <button className="mr-modal-close" onClick={onClose} aria-label="Fechar">×</button>
        </div>
        <p className="mr-rating-hotel">{reservation.hotelName}</p>

        {success ? (
          <div className="mr-rating-success">
            <FaStar size={32} color="#f59e0b" />
            <p>Avaliação enviada com sucesso!</p>
            <button className="mr-btn-outline" onClick={onClose}>Fechar</button>
          </div>
        ) : (
          <>
            <div className="mr-rating-stars">
              <StarRating value={rating} onChange={setRating} size={32} />
            </div>
            <textarea
              className="mr-rating-comment"
              placeholder="Escreva um comentário (opcional)..."
              value={comment}
              onChange={e => setComment(e.target.value)}
              rows={3}
            />
            {error && <p className="mr-rating-error">{error}</p>}
            <div className="mr-rating-actions">
              <button className="mr-btn-outline" onClick={onClose}>Cancelar</button>
              <button className="mr-btn-primary" onClick={handleSubmit} disabled={loading}>
                {loading ? 'Enviando...' : 'Enviar Avaliação'}
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  )
}

// ─── Main Component ───────────────────────────────────────────────────────────

export default function MinhasReservas() {
  const navigate = useNavigate()
  const user = getCurrentUser()

  const [reservations, setReservations] = useState<Reservation[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [ratingTarget, setRatingTarget] = useState<Reservation | null>(null)

  useEffect(() => {
    if (!user) { navigate('/login'); return }
    fetchReservations()
  }, [])

  const fetchReservations = useCallback(async () => {
    setLoading(true)
    setError(null)
    try {
      // Get userId from localStorage token (stored during login)
      const stored = localStorage.getItem('user')
      if (!stored) throw new Error('Not authenticated')

      // Fetch all hotels to resolve names/cities from hotelId
      const hotelsRes = await api.get('/hotel')
      const hotels: Array<{ hotelId: number; name: string; city: string; medias?: Array<{ url: string }> }> =
        hotelsRes.data?.data ?? hotelsRes.data ?? []
      const hotelMap = new Map(hotels.map(h => [h.hotelId, h]))

      // Fetch user reservations — we need userId from the JWT or profile
      // For now, fetch all and filter to the current user if the API returns them
      const res = await api.get('/reserves')
      const raw: Array<{
        reserveId: number; userId: number; hotelId: number | null
        checkInDate: string; checkOutDate: string; totalPrice: number
        numberOfPeople: number; status: string
      }> = res.data?.data ?? res.data ?? []

      const mapped: Reservation[] = raw.map(r => {
        const hotel = r.hotelId ? hotelMap.get(r.hotelId) : null
        const city = hotel?.city ?? ''
        const image = hotel?.medias?.[0]?.url ?? CITY_IMAGES[city] ?? FALLBACK_IMAGE
        return {
          reserveId: r.reserveId,
          hotelId: r.hotelId,
          hotelName: hotel?.name ?? 'Reserva #' + r.reserveId,
          hotelCity: city,
          hotelImage: image,
          checkInDate: r.checkInDate,
          checkOutDate: r.checkOutDate,
          numberOfPeople: r.numberOfPeople,
          totalPrice: r.totalPrice,
          status: STATUS_LABELS[r.status?.toUpperCase()] ?? 'Pendente',
        }
      })

      setReservations(mapped)
    } catch {
      setError('Não foi possível carregar as reservas.')
    } finally {
      setLoading(false)
    }
  }, [])

  function handleLogout() {
    logout()
    navigate('/')
  }

  async function handleCancel(id: number) {
    if (!confirm('Confirmar cancelamento da reserva?')) return
    try {
      await api.delete(`/reserves/${id}`)
      setReservations(prev => prev.map(r => r.reserveId === id ? { ...r, status: 'Cancelada' } : r))
    } catch {
      alert('Erro ao cancelar reserva.')
    }
  }

  function handleRemove(id: number) {
    setReservations(prev => prev.filter(r => r.reserveId !== id))
  }

  if (!user) return null

  return (
    <div className="mr-page">
      <div className="mr-container">

        {/* Sidebar */}
        <aside className="mr-sidebar">
          <div className="mr-avatar">{getInitials(user.name)}</div>
          <h2 className="mr-sidebar-name">{user.name}</h2>
          <p className="mr-sidebar-email">{user.email}</p>
          <nav className="mr-nav">
            <Link to="/perfil" className="mr-nav-item">
              <FaUser size={14} /><span>Meu Perfil</span>
            </Link>
            <Link to="/minhas-reservas" className="mr-nav-item active">
              <FaCalendarAlt size={14} /><span>Minhas Reservas</span>
            </Link>
          </nav>
          <button className="mr-logout-btn" onClick={handleLogout}>
            <FaSignOutAlt size={14} />Sair da conta
          </button>
        </aside>

        {/* Main */}
        <main className="mr-main">
          <h1 className="mr-title">Minhas Reservas</h1>
          <p className="mr-sub">Gerencie todas as suas reservas e atividades</p>

          {loading && <p className="mr-status">Carregando reservas...</p>}
          {error && <p className="mr-status mr-status-error">{error}</p>}

          {!loading && !error && reservations.length === 0 && (
            <div className="mr-empty">
              <FaCalendarAlt size={40} color="#d1d5db" />
              <p>Você ainda não tem reservas.</p>
              <Link to="/" className="mr-btn-primary">Explorar Serviços</Link>
            </div>
          )}

          <div className="mr-list">
            {reservations.map(r => (
              <article key={r.reserveId} className="mr-card">
                <div className="mr-card-img-wrap">
                  <img
                    src={r.hotelImage ?? FALLBACK_IMAGE}
                    alt={r.hotelName}
                    className="mr-card-img"
                    onError={e => { (e.target as HTMLImageElement).src = FALLBACK_IMAGE }}
                  />
                </div>

                <div className="mr-card-body">
                  <div className="mr-card-top">
                    <div>
                      <h3 className="mr-card-name">{r.hotelName}</h3>
                      <span className="mr-card-city">
                        <FaMapMarkerAlt size={11} /> {r.hotelCity}
                      </span>
                    </div>
                    <span className={`mr-badge mr-badge-${r.status.toLowerCase()}`}>
                      {r.status === 'Confirmada' && '✓ '}
                      {r.status === 'Pendente' && '📅 '}
                      {r.status === 'Cancelada' && '✕ '}
                      {r.status}
                    </span>
                  </div>

                  <div className="mr-card-grid">
                    <div>
                      <span className="mr-grid-label">Check-in</span>
                      <span className="mr-grid-value">{formatDate(r.checkInDate)}</span>
                    </div>
                    <div>
                      <span className="mr-grid-label">Check-out</span>
                      <span className="mr-grid-value">{formatDate(r.checkOutDate)}</span>
                    </div>
                    <div>
                      <span className="mr-grid-label">Hóspedes</span>
                      <span className="mr-grid-value">👥 {r.numberOfPeople}</span>
                    </div>
                    <div>
                      <span className="mr-grid-label">Total</span>
                      <span className="mr-grid-value">{formatCurrency(r.totalPrice)}</span>
                    </div>
                  </div>

                  <div className="mr-card-actions">
                    {r.status === 'Confirmada' && (
                      <>
                        <button className="mr-btn-danger" onClick={() => handleCancel(r.reserveId)}>
                          Cancelar Reserva
                        </button>
                        <button className="mr-btn-outline" onClick={() => setRatingTarget(r)}>
                          <FaStar size={12} /> Avaliar
                        </button>
                        <button className="mr-btn-outline">Ver Detalhes</button>
                      </>
                    )}
                    {r.status === 'Pendente' && (
                      <button className="mr-btn-outline">Ver Detalhes</button>
                    )}
                    {r.status === 'Cancelada' && (
                      <>
                        <button className="mr-btn-ghost" onClick={() => handleRemove(r.reserveId)}>
                          <FaTrash size={12} /> Remover do Histórico
                        </button>
                        <button className="mr-btn-outline">Ver Detalhes</button>
                      </>
                    )}
                  </div>
                </div>
              </article>
            ))}
          </div>
        </main>
      </div>

      {ratingTarget && user && (
        <RatingModal
          reservation={ratingTarget}
          userId={0 /* userId resolved from token server-side */}
          onClose={() => setRatingTarget(null)}
        />
      )}
    </div>
  )
}

function getInitials(name: string) {
  const parts = name.trim().split(' ')
  return parts.length >= 2
    ? (parts[0][0] + parts[parts.length - 1][0]).toUpperCase()
    : name.slice(0, 2).toUpperCase()
}
