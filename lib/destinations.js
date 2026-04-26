import destinationsData from '../data/destinations.json'

export function getAllDestinations() {
  return destinationsData.destinations
}

export function getDestinationById(id) {
  return destinationsData.destinations.find(d => d.id === id) || null
}

export function getAllTags() {
  return destinationsData.meta.all_tags
}

export function getAllOrigins() {
  return destinationsData.meta.origins
}

export function getMeta() {
  return destinationsData.meta
}

export function getJourneyBands() {
  return destinationsData.meta.journey_bands
}

// Returns destinations that are reachable from 2+ origins — useful for a "multi-city" feature
export function getOverlapDestinations() {
  return destinationsData.destinations.filter(d => {
    const origins = new Set(d.routes.map(r => r.origin))
    return origins.size >= 2
  })
}

export function formatTime(mins) {
  const h = Math.floor(mins / 60)
  const m = mins % 60
  if (h === 0) return `${m}m`
  if (m === 0) return `${h}h`
  return `${h}h ${m}m`
}
