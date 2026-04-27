import { useState, useMemo } from 'react'
import Head from 'next/head'
import Link from 'next/link'
import Nav from '../components/Nav'
import HeroSearch from '../components/HeroSearch'
import DestinationCard from '../components/DestinationCard'
import { getAllDestinations, getAllTags, getAllOrigins, getJourneyBands, getMeta } from '../lib/destinations'
import { T } from '../lib/translations'
import styles from './index.module.css'

export async function getStaticProps() {
  return {
    props: {
      destinations: getAllDestinations(),
      tags:         getAllTags(),
      origins:      getAllOrigins(),
      journeyBands: getJourneyBands(),
      meta:         getMeta(),
    }
  }
}

export default function Home({ destinations, tags, origins, journeyBands, meta }) {
  const [query,          setQuery]          = useState('')
  const [activeTag,      setActiveTag]      = useState('all')
  const [activeOrigin,   setActiveOrigin]   = useState('')
  const [activeTimeBand, setActiveTimeBand] = useState('')
  const [lang,           setLang]           = useState('en')
  const t = T[lang] || T.en
  const [sortBy,         setSortBy]         = useState('name')

  const filtered = useMemo(() => {
    let results = destinations.filter(dest => {
      if (activeTag !== 'all' && !dest.tags.includes(activeTag)) return false
      if (query) {
        const q = query.toLowerCase()
        const hay = [dest.name, dest.region, dest.description, ...dest.tags].join(' ').toLowerCase()
        if (!hay.includes(q)) return false
      }
      if (activeOrigin && !dest.routes.some(r => r.origin === activeOrigin)) return false
      if (activeTimeBand) {
        const routes = activeOrigin ? dest.routes.filter(r => r.origin === activeOrigin) : dest.routes
        if (!routes.some(r => r.journey_band === activeTimeBand)) return false
      }
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
    } else if (sortBy === 'region') {
      results = results.sort((a, b) => a.region.localeCompare(b.region) || a.name.localeCompare(b.name))
    } else {
      results = results.sort((a, b) => a.name.localeCompare(b.name))
    }

    return results
  }, [destinations, query, activeTag, activeOrigin, activeTimeBand, sortBy])

  // Browse by region cards
  const regionGroups = useMemo(() => {
    const map = {}
    destinations.forEach(d => {
      if (!map[d.region]) map[d.region] = 0
      map[d.region]++
    })
    return Object.entries(map).sort((a, b) => b[1] - a[1])
  }, [destinations])

  return (
    <>
      <Head>
        <title>Rail Treasure — Hidden gems by train</title>
        <meta name="description" content="Curated hidden gem destinations across Britain, reachable by rail. Honest journey times, real fare guidance, no car needed." />
      </Head>

      <a href="#destinations" className="skip-link">Skip to destinations</a>

      <Nav lang={lang} onLangChange={setLang} />

      {/* HERO SEARCH */}
      <HeroSearch
        tags={tags}
        origins={origins}
        journeyBands={journeyBands}
        query={query}
        activeTag={activeTag}
        activeOrigin={activeOrigin}
        activeTimeBand={activeTimeBand}
        onQueryChange={setQuery}
        onTagChange={setActiveTag}
        onOriginChange={setActiveOrigin}
        onTimeBandChange={setActiveTimeBand}
        resultCount={meta.total_destinations}
        lang={lang}
      />

      {/* DESTINATIONS GRID */}
      <main className={styles.main} id="destinations">
        <div className={styles.resultsBar}>
          <p className={styles.resultsCount} aria-live="polite" aria-atomic="true">
            <strong>{filtered.length}</strong> {t.foundCount(filtered.length).replace(String(filtered.length), '').trim()}
          </p>
        </div>

        {filtered.length === 0 ? (
          <div className={styles.empty} role="status">
            <h2>No destinations found</h2>
            <p>Try adjusting your search or clearing a filter.</p>
            <button className={styles.clearAll} onClick={() => { setQuery(''); setActiveTag('all'); setActiveOrigin(''); setActiveTimeBand('') }}>
              Clear all filters
            </button>
          </div>
        ) : (
          <div className={styles.grid} aria-label={`${filtered.length} destinations`}>
            {filtered.map(dest => (
              <DestinationCard key={dest.id} destination={dest} activeOrigin={activeOrigin} />
            ))}
          </div>
        )}
      </main>

      {/* BROWSE BY REGION */}
      <section className={styles.regionsSection} aria-labelledby="regions-heading">
        <div className={styles.regionsInner}>
          <h2 id="regions-heading" className={styles.regionsHeading}>{t.browseRegions}</h2>
          <p className={styles.regionsSub}>{t.regionsSub}</p>
          <div className={styles.regionsGrid}>
            {regionGroups.map(([region, count]) => {
              const slug = region.toLowerCase().replace(/ /g, '-')
              return (
                <Link key={region} href={`/regions/${slug}`} className={styles.regionCard}>
                  <span className={styles.regionName}>{region}</span>
                  <span className={styles.regionCount}>{count} destinations</span>
                  <span className={styles.regionArrow} aria-hidden="true">→</span>
                </Link>
              )
            })}
          </div>
        </div>
      </section>

      <footer className={styles.footer}>
        <div className={styles.footerInner}>
          <p className={styles.footerBrand}>Finding Britain's hidden gems, one train at a time.</p>
          <p className={styles.footerDisclaimer}>
            Fares are indicative advance prices. Always check{' '}
            <a href="https://www.thetrainline.com" target="_blank" rel="noopener noreferrer">Trainline</a>{' '}
            or{' '}
            <a href="https://www.nationalrail.co.uk" target="_blank" rel="noopener noreferrer">National Rail</a>{' '}
            before travel.
          </p>
        </div>
      </footer>
    </>
  )
}
