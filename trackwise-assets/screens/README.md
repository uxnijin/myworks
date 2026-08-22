# Trackwise — individual screen captures

2× (2880 × 1800) captures of the running app. Trackwise is a Vite/React app
with real URL routes, so the capture script navigates rather than clicking.

```bash
# start the dev server first — preview_start name: "trackwise" (port 4173)
node tools/trackwise_capture.js light 4173
node tools/trackwise_capture.js dark 4173
tools/web_figures.sh trackwise-assets <name>:<set>/<screen> …
```

Persona and appearance live in localStorage under `trackwise.devstate.v1`. The
script seeds `{personaId: 'business', dataState: 'ready', colorScheme: <mode>}`
before the app boots, so a run is deterministic and the Business-only screens
(analytics, branded pages) are reachable.

Parcel detail needs a real id. The Business workspace is `MERCHANT_PARCELS`,
seeded 133, so ids run `pcl_133_000` upward — the script resolves one from the
DOM first and only falls back to that, so a reseed does not silently break it.

| File | Screen |
|---|---|
| `01-landing.png` | Landing — one field, carrier auto-detected |
| `02-public-track.png` | Public tracking: the answer, then share |
| `03-pricing.png` | Pricing, every limit on one page |
| `04-signin.png` | Sign in / create account |
| `10-home.png` | Workspace home — triage first |
| `11-parcels.png` | All parcels, scopes as tabs |
| `12-attention.png` | Needs attention |
| `13-parcel-detail.png` | One parcel, merged across carriers |
| `14-add.png` | Add parcels — three ways in |
| `15-alerts.png` | Alerts, grouped by day and channel |
| `16-analytics.png` | WISMO deflection, carrier performance, accuracy |
| `17-branded.png` | The branded-page builder |
| `18-integrations.png` | Integrations, with real states |
| `19-inbox.png` | Inbox scans |
| `20-api-keys.png` | API keys |
| `21-webhooks.png` | Webhooks and delivery attempts |
| `22-event-log.png` | The event log |
| `23-plans.png` | Plans |
| `24-billing.png` | Billing and quota |
