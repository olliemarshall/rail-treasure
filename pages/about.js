import Head from 'next/head'
import Link from 'next/link'
import Nav from '../components/Nav'
import styles from './about.module.css'

export default function About() {
  return (
    <>
      <Head>
        <title>About Rail Treasure — Britain by rail</title>
        <meta name="description" content="Rail Treasure exists to show Britain at its most beautiful — the places that don't make the lists, reachable by train. No car needed." />
      </Head>

      <a href="#main" className="skip-link">Skip to content</a>
      <Nav />

      {/* HERO — full-width North Yorkshire landscape */}
      <div className={styles.hero}>
        <img
          src="https://images.unsplash.com/photo-1693988738703-7db9cb504a5a?w=1400&q=85"
          alt="North York Moors at sunset — heather fields stretching to the horizon"
          className={styles.heroImg}
        />
        <div className={styles.heroOverlay}>
          <div className={styles.heroInner}>
            <div className={styles.eyebrow}>Our story</div>
            <h1 className={styles.heroTitle}>Britain is extraordinary.<br />Most of it goes unseen.</h1>
          </div>
        </div>
      </div>

      <main className={styles.main} id="main">
        <div className={styles.inner}>

          {/* Opening statement */}
          <section className={styles.section}>
            <div className={styles.lead}>
              <p>
                Every weekend, millions of people make the same ten day trips. The same coastal towns,
                the same market cities, the same destinations every travel guide has been recommending
                for a decade. Meanwhile, a few miles down the line, a medieval village sits quietly
                beautiful and entirely overlooked.
              </p>
              <p>
                Rail Treasure exists to fix that.
              </p>
            </div>
          </section>

          {/* Two-column section */}
          <section className={styles.splitSection}>
            <div className={styles.splitImage}>
              <img
                src="https://images.unsplash.com/photo-1663179717358-acd28623a728?w=700&q=85"
                alt="A train travelling through lush green British countryside"
                className={styles.splitImg}
              />
            </div>
            <div className={styles.splitText}>
              <h2>The joy of going by rail</h2>
              <p>
                There is something different about a journey made by train. The countryside arrives
                in its own time — rolling hills, river valleys, cathedral spires rising on the horizon.
                You don't fight traffic or spend the last hour of the journey looking for a car park.
                You step off at a station in the heart of a town and you're already there.
              </p>
              <p>
                Britain's rail network reaches further than most people realise. Tiny stations in the
                middle of the South Downs. A halt beside the River Nidd in Yorkshire, where a gorge
                and castle ruin wait five minutes' walk away. A platform in the New Forest where ponies
                graze beside the tracks. These places exist, and they're reachable without a car —
                sometimes in less than an hour from a major city.
              </p>
            </div>
          </section>

          {/* Values section */}
          <section className={styles.valuesSection}>
            <h2 className={styles.valuesSectionTitle}>What we stand for</h2>
            <div className={styles.valuesGrid}>
              <div className={styles.value}>
                <div className={styles.valueIcon}>✦</div>
                <h3>Honest curation</h3>
                <p>Every destination here has been chosen because it genuinely deserves to be. Not because it's sponsored, not because it's famous. Because it's beautiful, interesting, or surprising — and because you can get there by train.</p>
              </div>
              <div className={styles.value}>
                <div className={styles.valueIcon}>🚂</div>
                <h3>Rail first</h3>
                <p>We believe rail travel is not a compromise — it's an upgrade. Every destination on this site is reachable by train from at least one major city, with real journey times and honest fare guidance so you can actually plan the trip.</p>
              </div>
              <div className={styles.value}>
                <div className={styles.valueIcon}>🌿</div>
                <h3>Lower carbon, higher reward</h3>
                <p>Train travel produces a fraction of the carbon of car or short-haul flight journeys. Choosing the train isn't a sacrifice — it's part of a slower, more present way of travelling that we think makes the destination better.</p>
              </div>
              <div className={styles.value}>
                <div className={styles.valueIcon}>🗺️</div>
                <h3>Off the well-worn path</h3>
                <p>Whitstable instead of Brighton. Malton instead of York. Faversham instead of Canterbury. We're not interested in the obvious — we're interested in the places that reward the curious traveller who looks one step further.</p>
              </div>
            </div>
          </section>

          {/* Pull quote */}
          <section className={styles.quoteSection}>
            <blockquote className={styles.pullQuote}>
              "The window seat on a train through the Pennines, the Avon valley, the North York Moors —
              this is Britain at its most honest and most beautiful."
            </blockquote>
          </section>

          {/* Second image + text */}
          <section className={`${styles.splitSection} ${styles.splitReverse}`}>
            <div className={styles.splitText}>
              <h2>Curated by people, not algorithms</h2>
              <p>
                Every description, every highlight list, every best-time-to-visit note on this site has
                been written by a human who has thought carefully about what makes a place worth the
                journey. We don't scrape review aggregators. We don't rank by popularity.
              </p>
              <p>
                We ask one question: if someone steps off this train for the first time, what will they
                find, and will it be worth it? If the answer is yes — genuinely yes, not
                "it's fine" — it goes on the site.
              </p>
              <p>
                We're building this slowly and carefully. 57 destinations today. More added only when
                we're confident they belong.
              </p>
            </div>
            <div className={styles.splitImage}>
              <img
                src="https://images.unsplash.com/photo-1535535112387-56ffe8db21ff?w=700&q=85"
                alt="A steam train passing through spring woodland on the Severn Valley Railway, England"
                className={styles.splitImg}
              />
            </div>
          </section>

          {/* CTA strip */}
          <section className={styles.ctaSection}>
            <h2>Start exploring</h2>
            <p>57 hidden gems, six departure cities, one rule: no car required.</p>
            <div className={styles.ctaButtons}>
              <Link href="/" className={styles.ctaPrimary}>Browse all destinations →</Link>
              <Link href="/regions" className={styles.ctaSecondary}>Explore by region →</Link>
              <Link href="/newsletter" className={styles.ctaSecondary}>Join the newsletter →</Link>
            </div>
          </section>

          {/* Fare disclaimer */}
          <section className={styles.disclaimer}>
            <p>
              <strong>A note on fares:</strong> Rail prices shown are indicative advance fares
              based on research in April 2026. UK rail fares vary significantly by date, time and
              booking lead time. Always check{' '}
              <a href="https://www.thetrainline.com" target="_blank" rel="noopener noreferrer">Trainline</a>{' '}
              or{' '}
              <a href="https://www.nationalrail.co.uk" target="_blank" rel="noopener noreferrer">National Rail</a>{' '}
              for live pricing before you travel.
            </p>
          </section>

        </div>
      </main>

            <footer className={styles.footer}>
        <p>Finding Britain's hidden gems, one train at a time.</p>
      </footer>
    </>
  )
}
