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

## Local preview

Open `index.html` in a browser, or from repo root:

```bash
npx serve felker-pitch
```

Then visit `http://localhost:3000`.

## Deploy to Netlify (separate project)

1. Create a **new GitHub repo** (e.g. `HVZEweb/felker-redesign`)
2. Push only this folder:

```bash
cd felker-pitch
git init
git add .
git commit -m "Felker Brothers redesign concept demo"
git branch -M main
git remote add origin git@github.com:HVZEweb/felker-redesign.git
git push -u origin main
```

3. In [Netlify](https://app.netlify.com): **Add new site → Import from Git**
4. Base directory: leave empty if repo root *is* this folder, or set publish directory to `.`
5. Suggested site name: `felker-redesign` → URL: `https://felker-redesign.netlify.app`

After deploy, update `felkerPitchUrl` in the main HVZEweb `js/config.js`.

## Outreach

1. Send **pitch-one-pager.pdf** (print from `pitch-one-pager.html`)
2. Link to live demo: `https://felker-redesign.netlify.app`
3. Contact Felker via phone **800-826-2304** or LinkedIn — keep message short, link demo first

## Notes

- Form submissions are **not sent** — demo toast only
- Real Felker contact data used for authenticity; demo ribbon clarifies non-affiliation
- `robots.txt` blocks indexing to avoid SEO confusion with the real Felker site
