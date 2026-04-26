import { useState } from 'react'
import Head from 'next/head'
import Nav from '../components/Nav'
import styles from './newsletter.module.css'

const SAMPLE_SPOTLIGHTS = [
  {
    name: "Faversham",
    region: "South East England",
    badge: "local secret",
    teaser: "Britain's oldest brewery, a working creek and one of the finest market towns in Kent — and almost nobody goes.",
    time: "1h from London",
    fare: "from £12.50",
    tags: ["historic", "foodie"],
    emoji: "🍺"
  },
  {
    name: "Knaresborough",
    region: "Yorkshire",
    badge: "hidden gem",
    teaser: "A clifftop viaduct, a castle ruin above a river gorge and petrifying wells. Yorkshire at its most dramatic.",
    time: "20m from York",
    fare: "from £5.10",
    tags: ["scenic", "historic"],
    emoji: "🏰"
  },
  {
    name: "Bradford-on-Avon",
    region: "South West England",
    badge: "local secret",
    teaser: "A Saxon church 1,300 years old, a tithe barn unchanged since the 14th century and tea rooms in a bridge chapel.",
    time: "12m from Bath",
    fare: "from £8.50",
    tags: ["historic", "village"],
    emoji: "🌿"
  }
]

export default function Newsletter() {
  const [email, setEmail]     = useState('')
  const [name, setName]       = useState('')
  const [submitted, setSubmitted] = useState(false)
  const [error, setError]     = useState('')

  function handleSubmit(e) {
    e.preventDefault()
    if (!email || !email.includes('@')) {
      setError('Please enter a valid email address.')
      return
    }
    // In production, this would POST to your email service (Mailchimp, Resend, etc.)
    // For now, simulate success
    setSubmitted(true)
    setError('')
  }

  return (
    <>
      <Head>
        <title>The Rail Treasure Newsletter — 3 hidden gems, every week</title>
        <meta name="description" content="Every week, three hidden gem destinations in the spotlight — with journey times, fares and the story of why they're worth the trip." />
      </Head>

      <a href="#main" className="skip-link">Skip to content</a>
      <Nav />

      {/* HERO */}
      <div className={styles.hero}>
        <div className={styles.heroInner}>
          <div className={styles.eyebrow}>Weekly newsletter</div>
          <h1 className={styles.title}>
            Three hidden gems.<br />Every week. By rail.
          </h1>
          <p className={styles.subtitle}>
            Every week we put three destinations in the spotlight — places that deserve more
            attention, with the journey details to actually get there.
            No sponsored content. No algorithm. Just curation.
          </p>
        </div>
      </div>

      <main className={styles.main} id="main">

        {/* SIGN UP FORM */}
        <section className={styles.signupSection}>
          <div className={styles.signupCard}>
            {submitted ? (
              <div className={styles.successState}>
                <div className={styles.successIcon}>✓</div>
                <h2>You're on the list</h2>
                <p>
                  Thank you — your first issue will arrive next week. In the meantime,
                  explore all 57 destinations on the site.
                </p>
                <a href="/" className={styles.exploreBtn}>Browse destinations →</a>
              </div>
            ) : (
              <>
                <div className={styles.formHeader}>
                  <h2>Join the newsletter</h2>
                  <p>Free, weekly, and you can unsubscribe any time. We never share your details.</p>
                </div>

                <form className={styles.form} onSubmit={handleSubmit} noValidate>
                  <div className={styles.formRow}>
                    <div className={styles.formField}>
                      <label htmlFor="name" className={styles.label}>First name</label>
                      <input
                        id="name"
                        type="text"
                        className={styles.input}
                        placeholder="Your first name"
                        value={name}
                        onChange={e => setName(e.target.value)}
                        autoComplete="given-name"
                      />
                    </div>
                    <div className={styles.formField}>
                      <label htmlFor="email" className={styles.label}>Email address <span aria-hidden="true">*</span></label>
                      <input
                        id="email"
                        type="email"
                        className={styles.input}
                        placeholder="your@email.com"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                        required
                        autoComplete="email"
                      />
                    </div>
                  </div>
                  {error && <p className={styles.error} role="alert">{error}</p>}
                  <button type="submit" className={styles.submitBtn}>
                    Subscribe — it's free →
                  </button>
                  <p className={styles.privacy}>
                    By subscribing you agree to receive weekly emails from Rail Treasure.
                    Unsubscribe at any time — no questions asked.
                  </p>
                </form>
              </>
            )}
          </div>
        </section>

        {/* WHAT'S INSIDE */}
        <section className={styles.previewSection}>
          <div className={styles.previewInner}>
            <h2 className={styles.previewHeading}>What's in each issue</h2>
            <p className={styles.previewSub}>
              Every Sunday morning, three destinations get the spotlight. Here's a taste of what that looks like.
            </p>

            {/* Sample issue */}
            <div className={styles.sampleIssue}>
              <div className={styles.issueHeader}>
                <span className={styles.issueBadge}>Sample issue</span>
                <span className={styles.issueDate}>Sunday edition</span>
              </div>
              <h3 className={styles.issueTitle}>This week's three gems</h3>

              <div className={styles.spotlights}>
                {SAMPLE_SPOTLIGHTS.map((spot, i) => (
                  <div key={spot.name} className={styles.spotlight}>
                    <div className={styles.spotNum}>{i + 1}</div>
                    <div className={styles.spotContent}>
                      <div className={styles.spotHeader}>
                        <span className={styles.spotEmoji} aria-hidden="true">{spot.emoji}</span>
                        <div>
                          <div className={styles.spotName}>{spot.name}</div>
                          <div className={styles.spotRegion}>{spot.region}</div>
                        </div>
                        <span className={styles.spotBadge}>✦ {spot.badge}</span>
                      </div>
                      <p className={styles.spotTeaser}>{spot.teaser}</p>
                      <div className={styles.spotMeta}>
                        <span className={styles.spotTime}>🕐 {spot.time}</span>
                        <span className={styles.spotFare}>{spot.fare}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className={styles.issueFooter}>
                <p>Each destination links through to the full page with journey details, highlights and booking.</p>
              </div>
            </div>
          </div>
        </section>

        {/* WHY SUBSCRIBE */}
        <section className={styles.reasonsSection}>
          <div className={styles.reasonsInner}>
            <h2>Why subscribe?</h2>
            <div className={styles.reasonsGrid}>
              <div className={styles.reason}>
                <div className={styles.reasonIcon}>📍</div>
                <h3>Three places, every week</h3>
                <p>Curated destinations in the spotlight — the story, the train details and what makes them worth the trip.</p>
              </div>
              <div className={styles.reason}>
                <div className={styles.reasonIcon}>🚂</div>
                <h3>Rail-first, always</h3>
                <p>Every destination is chosen because it's remarkable by train. Journey times and advance fares included in every issue.</p>
              </div>
              <div className={styles.reason}>
                <div className={styles.reasonIcon}>✦</div>
                <h3>No algorithms. No ads.</h3>
                <p>Somewhere a person has thought carefully about, not what's trending. Honest, independent curation.</p>
              </div>
              <div className={styles.reason}>
                <div className={styles.reasonIcon}>📅</div>
                <h3>Seasonal thinking</h3>
                <p>We match destinations to the time of year — best walks for autumn, coastal escapes for summer, cathedral cities for winter.</p>
              </div>
            </div>
          </div>
        </section>

        {/* SECOND SIGN UP */}
        <section className={styles.secondSignup}>
          <div className={styles.secondSignupInner}>
            <h2>Ready to explore?</h2>
            <p>Join the newsletter and get three hidden gems in your inbox every Sunday.</p>
            {!submitted ? (
              <form className={styles.inlineForm} onSubmit={handleSubmit} noValidate>
                <label htmlFor="email2" className="sr-only">Email address</label>
                <input
                  id="email2"
                  type="email"
                  className={styles.inlineInput}
                  placeholder="your@email.com"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  required
                  autoComplete="email"
                />
                <button type="submit" className={styles.inlineBtn}>Subscribe free →</button>
              </form>
            ) : (
              <p className={styles.alreadySubscribed}>✓ You're subscribed — thank you!</p>
            )}
          </div>
        </section>

      </main>

            <footer className={styles.footer}>
        <p>Finding Britain's hidden gems, one train at a time.</p>
      </footer>
    </>
  )
}
