# ShipFlow — individual page captures

2× (2880 × 1800) captures of the real build. ShipFlow is static HTML with no
build step, so headless Chrome opens the files directly over `file://` — no
server needed.

```bash
node tools/shipflow_capture.js light
node tools/shipflow_capture.js dark
tools/web_figures.sh shipflow-assets <name>:<set>/<screen> …
```

The theme lives on `data-theme` at the root and in localStorage; the script
sets both after load. The command palette is a ⌘K keystroke, so it gets its own
pass at the end.

| File | Page |
|---|---|
| `01-dashboard.png` | Shipments — the triage screen |
| `02-shipment.png` | One shipment, with its timeline |
| `03-exceptions.png` | The exception queue |
| `04-calendar.png` | Delivery calendar |
| `05-import.png` | CSV import, with partial-success reporting |
| `06-reports.png` | Trends, drawn on canvas |
| `07-notifications.png` | Notification centre |
| `08-inbox.png` | Inbox scan |
| `09-settings.png` | Settings |
| `10-login.png` | Sign-in |
| `11-style-guide.png` | The living style guide |
| `12-not-found.png` | 404 |
| `20-command-palette.png` | ⌘K, over the dashboard |
