import styles from './FilterBar.module.css'

const TAG_ICONS = {
  'coastal': '🌊', 'historic': '🏰', 'walking': '🥾', 'scenic': '🏔️',
  'foodie': '🍽️', 'countryside': '🌿', 'riverside': '🛶', 'village': '🏡',
  'nature': '🦋', 'arts & culture': '🎨', 'quiet escape': '☕', 'city break': '🏙️'
}

export default function FilterBar({ tags, activeTag, onTagChange }) {
  return (
    <div className={styles.bar}>
      <div className={styles.inner}>
        <button
          className={`${styles.chip} ${activeTag === 'all' ? styles.active : ''}`}
          onClick={() => onTagChange('all')}
        >
          All destinations
        </button>
        {tags.map(tag => (
          <button
            key={tag}
            className={`${styles.chip} ${activeTag === tag ? styles.active : ''}`}
            onClick={() => onTagChange(tag)}
          >
            {TAG_ICONS[tag] || ''} {tag}
          </button>
        ))}
      </div>
    </div>
  )
}
