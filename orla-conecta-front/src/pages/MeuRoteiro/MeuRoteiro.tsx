import { useState, useEffect, useCallback } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import {
  FaHeart, FaCheck, FaRoute, FaUser, FaCalendarAlt, FaSignOutAlt,
  FaMapMarkerAlt, FaStar, FaTrash, FaChevronUp, FaChevronDown,
  FaRegStickyNote, FaFolder, FaFolderOpen,
} from 'react-icons/fa'
import {
  TrackedPlace, ItineraryItem,
  getFavorites, getVisited, getItinerary,
  removeFavorite, toggleVisited,
  removeFromItinerary, moveItineraryItem, updateItineraryNote, setItineraryItemDate,
} from '../../services/trackingService'
import { getCurrentUser, logout } from '../../services/authService'
import StarRating from '../../components/StarRating/StarRating'
import './MeuRoteiro.css'

type Tab = 'favoritos' | 'visitados' | 'roteiro'

function PlaceCard({
  place,
  onRemove,
  visitAction,
}: {
  place: TrackedPlace
  onRemove: () => void
  visitAction?: { label: string; onClick: () => void }
}) {
  return (
    <div className="rot-card">
      <div className="rot-card-top">
        <div className="rot-card-img-wrap">
          <img src={place.image} alt={place.name} className="rot-card-img" />
        </div>
        <div className="rot-card-body">
          <span className="rot-category-tag">{place.category}</span>
          <h3 className="rot-card-name">{place.name}</h3>
          <div className="rot-card-meta">
            <FaMapMarkerAlt size={11} />
            <span>{place.city}</span>
            <StarRating value={place.rating} size={13} />
            <span>{place.rating}</span>
          </div>
          <p className="rot-card-desc">{place.description}</p>
        </div>
      </div>
      <div className="rot-card-actions">
        {visitAction && (
          <button className="rot-btn-outline" onClick={visitAction.onClick}>
            <FaCheck size={12} /> {visitAction.label}
          </button>
        )}
        <button className="rot-btn-ghost" onClick={onRemove}>
          <FaTrash size={12} /> Remover
        </button>
      </div>
    </div>
  )
}

function ItineraryCard({
  item,
  index,
  total,
  onRemove,
  onMoveUp,
  onMoveDown,
  onNoteChange,
  onDateChange,
}: {
  item: ItineraryItem
  index: number
  total: number
  onRemove: () => void
  onMoveUp: () => void
  onMoveDown: () => void
  onNoteChange: (note: string) => void
  onDateChange: (date?: string) => void
}) {
  const [editing, setEditing] = useState(false)
  const [noteText, setNoteText] = useState(item.note ?? '')

  function saveNote() {
    onNoteChange(noteText)
    setEditing(false)
  }

  return (
    <div className="rot-itin-card">
      <div className="rot-itin-order">
        <span className="rot-itin-num">{index + 1}</span>
        <div className="rot-itin-arrows">
          <button className="rot-arrow-btn" onClick={onMoveUp} disabled={index === 0} aria-label="Mover para cima">
            <FaChevronUp size={11} />
          </button>
          <button className="rot-arrow-btn" onClick={onMoveDown} disabled={index === total - 1} aria-label="Mover para baixo">
            <FaChevronDown size={11} />
          </button>
        </div>
      </div>

      <div className="rot-itin-img-wrap">
        <img src={item.image} alt={item.name} className="rot-itin-img" />
      </div>

      <div className="rot-itin-body">
        <span className="rot-category-tag">{item.category}</span>
        <h3 className="rot-card-name">{item.name}</h3>
        <div className="rot-card-meta">
          <FaMapMarkerAlt size={11} />
          <span>{item.city}</span>
          <StarRating value={item.rating} size={13} />
          <span>{item.rating}</span>
        </div>

        {editing ? (
          <div className="rot-note-edit">
            <textarea
              className="rot-note-input"
              value={noteText}
              onChange={e => setNoteText(e.target.value)}
              placeholder="Adicione uma nota sobre este lugar..."
              rows={2}
              autoFocus
            />
            <div className="rot-note-btns">
              <button className="rot-btn-outline" onClick={saveNote}>Salvar</button>
              <button className="rot-btn-ghost" onClick={() => setEditing(false)}>Cancelar</button>
            </div>
          </div>
        ) : (
          <div className="rot-note-display" onClick={() => setEditing(true)}>
            {item.note
              ? <span className="rot-note-text">{item.note}</span>
              : <span className="rot-note-placeholder"><FaRegStickyNote size={12} /> Adicionar nota...</span>
            }
          </div>
        )}

        <div className="rot-date-row">
          <FaCalendarAlt size={11} className="rot-date-icon" />
          <input
            type="date"
            className="rot-date-input"
            value={item.tripDate ?? ''}
            onChange={e => onDateChange(e.target.value || undefined)}
            title="Agendar para um dia"
          />
        </div>
      </div>

      <button className="rot-itin-remove" onClick={onRemove} aria-label="Remover do roteiro">
        <FaTrash size={13} />
      </button>
    </div>
  )
}

