/**
 * mapService.ts
 *
 * Utilities for Google Maps integration.
 *
 * SETUP:
 *   1. Get a Google Maps API key from https://console.cloud.google.com
 *   2. Enable "Maps Embed API" and "Maps JavaScript API"
 *   3. Add to .env:   VITE_GOOGLE_MAPS_KEY=your_key_here
 *   4. The key is read at runtime from import.meta.env.VITE_GOOGLE_MAPS_KEY
 *
 * Components that consume this service:
 *   - <MapEmbed address="..." />   — renders an <iframe> embed (no JS SDK needed)
 *   - <MapLink address="..." />    — opens Google Maps in a new tab
 *   - useGoogleMaps()              — loads the full JS SDK for advanced usage
 */

const MAPS_KEY = import.meta.env.VITE_GOOGLE_MAPS_KEY as string | undefined

/** Build a static embed URL for a given address or lat/lng */
export function getEmbedUrl(address: string): string {
  const encoded = encodeURIComponent(address)
  if (MAPS_KEY) {
    return `https://www.google.com/maps/embed/v1/place?key=${MAPS_KEY}&q=${encoded}&language=pt-BR`
  }
  // Fallback — works without a key but shows a "For development purposes only" watermark
  return `https://maps.google.com/maps?q=${encoded}&output=embed&hl=pt-BR`
}

/** Open Google Maps directions in a new tab */
export function openDirections(address: string): void {
  const encoded = encodeURIComponent(address)
  window.open(`https://www.google.com/maps/dir/?api=1&destination=${encoded}`, '_blank', 'noopener')
}

/** Open a location pin in a new tab */
export function openMap(address: string): void {
  const encoded = encodeURIComponent(address)
  window.open(`https://www.google.com/maps/search/?api=1&query=${encoded}`, '_blank', 'noopener')
}

/** Build a full address string from hotel fields */
export function buildAddress(street: string, city: string, state: string, zipCode?: string): string {
  const parts = [street, city, state]
  if (zipCode) parts.push(zipCode)
  return parts.filter(Boolean).join(', ') + ', Brasil'
}
