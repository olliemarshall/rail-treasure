import { useState, useMemo } from 'react'
import Head from 'next/head'
import Link from 'next/link'
import Nav from '../../components/Nav'
import DestinationCard from '../../components/DestinationCard'
import { getAllRegions, regionToSlug, slugToRegion, getDestinationsByRegion, getAllTags, formatFare } from '../../lib/destinations'
import styles from './[slug].module.css'

const REGION_ICONS = {
  'South East England': '🌊',
  'South West England': '🌿',
  'East of England':    '🌾',
  'Yorkshire':          '🏔️',
  'Peak District':      '🥾',
  'North West England': '🏙️',
  'Wales':              '🐉',
}

const REGION_INTROS = {
  'South East England': 'The garden of England and its coast — from the chalk cliffs of the Seven Sisters to ancient Cinque Ports, medieval villages and the North and South Downs. Most destinations are within 90 minutes of London, making this the most immediately accessible region on the site.',
  'South West England': 'A region of enormous variety — Georgian Bath, wild Dartmoor edges, Regency Cheltenham, the deep estuaries of Devon and the quiet market towns of Somerset and Wiltshire. Served well from both Bristol and London.',
  'East of England':    'Flat horizons, enormous skies and a quiet beauty that rewards the unhurried visitor. Medieval cathedral cities, wool towns preserved in amber, and the Broads — Britain\'s largest protected wetland — all within reach.',
  'Yorkshire':          'England\'s largest and arguably greatest county. The Dales, the Moors, the Wolds, the industrial heritage of the Pennine valleys, and cities with more cultural confidence than almost anywhere outside London.',
  'Peak District':      'Britain\'s first National Park packs extraordinary landscape variety into a compact area — limestone gorges, gritstone edges, ancient packhorse routes and easy access from both Manchester and Sheffield.',
  'North West England': 'Two world cities, a coastline of unexpected beauty, and a hinterland of quiet market towns and mossland. Liverpool and Manchester are destinations in their own right; the places between them are the hidden gems.',
  'Wales':              'A country with its own language, culture and landscape — medieval castles, mountain backdrops and coastal drama. Closer to Bristol and the North West than most visitors realise, and far less crowded than England\'s equivalent destinations.',
}

export async function getStaticPaths() {
  const regions = getAllRegions()
  return {
    paths: regions.map(r => ({ params: { slug: regionToSlug(r) } })),
    fallback: false,
  }
}

export async function getStaticProps({ params }) {
  const region = slugToRegion(params.slug)
  if (!region) return { notFound: true }
  const destinations = getDestinationsByRegion(region)
  const tags = getAllTags()
  return { props: { region, destinations, tags, slug: params.slug } }
}

