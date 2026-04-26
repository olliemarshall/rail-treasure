# Rail Treasure

Hidden gem destinations across Britain, found by rail.

## Getting started

### 1. Install dependencies

Open a terminal, navigate to this folder, and run:

```bash
npm install
```

This downloads Next.js and React — takes about a minute.

### 2. Run the development server

```bash
npm run dev
```

Then open your browser and go to: **http://localhost:3000**

You should see the full site running locally. Any changes you make to files
will update the browser automatically.

### 3. Adding or editing destinations

All destination data lives in **`data/destinations.json`**.

Open it in VS Code, find the destination you want to update, and fill in:

- `"highlights"` — add 3–5 strings describing what to do/see
- `"best_time_to_visit"` — e.g. `"April to October"`
- `"advance_fare_from_gbp"` — e.g. `12.5` (a number, no £ sign)
- `"operator"` — e.g. `"Southeastern"` or `"GWR"`

Save the file — the site updates automatically.

### 4. Build for production

```bash
npm run build
```

This generates the final static files ready for deployment.

---

## Deploying to Vercel

1. Push this folder to GitHub (see GitHub Desktop guide below)
2. Go to [vercel.com](https://vercel.com) and sign in with GitHub
3. Click **Add New Project** → select your repository
4. Click **Deploy** — no settings needed, Vercel detects Next.js automatically

Your site will be live at `your-project-name.vercel.app` within about 60 seconds.

### Adding a custom domain

1. Buy your domain (e.g. `railtreasure.co.uk`) from Namecheap or 123-reg
2. In Vercel → your project → Settings → Domains → Add domain
3. Follow the DNS instructions Vercel provides (copy two records into your domain registrar)
4. Done — usually live within 10 minutes

---

## Project structure

```
rail-treasure/
├── data/
│   └── destinations.json     ← ALL your destination data lives here
├── pages/
│   ├── index.js              ← Homepage (search + grid)
│   ├── about.js              ← About page
│   └── destinations/
│       └── [id].js           ← Individual destination pages (auto-generated)
├── components/
│   ├── Nav.js                ← Navigation bar
│   ├── DestinationCard.js    ← Card used in the homepage grid
│   └── FilterBar.js          ← Tag filter chips
├── lib/
│   └── destinations.js       ← Helper functions for reading the JSON
└── styles/
    └── globals.css           ← Global styles and CSS variables
```

---

## Using GitHub Desktop (recommended for non-developers)

1. Download [GitHub Desktop](https://desktop.github.com)
2. Sign in with your GitHub account
3. File → Add Local Repository → select this folder
4. Publish to GitHub (top right button)
5. After any changes: write a short message in the bottom left → click **Commit** → **Push origin**

Vercel will automatically redeploy every time you push.