export default function MeuRoteiro() {
  const navigate = useNavigate()
  const user = getCurrentUser()
  const [tab, setTab] = useState<Tab>('favoritos')
  const [favorites, setFavorites] = useState<TrackedPlace[]>([])
  const [visited, setVisited] = useState<TrackedPlace[]>([])
  const [itinerary, setItinerary] = useState<ItineraryItem[]>([])
  const [collapsed, setCollapsed] = useState<Set<string>>(new Set())

  useEffect(() => {
    if (!user) { navigate('/login'); return }
    load()
    window.addEventListener('tracking-changed', load)
    return () => window.removeEventListener('tracking-changed', load)
  }, [])

  const load = useCallback(() => {
    setFavorites(getFavorites())
    setVisited(getVisited())
    setItinerary(getItinerary())
  }, [])

  function handleLogout() {
    logout()
    navigate('/')
  }

  function toggleCollapsed(key: string) {
    setCollapsed(prev => {
      const next = new Set(prev)
      next.has(key) ? next.delete(key) : next.add(key)
      return next
    })
  }

  function formatDate(dateStr: string): string {
    const [y, m, d] = dateStr.split('-')
    return `${d}/${m}/${y}`
  }

  // Build date groups for itinerary
  const dateGroups = itinerary.reduce<Record<string, ItineraryItem[]>>((acc, item) => {
    const key = item.tripDate ?? '__none__'
    if (!acc[key]) acc[key] = []
    acc[key].push(item)
    return acc
  }, {})
  const sortedDateKeys = Object.keys(dateGroups).sort((a, b) => {
    if (a === '__none__') return 1
    if (b === '__none__') return -1
    return a.localeCompare(b)
  })

  if (!user) return null

  const tabs: { id: Tab; label: string; icon: React.ReactNode; count: number }[] = [
    { id: 'favoritos', label: 'Favoritos',  icon: <FaHeart size={14} />,  count: favorites.length },
    { id: 'visitados', label: 'Visitados',  icon: <FaCheck size={14} />,  count: visited.length },
    { id: 'roteiro',   label: 'Meu Roteiro', icon: <FaRoute size={14} />, count: itinerary.length },
  ]

  const initials = (() => {
    const parts = user.name.trim().split(' ')
    return parts.length >= 2
      ? (parts[0][0] + parts[parts.length - 1][0]).toUpperCase()
      : user.name.slice(0, 2).toUpperCase()
  })()

  return (
    <div className="rot-page">
      <div className="rot-container">

        {/* Sidebar */}
        <aside className="rot-sidebar">
          <div className="rot-avatar">{initials}</div>
          <h2 className="rot-sidebar-name">{user.name}</h2>
          <p className="rot-sidebar-email">{user.email}</p>
          <nav className="rot-nav">
            <Link to="/perfil" className="rot-nav-item">
              <FaUser size={14} /><span>Meu Perfil</span>
            </Link>
            <Link to="/meu-roteiro" className="rot-nav-item active">
              <FaCalendarAlt size={14} /><span>Meu Roteiro</span>
            </Link>
          </nav>
          <button className="rot-logout-btn" onClick={handleLogout}>
            <FaSignOutAlt size={14} />Sair da conta
          </button>
        </aside>

        {/* Main */}
        <main className="rot-main">
          <h1 className="rot-title">Meu Roteiro</h1>
          <p className="rot-sub">Seus lugares favoritos, visitados e seu plano de viagem</p>

          {/* Tabs */}
          <div className="rot-tabs">
            {tabs.map(t => (
              <button
                key={t.id}
                className={`rot-tab${tab === t.id ? ' active' : ''}`}
                onClick={() => setTab(t.id)}
              >
                {t.icon}
                <span>{t.label}</span>
                {t.count > 0 && <span className="rot-tab-badge">{t.count}</span>}
              </button>
            ))}
          </div>

          {/* Favoritos */}
          {tab === 'favoritos' && (
            <div className="rot-section">
              {favorites.length === 0 ? (
                <EmptyState
                  icon={<FaHeart size={36} color="#d1d5db" />}
                  message="Você ainda não tem favoritos."
                  hint="Clique no ♡ em qualquer lugar para favoritar."
                />
              ) : (
                <div className="rot-grid">
                  {favorites.map(p => (
                    <PlaceCard
                      key={p.id}
                      place={p}
                      onRemove={() => { removeFavorite(p.id); load() }}
                      visitAction={{
                        label: visited.some(v => v.id === p.id) ? 'Visitado ✓' : 'Marcar como visitado',
                        onClick: () => { toggleVisited(p); load() },
                      }}
                    />
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Visitados */}
          {tab === 'visitados' && (
            <div className="rot-section">
              {visited.length === 0 ? (
                <EmptyState
                  icon={<FaCheck size={36} color="#d1d5db" />}
                  message="Você ainda não marcou nenhum lugar como visitado."
                  hint="Clique em 'Já visitei' ao explorar lugares."
                />
              ) : (
                <div className="rot-grid">
                  {visited.map(p => (
                    <PlaceCard
                      key={p.id}
                      place={p}
                      onRemove={() => { toggleVisited(p); load() }}
                    />
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Roteiro */}
          {tab === 'roteiro' && (
            <div className="rot-section">
              {itinerary.length === 0 ? (
                <EmptyState
                  icon={<FaRoute size={36} color="#d1d5db" />}
                  message="Seu roteiro está vazio."
                  hint="Clique em '+ Roteiro' ao explorar lugares para montar seu plano de viagem."
                />
              ) : (
                <div className="rot-itin-list">
                  {sortedDateKeys.map(dateKey => {
                    const items = dateGroups[dateKey]
                    const isCollapsed = collapsed.has(dateKey)
                    const label = dateKey === '__none__' ? 'Sem data agendada' : formatDate(dateKey)
                    return (
                      <div key={dateKey} className="rot-date-group">
                        <button
                          className="rot-date-header"
                          onClick={() => toggleCollapsed(dateKey)}
                        >
                          {isCollapsed ? <FaFolder size={15} /> : <FaFolderOpen size={15} />}
                          <span className="rot-date-label">{label}</span>
                          <span className="rot-date-count">{items.length} lugar{items.length !== 1 ? 'es' : ''}</span>
                          {isCollapsed ? <FaChevronDown size={11} className="rot-date-chevron" /> : <FaChevronUp size={11} className="rot-date-chevron" />}
                        </button>
                        {!isCollapsed && items.map((item) => {
                          const globalIdx = itinerary.findIndex(x => x.id === item.id)
                          return (
                            <ItineraryCard
                              key={item.id}
                              item={item}
                              index={globalIdx}
                              total={itinerary.length}
                              onRemove={() => { removeFromItinerary(item.id); load() }}
                              onMoveUp={() => { moveItineraryItem(item.id, 'up'); load() }}
                              onMoveDown={() => { moveItineraryItem(item.id, 'down'); load() }}
                              onNoteChange={note => { updateItineraryNote(item.id, note); load() }}
                              onDateChange={date => { setItineraryItemDate(item.id, date); load() }}
                            />
                          )
                        })}
                      </div>
                    )
                  })}
                </div>
              )}
            </div>
          )}
        </main>
      </div>
    </div>
  )
}

function EmptyState({ icon, message, hint }: { icon: React.ReactNode; message: string; hint: string }) {
  return (
    <div className="rot-empty">
      {icon}
      <p className="rot-empty-msg">{message}</p>
      <p className="rot-empty-hint">{hint}</p>
      <Link to="/" className="rot-btn-primary">Explorar Lugares</Link>
    </div>
  )
}
