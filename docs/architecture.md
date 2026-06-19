# PineGuard Architecture

PineGuard uses a static GitHub Pages architecture for the course prototype.

## Static deployment

```text
Pre-built data snapshots -> docs/data/*.csv -> docs/data/pineguard_static_data.json -> browser-side JavaScript -> dashboard and report
```

The runtime website performs template recommendation, workflow gap diagnosis, forward-test attribution, evidence visualization, and report generation in the browser.

## Production extension

A production version would replace static snapshots with user-authorized webhook ingestion, persistent databases, scheduled processing jobs, and monitoring dashboards. The static website is the public demonstration layer, not the full production backend.
