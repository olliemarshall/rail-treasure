import destinationsData from '../data/destinations.json' with { type: 'json' }

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

export function getOverlapDestinations() {
  return destinationsData.destinations.filter(d => {
    const origins = new Set(d.routes.map(r => r.origin))
    return origins.size >= 2
  })
}

// ── REGION HELPERS ──

// All unique regions, alphabetical
export function getAllRegions() {
  const regions = [...new Set(destinationsData.destinations.map(d => d.region))]
  return regions.sort()
}

// Convert a region name to a URL slug
export function regionToSlug(region) {
  return region.toLowerCase().replace(/ /g, '-')
}

// Convert a URL slug back to a region name
export function slugToRegion(slug) {
  const all = getAllRegions()
  return all.find(r => regionToSlug(r) === slug) || null
}

// Get all destinations for a given region name
export function getDestinationsByRegion(region) {
  return destinationsData.destinations.filter(d => d.region === region)
}

// Summary stats per region — used for region index page
export function getRegionSummaries() {
  return getAllRegions().map(region => {
    const dests = getDestinationsByRegion(region)
    const allTags = [...new Set(dests.flatMap(d => d.tags))]
    const origins = [...new Set(dests.flatMap(d => d.routes.map(r => r.origin)))]
    const minFare = Math.min(
      ...dests.flatMap(d => d.routes.map(r => r.advance_fare_from_gbp)).filter(Boolean)
    )
    return {
      region,
      slug: regionToSlug(region),
      count: dests.length,
      tags: allTags.slice(0, 4),
      origins,
      minFare: isFinite(minFare) ? minFare : null,
      sample: dests.slice(0, 3).map(d => d.name),
    }
  })
}

// ── FORMAT HELPERS ──

export function formatTime(mins) {
  const h = Math.floor(mins / 60)
  const m = mins % 60
  if (h === 0) return `${m}m`
  if (m === 0) return `${h}h`
  return `${h}h ${m}m`
}

export function formatFare(gbp) {
  if (!gbp) return null
  return `£${Number(gbp).toFixed(2)}`
}
