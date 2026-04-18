# The Phone House UK — Lead Generation Web App

Premium, animated marketing site for a UK phone deals business. Built with **Next.js 16.2.4** (App Router), **TypeScript**, **Tailwind CSS v4**, **Framer Motion**, and **React Three Fiber** (lazy-loaded 3D hero).

## Features

- Conversion-focused landing page with glassmorphism lead form
- POST to **Google Apps Script** → Google Sheet
- **Meta Pixel** (`PageView` on navigation, `Lead` on successful submit)
- Thank-you page with animated checkmark
- Mobile **sticky CTA** and optional **exit-intent** modal
- SEO metadata + Open Graph (UK-focused)

## Getting started

```bash
npm install
cp .env.example .env.local
# edit .env.local — see below
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Environment variables

| Variable | Required | Description |
|----------|----------|-------------|
| `NEXT_PUBLIC_GOOGLE_SCRIPT_URL` | **Yes** (for live submits) | Web app URL from Google Apps Script |
| `NEXT_PUBLIC_META_PIXEL_ID` | No | Meta Pixel ID (digits only) |
| `NEXT_PUBLIC_SITE_URL` | Recommended | Canonical URL for Open Graph (your Vercel URL) |

**Where to add the webhook URL:** create `.env.local` in the project root and set `NEXT_PUBLIC_GOOGLE_SCRIPT_URL=...`. The same file is used on Vercel under **Settings → Environment Variables**.

**Where to add the Meta Pixel ID:** set `NEXT_PUBLIC_META_PIXEL_ID` in `.env.local` (local) and in Vercel env vars (production). If unset, the pixel script is not injected.

## Deploy to Vercel (free tier)

1. Push this repository to GitHub (or GitLab / Bitbucket).
2. In [Vercel](https://vercel.com), **Add New Project** → import the repo.
3. Framework preset: **Next.js**. Root directory: repo root.
4. Add environment variables (`NEXT_PUBLIC_*` as above).
5. Deploy. After the first deploy, set `NEXT_PUBLIC_SITE_URL` to your production URL (e.g. `https://your-app.vercel.app`) and redeploy so Open Graph URLs are correct.

No paid add-ons are required for hosting or for the integrations in this template.

## Google Sheets + Apps Script

1. Create a new **Google Sheet** with headers in row 1, e.g.:  
   `name | email | phone | model | condition | createdAt`
2. **Extensions → Apps Script** and use a `doPost` handler that reads JSON and appends a row.

Example:

```javascript
function doPost(e) {
  try {
    const body = JSON.parse(e.postData.contents);
    const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheets()[0];
    sheet.appendRow([
      body.name,
      body.email,
      body.phone,
      body.model,
      body.condition,
      body.createdAt,
    ]);
    return ContentService
      .createTextOutput(JSON.stringify({ ok: true }))
      .setMimeType(ContentService.MimeType.JSON);
  } catch (err) {
    return ContentService
      .createTextOutput(JSON.stringify({ ok: false, error: String(err) }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}
```

3. **Deploy → New deployment** → type **Web app**  
   - Execute as: **Me**  
   - Who has access: **Anyone** (needed for browser `fetch` from your site)
4. Copy the **Web app URL** and set it as `NEXT_PUBLIC_GOOGLE_SCRIPT_URL`.

The app sends this JSON body:

```json
{
  "name": "",
  "email": "",
  "phone": "",
  "model": "",
  "condition": "new | used | broken",
  "createdAt": "ISO-8601 timestamp"
}
```

If CORS errors appear in the browser console, confirm the deployment is a **Web app** URL ending in `/exec`, redeploy after script changes, and keep access as **Anyone**.

## Project structure

```
app/                 App Router pages, layout, global styles, template (page transitions)
components/
  effects/           Lazy 3D phones + CSS fallback
  form/              Lead form + model combobox
  layout/            Header / footer
  marketing/         Exit-intent modal
  mobile/            Sticky mobile CTA
  pixel/             Meta Pixel loader + SPA PageView
  sections/          Hero, trust, testimonials
  ui/                Shared UI (button, motion section)
hooks/               `useLeadForm`, `useExitIntent`
lib/                 Submit helper, Meta helpers, phone list, `cn`
types/               Lead payload typing
```

## Performance notes

- The Three.js scene is **code-split** (`next/dynamic` + `ssr: false`) and skipped when `prefers-reduced-motion: reduce` is set.
- Meta Pixel loads with `next/script` **`lazyOnload`** to avoid blocking first paint.

## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Development server |
| `npm run build` | Production build |
| `npm run start` | Start production server locally |
| `npm run lint` | ESLint |

## Licence

Use and modify freely for your business.
