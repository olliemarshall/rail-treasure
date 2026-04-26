import Link from 'next/link'
import { useState } from 'react'
import { useRouter } from 'next/router'
import Image from 'next/image'
import styles from './Nav.module.css'

const REGIONS = [
  { label: 'South East England', slug: 'south-east-england' },
  { label: 'South West England', slug: 'south-west-england' },
  { label: 'East of England',    slug: 'east-of-england' },
  { label: 'Yorkshire',          slug: 'yorkshire' },
  { label: 'Peak District',      slug: 'peak-district' },
  { label: 'North West England', slug: 'north-west-england' },
  { label: 'Wales',              slug: 'wales' },
]

export default function Nav() {
  const [menuOpen, setMenuOpen]       = useState(false)
  const [regionsOpen, setRegionsOpen] = useState(false)
  const router = useRouter()

  return (
    <nav className={styles.nav} aria-label="Main navigation">
      <Link href="/" className={styles.logo} aria-label="Rail Treasure home">
        <div className={styles.logoIcon}>
          <Image src="/logo.png" alt="Rail Treasure" width={160} height={48} priority style={{width:'auto',height:'2.4rem'}} />
        </div>
        <span className={styles.logoText}>Rail Treasure</span>
      </Link>

      {/* Desktop links */}
      <ul className={styles.links} role="list">
        <li>
          <Link
            href="/"
            className={`${styles.link} ${router.pathname === '/' ? styles.active : ''}`}
          >
            Destinations
          </Link>
        </li>

        {/* Regions dropdown */}
        <li
          className={styles.dropdown}
          onMouseEnter={() => setRegionsOpen(true)}
          onMouseLeave={() => setRegionsOpen(false)}
        >
          <button
            className={`${styles.link} ${styles.dropdownTrigger} ${router.pathname.startsWith('/regions') ? styles.active : ''}`}
            aria-haspopup="true"
            aria-expanded={regionsOpen}
            onClick={() => setRegionsOpen(!regionsOpen)}
          >
            Regions
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden="true">
              <polyline points="6 9 12 15 18 9" />
            </svg>
          </button>
          {regionsOpen && (
            <ul className={styles.dropdownMenu} role="list">
              <li>
                <Link href="/regions" className={styles.dropdownAll} onClick={() => setRegionsOpen(false)}>
                  All regions
                </Link>
              </li>
              {REGIONS.map(r => (
                <li key={r.slug}>
                  <Link
                    href={`/regions/${r.slug}`}
                    className={styles.dropdownItem}
                    onClick={() => setRegionsOpen(false)}
                  >
                    {r.label}
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </li>

        <li>
          <Link
            href="/newsletter"
            className={`${styles.link} ${router.pathname === '/newsletter' ? styles.active : ''}`}
          >
            Newsletter
          </Link>
        </li>

        <li>
          <Link
            href="/about"
            className={`${styles.link} ${router.pathname === '/about' ? styles.active : ''}`}
          >
            About
          </Link>
        </li>
      </ul>

      {/* Mobile burger */}
      <button
        className={styles.burger}
        onClick={() => setMenuOpen(!menuOpen)}
        aria-label={menuOpen ? 'Close menu' : 'Open menu'}
        aria-expanded={menuOpen}
      >
        <span className={menuOpen ? styles.burgerOpen : ''} aria-hidden="true" />
        <span className={menuOpen ? styles.burgerOpen : ''} aria-hidden="true" />
        <span className={menuOpen ? styles.burgerOpen : ''} aria-hidden="true" />
      </button>

      {/* Mobile menu */}
      {menuOpen && (
        <div className={styles.mobileMenu} role="dialog" aria-label="Mobile navigation">
          <Link href="/" className={styles.mobileLink} onClick={() => setMenuOpen(false)}>Destinations</Link>
          <div className={styles.mobileSectionLabel}>Regions</div>
          {REGIONS.map(r => (
            <Link key={r.slug} href={`/regions/${r.slug}`} className={styles.mobileLinkIndent} onClick={() => setMenuOpen(false)}>
              {r.label}
            </Link>
          ))}
          <Link href="/newsletter" className={styles.mobileLink} onClick={() => setMenuOpen(false)}>Newsletter</Link>
          <Link href="/about" className={styles.mobileLink} onClick={() => setMenuOpen(false)}>About</Link>
        </div>
      )}
    </nav>
  )
}
