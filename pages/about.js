import Head from 'next/head'
import Link from 'next/link'
import Nav from '../components/Nav'
import styles from './about.module.css'

export default function About() {
  return (
    <>
      <Head>
        <title>About — Rail Treasure</title>
      </Head>
      <Nav />
      <div className={styles.page}>
        <div className={styles.inner}>
          <div className={styles.eyebrow}>Our story</div>
          <h1 className={styles.title}>Why Rail Treasure?</h1>
          <div className={styles.body}>
            <p>
              Britain has hundreds of beautiful, interesting and genuinely surprising places to visit.
              Most people never find them because every list of day trips points to the same dozen destinations.
            </p>
            <p>
              Rail Treasure exists to fix that. Every destination here has been personally curated —
              chosen because it offers something real, because it's reachable without a car, and because
              it's the kind of place that makes you feel like you've discovered something.
            </p>
            <p>
              All journey times and rail connections are verified. Fare guidance is updated periodically
              but always check <a href="https://www.thetrainline.com" target="_blank" rel="noopener noreferrer">Trainline</a> or{' '}
              <a href="https://www.nationalrail.co.uk" target="_blank" rel="noopener noreferrer">National Rail</a> for
              live pricing before you travel.
            </p>
            <Link href="/" className={styles.cta}>Browse destinations →</Link>
          </div>
        </div>
      </div>
    </>
  )
}
