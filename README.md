# Felker Brothers — Redesign Concept

Standalone pitch demo for [Felker Brothers Corporation](https://www.felkerbrothers.com/) — **not affiliated** with Felker. Built by [HVZEweb](https://hvzeweb.netlify.app) as an unsolicited B2B outreach concept.

## What's inside

| File | Purpose |
|------|---------|
| `index.html` | Homepage — hero, divisions, certifications |
| `products.html` | Product hub with links to real Felker PDFs/pages |
| `about.html` | Company history & locations |
| `contact.html` | Quote form (demo only) |
| `pitch-one-pager.html` | Print-ready PDF pitch → **Ctrl+P / Save as PDF** |

## Live

| | URL |
|---|---|
| **Demo site** | https://felker-redesign.netlify.app |
| **Pitch PDF** | https://felker-redesign.netlify.app/pitch-one-pager.html |
| **GitHub** | https://github.com/HVZEweb/felker-redesign |
| **Netlify admin** | https://app.netlify.com/projects/felker-redesign |

Auto-deploy: push to `main` on GitHub → Netlify rebuilds.

## Local preview

Open `index.html` in a browser, or from repo root:

```bash
npx serve felker-pitch
```

Then visit `http://localhost:3000`.

## Deploy (already set up)

Repo: **HVZEweb/felker-redesign** · Site: **felker-redesign.netlify.app**

To redeploy manually from this folder:

```bash
npx netlify-cli deploy --prod --dir=.
```

To clone elsewhere:

```bash
git clone https://github.com/HVZEweb/felker-redesign.git
cd felker-redesign
```

## Outreach

1. Send **pitch-one-pager.pdf** (print from `pitch-one-pager.html`)
2. Link to live demo: `https://felker-redesign.netlify.app`
3. Contact Felker via phone **800-826-2304** or LinkedIn — keep message short, link demo first

## Notes

- Form submissions are **not sent** — demo toast only
- Real Felker contact data used for authenticity; demo ribbon clarifies non-affiliation
- `robots.txt` blocks indexing to avoid SEO confusion with the real Felker site
