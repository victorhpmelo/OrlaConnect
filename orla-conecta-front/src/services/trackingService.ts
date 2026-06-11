/**
 * trackingService.ts
 *
 * Client-side tracking for places using localStorage.
 * Three features:
 *  - Favorites   : bookmark places to visit later
 *  - Visited     : mark places as already visited
 *  - Itinerary   : build an ordered trip plan with personal notes
 */

export interface TrackedPlace {
  /** Stable unique id: slugified `${category}__${name}` */
  id: string
  name: string
  category: string
  city: string
  description: string
  image: string
  rating: number
}

export interface ItineraryItem extends TrackedPlace {
  addedAt: string   // ISO timestamp
  note?: string
  tripDate?: string  // "YYYY-MM-DD" — the planned day for this stop
}

const KEYS = {
  favorites: 'oc_favorites',
  visited:   'oc_visited',
  itinerary: 'oc_itinerary',
} as const

// ── Helpers ──────────────────────────────────────────────────────────────────

function load<T>(key: string): T[] {
  try { return JSON.parse(localStorage.getItem(key) ?? '[]') as T[] }
  catch { return [] }
}

function persist<T>(key: string, data: T[]) {
  localStorage.setItem(key, JSON.stringify(data))
  window.dispatchEvent(new CustomEvent('tracking-changed', { detail: { key } }))
}

/** Build a stable id from category + name */
export function placeId(category: string, name: string): string {
  return `${category}__${name}`.toLowerCase().replace(/\s+/g, '_')
}

// ── Favorites ─────────────────────────────────────────────────────────────────

export function getFavorites(): TrackedPlace[] {
  return load<TrackedPlace>(KEYS.favorites)
}

export function isFavorite(id: string): boolean {
  return getFavorites().some(p => p.id === id)
}

export function addFavorite(place: TrackedPlace): void {
  const list = getFavorites().filter(p => p.id !== place.id)
  persist(KEYS.favorites, [...list, place])
}

export function removeFavorite(id: string): void {
  persist(KEYS.favorites, getFavorites().filter(p => p.id !== id))
}

export function toggleFavorite(place: TrackedPlace): void {
  isFavorite(place.id) ? removeFavorite(place.id) : addFavorite(place)
}

// ── Visited ───────────────────────────────────────────────────────────────────

export function getVisited(): TrackedPlace[] {
  return load<TrackedPlace>(KEYS.visited)
}

export function isVisited(id: string): boolean {
  return getVisited().some(p => p.id === id)
}

export function toggleVisited(place: TrackedPlace): void {
  isVisited(place.id)
    ? persist(KEYS.visited, getVisited().filter(p => p.id !== place.id))
    : persist(KEYS.visited, [...getVisited(), place])
}

// ── Itinerary ─────────────────────────────────────────────────────────────────

export function getItinerary(): ItineraryItem[] {
  return load<ItineraryItem>(KEYS.itinerary)
}

export function isInItinerary(id: string): boolean {
  return getItinerary().some(p => p.id === id)
}

export function addToItinerary(place: TrackedPlace, note?: string): void {
  if (isInItinerary(place.id)) return
  persist(KEYS.itinerary, [
    ...getItinerary(),
    { ...place, addedAt: new Date().toISOString(), note },
  ])
}

export function removeFromItinerary(id: string): void {
  persist(KEYS.itinerary, getItinerary().filter(p => p.id !== id))
}

export function updateItineraryNote(id: string, note: string): void {
  persist(KEYS.itinerary, getItinerary().map(p => p.id === id ? { ...p, note } : p))
}

export function setItineraryItemDate(id: string, date?: string): void {
  persist(KEYS.itinerary, getItinerary().map(p => p.id === id ? { ...p, tripDate: date } : p))
}

export function moveItineraryItem(id: string, direction: 'up' | 'down'): void {
  const list = getItinerary()
  const idx = list.findIndex(p => p.id === id)
  if (idx < 0) return
  const swapIdx = direction === 'up' ? idx - 1 : idx + 1
  if (swapIdx < 0 || swapIdx >= list.length) return
  const next = [...list]
  ;[next[idx], next[swapIdx]] = [next[swapIdx], next[idx]]
  persist(KEYS.itinerary, next)
}
