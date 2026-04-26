import Link from 'next/link'
import { formatTime } from '../lib/destinations'
import styles from './DestinationCard.module.css'

const TAG_ICONS = {
  'coastal': '🌊', 'historic': '🏰', 'walking': '🥾', 'scenic': '🏔️',
  'foodie': '🍽️', 'countryside': '🌿', 'riverside': '🛶', 'village': '🏡',
  'nature': '🦋', 'arts & culture': '🎨', 'quiet escape': '☕', 'city break': '🏙️'
}

export default function DestinationCard({ destination, activeOrigin }) {
  const { id, name, region, tags, description, routes } = destination

  // Show routes filtered by active origin, or all routes
  const visibleRoutes = activeOrigin
    ? routes.filter(r => r.origin === activeOrigin)
    : routes

  const shortestRoute = visibleRoutes.reduce((min, r) =>
    r.travel_time_mins < min.travel_time_mins ? r : min,
    visibleRoutes[0]
  )

  const multiOrigin = new Set(routes.map(r => r.origin)).size >= 2

  return (
    <Link href={`/destinations/${id}`} className={styles.card}>
      <div className={styles.header}>
        {multiOrigin && (
          <span className={styles.multiOriginBadge}>🔀 multi-city</span>
        )}
        <span className={styles.gemBadge}>✦ hidden gem</span>
        <div className={styles.region}>{region}</div>
        <h2 className={styles.name}>{name}</h2>
        <div className={styles.tags}>
          {tags.slice(0, 3).map(tag => (
            <span key={tag} className={`${styles.tag} ${styles['tag_' + tag.replace(/ /g,'_').replace(/&/g,'')]}`}>
              {TAG_ICONS[tag] || ''} {tag}
            </span>
          ))}
        </div>
      </div>

      <div className={styles.body}>
        <p className={styles.desc}>{description}</p>

        <div className={styles.routes}>
          {visibleRoutes.map(route => (
            <div key={route.origin + route.departure_station} className={styles.route}>
              <div className={styles.routeLeft}>
                <span className={styles.routeOrigin}>from {route.departure_station}</span>
                <span className={styles.routeTime}>
                  🕐 {formatTime(route.travel_time_mins)}
                  <span className={styles.routeBand}>{route.journey_band}</span>
                </span>
              </div>
              <div className={styles.routeRight}>
                {route.advance_fare_from_gbp
                  ? <span className={styles.price}>from £{route.advance_fare_from_gbp}</span>
                  : <span className={styles.priceTbc}>check Trainline</span>
                }
              </div>
            </div>
          ))}
        </div>
      </div>
    </Link>
  )
}
