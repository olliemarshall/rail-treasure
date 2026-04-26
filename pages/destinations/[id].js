import Head from 'next/head'
import Link from 'next/link'
import Nav from '../../components/Nav'
import { getAllDestinations, getDestinationById, formatTime } from '../../lib/destinations'
import styles from './[id].module.css'

// Tell Next.js which pages to build at build time
export async function getStaticPaths() {
  const destinations = getAllDestinations()
  return {
    paths: destinations.map(d => ({ params: { id: d.id } })),
    fallback: false,
  }
}

// Fetch the data for this specific destination
export async function getStaticProps({ params }) {
  const destination = getDestinationById(params.id)
  if (!destination) return { notFound: true }
  return { props: { destination } }
}

const TAG_ICONS = {
  'coastal': '🌊', 'historic': '🏰', 'walking': '🥾', 'scenic': '🏔️',
  'foodie': '🍽️', 'countryside': '🌿', 'riverside': '🛶', 'village': '🏡',
  'nature': '🦋', 'arts & culture': '🎨', 'quiet escape': '☕', 'city break': '🏙️'
}

export default function DestinationPage({ destination }) {
  const { name, region, tags, description, highlights, best_time_to_visit, routes } = destination

  const multiOrigin = new Set(routes.map(r => r.origin)).size >= 2

  return (
    <>
      <Head>
        <title>{name} by train — Rail Treasure</title>
        <meta name="description" content={description} />
      </Head>

      <Nav />

      <div className={styles.page}>

        {/* Breadcrumb */}
        <div className={styles.breadcrumb}>
          <Link href="/">← All destinations</Link>
        </div>

        {/* Header */}
        <header className={styles.header}>
          <div className={styles.headerInner}>
            <div className={styles.headerMeta}>
              <span className={styles.region}>{region}</span>
              {multiOrigin && (
                <span className={styles.multiOriginBadge}>🔀 Reachable from {new Set(routes.map(r => r.origin)).size} cities</span>
              )}
            </div>
            <h1 className={styles.title}>{name}</h1>
            <div className={styles.tags}>
              {tags.map(tag => (
                <span key={tag} className={`${styles.tag} ${styles['tag_' + tag.replace(/ /g,'_').replace(/&/g,'')]}`}>
                  {TAG_ICONS[tag] || ''} {tag}
                </span>
              ))}
            </div>
            <p className={styles.description}>{description}</p>
          </div>
        </header>

        <div className={styles.content}>

          {/* Routes — left column on desktop */}
          <aside className={styles.sidebar}>
            <div className={styles.sidebarCard}>
              <h2 className={styles.sidebarTitle}>Getting there by rail</h2>
              <div className={styles.routes}>
                {routes.map(route => (
                  <div key={route.origin + route.departure_station} className={styles.routeBlock}>
                    <div className={styles.routeHeader}>
                      <div>
                        <div className={styles.routeFrom}>from {route.departure_station}</div>
                        <div className={styles.routeTime}>
                          🕐 {formatTime(route.travel_time_mins)}
                        </div>
                      </div>
                      <span className={styles.routeBand}>{route.journey_band}</span>
                    </div>

                    <div className={styles.routeMeta}>
                      {route.advance_fare_from_gbp && (
                        <div className={styles.fare}>
                          <span className={styles.fareLabel}>Advance from</span>
                          <span className={styles.fareValue}>£{route.advance_fare_from_gbp}</span>
                        </div>
                      )}
                      {route.anytime_fare_from_gbp && (
                        <div className={styles.fare}>
                          <span className={styles.fareLabel}>Anytime from</span>
                          <span className={styles.fareValue}>£{route.anytime_fare_from_gbp}</span>
                        </div>
                      )}
                      {route.operator && (
                        <div className={styles.operator}>Operated by {route.operator}</div>
                      )}
                      {route.notes && (
                        <div className={styles.routeNotes}>{route.notes}</div>
                      )}
                    </div>

                    <a
                      href={route.trainline_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={styles.bookBtn}
                    >
                      Check tickets on Trainline →
                    </a>
                  </div>
                ))}
              </div>
              <p className={styles.fareDisclaimer}>
                Fares are indicative. Always check Trainline or National Rail for live prices.
              </p>
            </div>

            {best_time_to_visit && (
              <div className={styles.sidebarCard}>
                <h2 className={styles.sidebarTitle}>Best time to visit</h2>
                <p className={styles.bestTime}>{best_time_to_visit}</p>
              </div>
            )}
          </aside>

          {/* Main content */}
          <div className={styles.mainContent}>

            {/* Highlights */}
            <section className={styles.section}>
              <h2 className={styles.sectionTitle}>What's there</h2>
              {highlights && highlights.length > 0 ? (
                <ul className={styles.highlights}>
                  {highlights.map((h, i) => (
                    <li key={i} className={styles.highlight}>{h}</li>
                  ))}
                </ul>
              ) : (
                <p className={styles.placeholder}>
                  Highlights coming soon — we're still curating this destination.
                </p>
              )}
            </section>

            {/* Tags as browseable links */}
            <section className={styles.section}>
              <h2 className={styles.sectionTitle}>Browse similar destinations</h2>
              <div className={styles.tagLinks}>
                {tags.map(tag => (
                  <Link
                    key={tag}
                    href={`/?tag=${tag}`}
                    className={`${styles.tagLink} ${styles['tagLink_' + tag.replace(/ /g,'_').replace(/&/g,'')]}`}
                  >
                    {TAG_ICONS[tag] || ''} More {tag} →
                  </Link>
                ))}
              </div>
            </section>
          </div>
        </div>
      </div>

      <footer className={styles.footer}>
        <p><strong>Rail Treasure</strong> — Finding Britain's hidden gems, one train at a time.</p>
      </footer>
    </>
  )
}
