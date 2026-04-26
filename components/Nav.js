import Link from 'next/link'
import { useState } from 'react'
import styles from './Nav.module.css'

export default function Nav() {
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <nav className={styles.nav}>
      <Link href="/" className={styles.logo}>
        <div className={styles.logoIcon}>🚂</div>
        Rail Treasure
      </Link>

      <ul className={`${styles.links} ${menuOpen ? styles.open : ''}`}>
        <li><Link href="/" onClick={() => setMenuOpen(false)}>Destinations</Link></li>
        <li><Link href="/about" onClick={() => setMenuOpen(false)}>About</Link></li>
      </ul>

      <button
        className={styles.burger}
        onClick={() => setMenuOpen(!menuOpen)}
        aria-label="Toggle menu"
      >
        <span /><span /><span />
      </button>
    </nav>
  )
}
