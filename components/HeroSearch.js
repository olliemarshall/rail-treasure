import { useState } from 'react'
import styles from './HeroSearch.module.css'

const TAG_ICONS = {
  'coastal': '🌊', 'historic': '🏰', 'walking': '🥾', 'scenic': '🏔️',
  'foodie': '🍽️', 'countryside': '🌿', 'riverside': '🛶', 'village': '🏡',
  'nature': '🦋', 'arts & culture': '🎨', 'quiet escape': '☕', 'city break': '🏙️'
}

export default function HeroSearch({
  tags,
  origins,
  journeyBands,
  query,
  activeTag,
  activeOrigin,
  activeTimeBand,
  onQueryChange,
  onTagChange,
  onOriginChange,
  onTimeBandChange,
  resultCount,
}) {
  const [filtersExpanded, setFiltersExpanded] = useState(false)

  return (
    <section className={styles.hero} aria-label="Search destinations">

      {/* Top bar — brand copy + stats */}
      <div className={styles.topBar}>
        <div className={styles.topBarInner}>
          <div className={styles.brandLine}>
            <span className={styles.eyebrow}>Britain's best kept secrets</span>
          </div>
          <h1 className={styles.headline}>
            Hidden gems,<br />found <em>by rail</em>
          </h1>
          <p className={styles.subline}>
            {resultCount} curated destinations · no car needed
          </p>
        </div>
      </div>

      {/* Search bar */}
      <div className={styles.searchBar}>
        <div className={styles.searchBarInner}>

          {/* Row 1 — main inputs */}
          <div className={styles.inputRow}>

            {/* Text search */}
            <label htmlFor="search-input" className={styles.srOnly}>Search destinations</label>
            <div className={styles.inputWrap} role="search">
              <svg className={styles.inputIcon} width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
              </svg>
              <input
                id="search-input"
                type="search"
                className={styles.input}
                placeholder="Search destinations, regions, vibes…"
                value={query}
                onChange={e => onQueryChange(e.target.value)}
                autoComplete="off"
              />
              {query && (
                <button
                  className={styles.clearBtn}
                  onClick={() => onQueryChange('')}
                  aria-label="Clear search"
                >×</button>
              )}
            </div>

            {/* Origin */}
            <label htmlFor="origin-select" className={styles.srOnly}>Travelling from</label>
            <div className={styles.selectWrap}>
              <svg className={styles.selectIcon} width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z"/>
                <circle cx="12" cy="9" r="2.5"/>
              </svg>
              <select
                id="origin-select"
                className={styles.select}
                value={activeOrigin}
                onChange={e => onOriginChange(e.target.value)}
              >
                <option value="">From anywhere</option>
                {origins.map(o => (
                  <option key={o} value={o}>From {o}</option>
                ))}
              </select>
            </div>

            {/* Journey time */}
            <label htmlFor="time-select" className={styles.srOnly}>Journey time</label>
            <div className={styles.selectWrap}>
              <svg className={styles.selectIcon} width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                <circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>
              </svg>
              <select
                id="time-select"
                className={styles.select}
                value={activeTimeBand}
                onChange={e => onTimeBandChange(e.target.value)}
              >
                <option value="">Any journey time</option>
                {journeyBands.map(b => (
                  <option key={b} value={b}>{b}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Row 2 — tag filter chips */}
          <div className={styles.tagsRow} role="group" aria-label="Filter by type">
            <button
              className={`${styles.chip} ${activeTag === 'all' ? styles.chipActive : ''}`}
              onClick={() => onTagChange('all')}
              aria-pressed={activeTag === 'all'}
            >
              All
            </button>
            {tags.map(tag => (
              <button
                key={tag}
                className={`${styles.chip} ${activeTag === tag ? styles.chipActive : ''}`}
                onClick={() => onTagChange(tag)}
                aria-pressed={activeTag === tag}
              >
                <span aria-hidden="true">{TAG_ICONS[tag]}</span> {tag}
              </button>
            ))}
          </div>

        </div>
      </div>
    </section>
  )
}
