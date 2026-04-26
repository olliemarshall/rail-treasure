import { useState, useMemo } from 'react'
import Head from 'next/head'
import Nav from '../components/Nav'
import FilterBar from '../components/FilterBar'
import DestinationCard from '../components/DestinationCard'
import { getAllDestinations, getAllTags, getAllOrigins, getJourneyBands, getMeta } from '../lib/destinations'
import styles from './index.module.css'

export async function getStaticProps() {
  return {
    props: {
      destinations: getAllDestinations(),
      tags: getAllTags(),
      origins: getAllOrigins(),
      journeyBands: getJourneyBands(),
      meta: getMeta(),
    }
  }
}

export default function Home({ destinations, tags, origins, journeyBands, meta }) {
  const [query, setQuery] = useState('')
  const [activeTag, setActiveTag] = useState('all')
  const [activeOrigin, setActiveOrigin] = useState('')
  const [activeTimeBand, setActiveTimeBand] = useState('')
  const [sortBy, setSortBy] = useState('name')

  const filtered = useMemo(() => {
    let results = destinations.filter(dest => {
      // Tag filter
      if (activeTag !== 'all' && !dest.tags.includes(activeTag)) return false

      // Text search
      if (query) {
        const q = query.toLowerCase()
        const searchable = [dest.name, dest.region, dest.description, ...dest.tags].join(' ').toLowerCase()
        if (!searchable.includes(q)) return false
      }

      // Origin filter
      if (activeOrigin) {
        if (!dest.routes.some(r => r.origin === activeOrigin)) return false
      }

      // Time band filter
      if (activeTimeBand) {
        const routes = activeOrigin
          ? dest.routes.filter(r => r.origin === activeOrigin)
          : dest.routes
        if (!routes.some(r => r.journey_band === activeTimeBand)) return false
      }

      return true
    })

    // Sort
    if (sortBy === 'time') {
      results = results.sort((a, b) => {
        const getMin = d => {
          const routes = activeOrigin ? d.routes.filter(r => r.origin === activeOrigin) : d.routes
          return Math.min(...routes.map(r => r.travel_time_mins))
        }
        return getMin(a) - getMin(b)
      })
    } else if (sortBy === 'region') {
      results = results.sort((a, b) => a.region.localeCompare(b.region) || a.name.localeCompare(b.name))
    } else {
      results = results.sort((a, b) => a.name.localeCompare(b.name))
    }

    return results
  }, [destinations, query, activeTag, activeOrigin, activeTimeBand, sortBy])

  return (
    <>
      <Head>
        <title>Rail Treasure — Hidden gems by train</title>
      </Head>

      <Nav />

      {/* HERO */}
      <section className={styles.hero}>
        <div className={styles.heroText}>
          <div className={styles.eyebrow}>Britain's best kept secrets</div>
          <h1 className={styles.heroTitle}>
            Hidden gems,<br />found <em>by rail</em>
          </h1>
          <p className={styles.heroSub}>
            Curated destinations across Britain you can reach without a car —
            with honest journey times and real fare guidance.
          </p>
          <div className={styles.heroStats}>
            <div className={styles.stat}>
              <strong>{meta.total_destinations}</strong>
              <span>destinations</span>
            </div>
            <div className={styles.stat}>
              <strong>{meta.origins.length}</strong>
              <span>departure cities</span>
            </div>
            <div className={styles.stat}>
              <strong>{meta.all_tags.length}</strong>
              <span>vibes to explore</span>
            </div>
          </div>
        </div>
      </section>

      {/* SEARCH */}
      <section className={styles.searchSection}>
        <div className={styles.searchInner}>
          <div className={styles.searchLabel}>Find your next escape</div>
          <div className={styles.searchControls}>
            <div className={styles.searchField}>
              <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <circle cx="11" cy="11" r="8" /><path d="m21 21-4.35-4.35" />
              </svg>
              <input
                type="text"
                placeholder="Search destinations, regions or vibes…"
                value={query}
                onChange={e => setQuery(e.target.value)}
                className={styles.searchInput}
              />
            </div>
            <select
              value={activeOrigin}
              onChange={e => setActiveOrigin(e.target.value)}
              className={styles.searchSelect}
            >
              <option value="">Travelling from anywhere</option>
              {origins.map(o => (
                <option key={o} value={o}>From {o}</option>
              ))}
            </select>
            <select
              value={activeTimeBand}
              onChange={e => setActiveTimeBand(e.target.value)}
              className={styles.searchSelect}
            >
              <option value="">Any journey time</option>
              {journeyBands.map(b => (
                <option key={b} value={b}>{b}</option>
              ))}
            </select>
          </div>
        </div>
      </section>

      {/* FILTER BAR */}
      <FilterBar
        tags={tags}
        activeTag={activeTag}
        onTagChange={tag => setActiveTag(tag)}
      />

      {/* GRID */}
      <main className={styles.main}>
        <div className={styles.resultsHeader}>
          <p className={styles.resultsCount}>
            <strong>{filtered.length}</strong> destination{filtered.length !== 1 ? 's' : ''} found
          </p>
          <select
            value={sortBy}
            onChange={e => setSortBy(e.target.value)}
            className={styles.sortSelect}
          >
            <option value="name">Sort: A–Z</option>
            <option value="time">Sort: Quickest first</option>
            <option value="region">Sort: By region</option>
          </select>
        </div>

        {filtered.length === 0 ? (
          <div className={styles.empty}>
            <h3>No destinations found</h3>
            <p>Try adjusting your filters or search term.</p>
          </div>
        ) : (
          <div className={styles.grid}>
            {filtered.map(dest => (
              <DestinationCard
                key={dest.id}
                destination={dest}
                activeOrigin={activeOrigin}
              />
            ))}
          </div>
        )}
      </main>

      <footer className={styles.footer}>
        <p><strong>Rail Treasure</strong> — Finding Britain's hidden gems, one train at a time.</p>
        <p>Fares shown are indicative advance prices. Always check <a href="https://www.thetrainline.com" target="_blank" rel="noopener noreferrer">Trainline</a> or <a href="https://www.nationalrail.co.uk" target="_blank" rel="noopener noreferrer">National Rail</a> for live pricing.</p>
      </footer>
    </>
  )
}