export default function RegionPage({ region, destinations, tags }) {
  const [activeTag,    setActiveTag]    = useState('all')
  const [activeOrigin, setActiveOrigin] = useState('')
  const [sortBy,       setSortBy]       = useState('name')

  // All origins available in this region
  const origins = useMemo(() => {
    const set = new Set(destinations.flatMap(d => d.routes.map(r => r.origin)))
    return [...set].sort()
  }, [destinations])

  // Tags that appear in this region
  const regionTags = useMemo(() => {
    return tags.filter(t => destinations.some(d => d.tags.includes(t)))
  }, [destinations, tags])

  // Min fare in this region
  const minFare = useMemo(() => {
    const fares = destinations.flatMap(d => d.routes.map(r => r.advance_fare_from_gbp)).filter(Boolean)
    return fares.length ? Math.min(...fares) : null
  }, [destinations])

  const filtered = useMemo(() => {
    let results = destinations.filter(d => {
      if (activeTag !== 'all' && !d.tags.includes(activeTag)) return false
      if (activeOrigin && !d.routes.some(r => r.origin === activeOrigin)) return false
      return true
    })
    if (sortBy === 'time') {
      results = results.sort((a, b) => {
        const getMin = d => {
          const routes = activeOrigin ? d.routes.filter(r => r.origin === activeOrigin) : d.routes
          return Math.min(...routes.map(r => r.travel_time_mins))
        }
        return getMin(a) - getMin(b)
      })
    } else {
      results = results.sort((a, b) => a.name.localeCompare(b.name))
    }
    return results
  }, [destinations, activeTag, activeOrigin, sortBy])

  return (
    <>
      <Head>
        <title>{region} — Rail Treasure</title>
        <meta name="description" content={`Hidden gem destinations in ${region} reachable by train. ${REGION_INTROS[region]?.slice(0,120) || ''}`} />
      </Head>

      <a href="#destinations" className="skip-link">Skip to destinations</a>
      <Nav />

      {/* REGION HEADER */}
      <header className={styles.header}>
        <div className={styles.headerInner}>
          <Link href="/regions" className={styles.back}>← All regions</Link>
          <div className={styles.headerTop}>
            <span className={styles.icon} aria-hidden="true">{REGION_ICONS[region] || '🗺️'}</span>
            <div>
              <h1 className={styles.title}>{region}</h1>
              <div className={styles.headerMeta}>
                <span>{destinations.length} destinations</span>
                {minFare && <span>Fares from {formatFare(minFare)}</span>}
                <span>From: {origins.join(', ')}</span>
              </div>
            </div>
          </div>
          <p className={styles.intro}>{REGION_INTROS[region] || ''}</p>
        </div>
      </header>

      {/* FILTER BAR */}
      <div className={styles.filterBar}>
        <div className={styles.filterInner}>
          {/* Tag chips */}
          <div className={styles.chips} role="group" aria-label="Filter by type">
            <button
              className={`${styles.chip} ${activeTag === 'all' ? styles.chipActive : ''}`}
              onClick={() => setActiveTag('all')}
              aria-pressed={activeTag === 'all'}
            >All</button>
            {regionTags.map(tag => (
              <button
                key={tag}
                className={`${styles.chip} ${activeTag === tag ? styles.chipActive : ''}`}
                onClick={() => setActiveTag(tag)}
                aria-pressed={activeTag === tag}
              >{tag}</button>
            ))}
          </div>

          {/* Origin + sort selects */}
          <div className={styles.selects}>
            <label htmlFor="region-origin" className="sr-only">Travelling from</label>
            <select
              id="region-origin"
              className={styles.select}
              value={activeOrigin}
              onChange={e => setActiveOrigin(e.target.value)}
            >
              <option value="">From anywhere</option>
              {origins.map(o => <option key={o} value={o}>From {o}</option>)}
            </select>

            <label htmlFor="region-sort" className="sr-only">Sort</label>
            <select
              id="region-sort"
              className={styles.select}
              value={sortBy}
              onChange={e => setSortBy(e.target.value)}
            >
              <option value="name">A–Z</option>
              <option value="time">Quickest first</option>
            </select>
          </div>
        </div>
      </div>

      {/* DESTINATIONS */}
      <main className={styles.main} id="destinations">
        <p className={styles.count} aria-live="polite">
          <strong>{filtered.length}</strong> of {destinations.length} destinations
        </p>
        {filtered.length === 0 ? (
          <div className={styles.empty}>
            <p>No destinations match — try clearing a filter.</p>
            <button onClick={() => { setActiveTag('all'); setActiveOrigin('') }} className={styles.clearBtn}>
              Clear filters
            </button>
          </div>
        ) : (
          <div className={styles.grid}>
            {filtered.map(dest => (
              <DestinationCard key={dest.id} destination={dest} activeOrigin={activeOrigin} />
            ))}
          </div>
        )}
      </main>

      {/* OTHER REGIONS */}
      <section className={styles.otherRegions}>
        <div className={styles.otherInner}>
          <p className={styles.otherLabel}>Explore another region</p>
          <Link href="/regions" className={styles.otherLink}>View all regions →</Link>
        </div>
      </section>

            <footer className={styles.footer}>
        <p>Finding Britain\'s hidden gems, one train at a time.</p>
      </footer>
    </>
  )
}
