# Abhi Ram — Portfolio

A single-page portfolio built with **React + Vite + Tailwind CSS**, plus a small **Node/Express API** in `server/` that handles the contact form.

## Run locally

Requires Node.js 20+.

```bash
npm install                 # site dependencies
npm install --prefix server # API dependencies

npm run dev                 # site at http://localhost:5173
npm run dev:api             # API at http://localhost:3001 (run in a second terminal)
```

In dev, Vite forwards `/api/*` requests to the API, so the contact form works with no extra setup.
Without email settings, the API saves messages to `server/messages.jsonl` instead of emailing them.

Other commands:

```bash
npm run build               # production build in dist/
npm run preview             # serve the production build locally
npm test --prefix server    # API tests
```

## Edit the content

All content lives in `src/data/`. You shouldn't need to touch the components.

| File | What's in it |
| --- | --- |
| `src/data/site.js` | Name, hero headline and intro, quick facts, nav links, contact links |
| `src/data/projects.js` | `projects` (Selected work) and `hackathons`: title, kind, description, details, tags, GitHub link |
| `src/data/skills.js` | Skill groups |

**Profile photo:** replace `public/profile.jpg` with your own photo. A portrait around 4:5 works best.

## Contact form API (`server/`)

| Route | What it does |
| --- | --- |
| `GET /api/health` | Returns `{ "ok": true }` |
| `POST /api/contact` | Takes `{ name, email, message }`, validates it and emails it to you |

Spam protection: a hidden honeypot field (bots fill it, the API silently drops those), and a limit of 5 messages per IP per hour.

### Email setup

1. Copy `server/.env.example` to `server/.env`.
2. Fill in `SMTP_USER` (your Gmail address) and `SMTP_PASS`. For Gmail this must be an **App Password**
   (Google Account → Security → 2-Step Verification → App passwords), not your normal password.
3. Restart `npm run dev:api`. Messages now arrive in `MAIL_TO`, and hitting Reply answers the sender directly.

`.env` is git-ignored. Never commit it.

## Deploy

The site and the API deploy separately: GitHub Pages can only serve static files.

### 1. API on Render (free)

1. Push the repo to GitHub.
2. On [render.com](https://render.com): **New → Blueprint**, pick the repo. It reads `render.yaml`.
3. When asked, set `SMTP_USER`, `SMTP_PASS`, and `ALLOWED_ORIGINS` (your site's origin, e.g. `https://abhiram35.github.io`, no path).
4. Once it's live, open `https://<your-service>.onrender.com/api/health` and check it says `{"ok":true}`.

Free Render services sleep after 15 minutes idle, so the first message after a quiet spell can take up to a minute to send.

### 2. Site on GitHub Pages

The workflow in `.github/workflows/deploy.yml` builds and deploys every push to `main`.

1. In the repo, go to **Settings → Pages → Build and deployment** and set **Source** to **GitHub Actions**.
2. Go to **Settings → Secrets and variables → Actions → Variables** and add `VITE_API_URL` = your Render URL (e.g. `https://portfolio-api.onrender.com`).
3. Push to `main`. The site will be published at `https://abhiram35.github.io/<repo-name>/`.

If `VITE_API_URL` isn't set, the form falls back to opening the visitor's email app with the message filled in.

The workflow sets `BASE_PATH=/<repo-name>/` so asset URLs resolve under that path. If the repo is named `abhiram35.github.io` (a user site served from the root), change `BASE_PATH` in the workflow to `/`.

## Project structure

```
src/
  components/   Navbar, Hero, Section (shared layout), ProjectList, Projects,
                Activity (hackathons), Skills, Contact, Toast, Footer
  data/         site.js, projects.js, skills.js  ← edit these
  index.css     Tailwind layers and color tokens (light + dark)
public/         favicon.svg, profile.jpg
server/
  src/index.js     Express app: CORS, JSON parsing, routes, error handling
  src/contact.js   POST /api/contact: honeypot, rate limit, validation
  src/mailer.js    Sends mail via SMTP, or saves to messages.jsonl when not configured
  .env.example     Settings template
render.yaml     Render deploy config for the API
```
