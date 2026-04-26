import Head from 'next/head'
import Link from 'next/link'
import Nav from '../../components/Nav'
import { getRegionSummaries, formatFare } from '../../lib/destinations'
import styles from './index.module.css'

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
  'South East England': 'The most reachable region from London — coastal towns, chalk cliffs, medieval villages and the South Downs, all within two hours.',
  'South West England': 'Georgian cities, wild coastline, Cotswold edges and the dramatic landscapes of Dartmoor and Exmoor, reachable from Bristol and London.',
  'East of England':    'Big skies, cathedral cities and quietly beautiful market towns across Norfolk, Suffolk, Hertfordshire and Cambridgeshire.',
  'Yorkshire':          'England\'s largest county and arguably its finest — moorland, dales, spa towns, foodie hotspots and medieval cities.',
  'Peak District':      'Britain\'s first national park, with limestone gorges, gritstone edges and some of the finest walking in England.',
  'North West England': 'Liverpool, Manchester, the Mersey coast and beyond — one of England\'s most culturally rich and underrated regions.',
  'Wales':              'Medieval castles, mountain landscapes and a Celtic culture entirely its own — closer than most people realise.',
}

export async function getStaticProps() {
  return { props: { summaries: getRegionSummaries() } }
}

export default function RegionsIndex({ summaries }) {
  return (
    <>
      <Head>
        <title>Browse by Region — Rail Treasure</title>
        <meta name="description" content="Explore hidden gem rail destinations by region across Britain — from the South East coast to the Yorkshire Dales and Wales." />
      </Head>

      <a href="#regions" className="skip-link">Skip to regions</a>
      <Nav />

      <div className={styles.page}>
        <header className={styles.header}>
          <div className={styles.headerInner}>
            <div className={styles.eyebrow}>Explore Britain</div>
            <h1 className={styles.title}>Browse by region</h1>
            <p className={styles.subtitle}>
              Every region has its own character. Choose one to see curated destinations,
              journey times and fares — all reachable without a car.
            </p>
          </div>
        </header>

        <main className={styles.main} id="regions">
          <div className={styles.grid}>
            {summaries.map(s => (
              <Link key={s.slug} href={`/regions/${s.slug}`} className={styles.card}>
                <div className={styles.cardTop}>
                  <span className={styles.icon} aria-hidden="true">{REGION_ICONS[s.region] || '🗺️'}</span>
                  <div>
                    <h2 className={styles.regionName}>{s.region}</h2>
                    <p className={styles.regionCount}>{s.count} destinations</p>
                  </div>
                </div>
                <p className={styles.intro}>{REGION_INTROS[s.region] || ''}</p>
                <div className={styles.cardMeta}>
                  {s.minFare && (
                    <span className={styles.fare}>Fares from {formatFare(s.minFare)}</span>
                  )}
                  <span className={styles.origins}>{s.origins.join(', ')}</span>
                </div>
                {s.sample.length > 0 && (
                  <div className={styles.sample}>
                    {s.sample.map(name => (
                      <span key={name} className={styles.sampleItem}>{name}</span>
                    ))}
                    {s.count > 3 && <span className={styles.sampleMore}>+{s.count - 3} more</span>}
                  </div>
                )}
                <span className={styles.cta}>Explore region →</span>
              </Link>
            ))}
          </div>
        </main>
      </div>

            <footer className={styles.footer}>
        <p>Finding Britain's hidden gems, one train at a time.</p>
      </footer>
    </>
  )
}
