# JDC Plumbing Specialist — 3D Website

Production-oriented, mobile-first website for **JDC Specialist In Plumbing**, Brisbane / South East Queensland.

## What is built

- Interactive WebGL plumbing hero using React Three Fiber / Three.js.
- Procedural metal pipework, brass valves, JDC medallion and animated water-flow particles — no large 3D model download.
- Static SVG/CSS hero fallback while WebGL loads, when WebGL fails, or where the browser cannot support it.
- Reduced-motion support and capped WebGL device pixel ratio for mobile performance.
- Premium navy / brushed-silver / champagne-gold visual system.
- Desktop-only subtle 3D service-card tilt; touch devices stay flat and scroll normally.
- Sticky iPhone call + quote controls.
- Services, why-JDC, project gallery placeholders, Google reviews module, service area, quote form and footer.
- Central business config in `src/config/business.ts`.
- GA4 / GTM-ready conversion events in `src/lib/analytics.ts`.
- LocalBusiness / Plumber JSON-LD. Aggregate rating is injected only after verified Google Places API data is received.
- Cloudflare Pages Function at `functions/api/google-rating.ts`; Google Places secret stays server-side.

## Local development

```bash
npm install
npm run dev
npm run typecheck
npm run build
npm run preview
```

## Production deployment — Cloudflare Pages

Recommended settings:

- Framework preset: **Vite**
- Build command: `npm run build`
- Build output: `dist`
- Node compatibility: current supported version

The `/functions` directory is automatically deployed as Cloudflare Pages Functions.

### Environment variables

Browser-safe variables:

- `VITE_GOOGLE_MAPS_EMBED_KEY` — browser-restricted Maps Embed key.
- `VITE_GA4_MEASUREMENT_ID` — optional GA4 ID.
- `VITE_GTM_CONTAINER_ID` — optional GTM container. If both GTM and GA4 are present, GTM takes precedence in this implementation.

Server-only Cloudflare secrets:

- `GOOGLE_PLACES_API_KEY` — restrict this key to the Places API and keep it server-side.
- `GOOGLE_PLACE_ID` — exact JDC Google Place ID.

Do **not** prefix the Places API key with `VITE_`; that would expose it in client JavaScript.

## Business details

Edit `src/config/business.ts` only. It is the single source for phone, email, service areas, Google URLs and licence placeholders.

The current licence fields intentionally remain `TBC` until verified numbers are supplied. Do not publish invented licence details.

## Project photos / real logo

The current work gallery uses lightweight generated CSS/geometry placeholders to avoid fake job photography. Replace those panels with genuine JDC job photos when available. Keep images in AVIF/WebP where possible and target roughly 1600px on the long edge.

The 3D JDC medallion is procedural, so no logo file is required. If an official vector logo is supplied later, use SVG for the header and optionally map it onto the medallion.

## 3D performance strategy

- Three.js is split into its own lazy-loaded bundle.
- 3D loads during browser idle time rather than blocking first paint.
- Procedural geometry avoids large GLB/texture downloads.
- Canvas DPR is capped at 1.5.
- Touch action remains `pan-y`, so the hero never hijacks page scrolling.
- `prefers-reduced-motion` stops continuous animation.
- An error boundary and WebGL capability test preserve the full hero and CTAs even if rendering fails.

## Quote form

The current form does not persist personal data. It generates a pre-filled email in the visitor's mail client. This is intentionally simple and avoids a database/spam surface.

Future upgrade: add a Cloudflare Turnstile-protected `/api/lead` function, email delivery provider and optional CRM/QuoteFlow integration.
