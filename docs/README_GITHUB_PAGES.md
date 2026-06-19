# PineGuard: Static Strategy Validation Product

PineGuard is a static GitHub Pages prototype for a data monetization system around TradingView-style strategy workflows. The product does not sell trading signals or promise profitable strategies. It monetizes the validation layer: user preference data, alert-event logs, market-price snapshots, strategy templates, demand-evidence tables, forward-test outcomes, and downloadable strategy health reports.

Student ID: `r12323059`

Repository: https://github.com/r12922076/bda_final

Live demo: https://r12922076.github.io/bda_final/

## Target customer

The initial target customer is a paid TradingView power user who uses Pine Script strategies, Strategy Tester, alerts, webhook-style automation, public indicators, or paid scripts, but lacks a structured way to validate whether those strategy workflows are complete, credible, and monitorable after deployment.

The strongest beachhead segment is the alert-heavy user. This segment already produces event data, so PineGuard can create value by logging alert events, attributing forward-test outcomes, and generating a strategy health report.

## What the website demonstrates

The static website demonstrates four product mechanisms:

1. **Template recommendation**: user style and risk preferences are mapped to strategy-completion templates.
2. **Workflow gap diagnosis**: the system checks whether the workflow contains alert logging, forward-test records, cost assumptions, repaint/lookahead checks, exit rules, and versioning.
3. **Forward-test attribution**: alert-event prices are compared with later market prices over a selected horizon.
4. **Evidence dashboard and report generation**: public demand evidence is summarized by pain category and source type, then converted into a report-style product output.

## Static architecture

GitHub Pages hosts only static files, so PineGuard uses a build-time data snapshot and browser-side processing.

```text
Build-time data collection
        ↓
CSV snapshots under docs/data/
        ↓
Combined JSON file: docs/data/pineguard_static_data.json
        ↓
Browser-side JavaScript analytics
        ↓
Dashboard, evidence charts, report preview, and data downloads
```

At runtime, the deployed website does not require a private server, database, API key, or user login. All runtime inputs are versioned static files.

## Repository structure

```text
docs/index.html                       Static product website
docs/assets/style.css                 Product styling and responsive layout
docs/assets/app.js                    Browser-side recommendation, diagnosis, forward-test, and report logic
docs/data/pineguard_static_data.json  Combined static data snapshot
docs/data/*.csv                       Downloadable data snapshots
docs/architecture.md                 System architecture overview
docs/data_acquisition.md             Demand-evidence acquisition process
docs/data_dictionary.md              Static data schema and field definitions
docs/privacy_and_ethics.md           Privacy, ethics, and platform-risk notes
docs/rubric_mapping.md               Mapping between repository files and grading criteria
scripts/build_static_site.py          Rebuilds the static JSON and CSV files
.github/workflows/pages.yml           Optional GitHub Pages deployment workflow
README.md                             Project overview and deployment instructions
```

## Data acquisition process

The prototype uses public digital-trace evidence and pre-built static data snapshots.

The evidence dataset was built from:

- official TradingView documentation pages,
- public TradingView script/listing pages,
- competitor or adjacent-product pages,
- pricing or subscription-plan pages,
- manually coded public evidence rows.

The data-acquisition logic is intentionally conservative. It avoids private pages, paywalled material, login-only content, and long copyrighted excerpts. Evidence rows use short paraphrases and source URLs so the process remains auditable.


## Grading-oriented documentation

The repository includes additional documentation to make the project easier to evaluate:

- `docs/architecture.md`: system architecture and production-scale extension.
- `docs/data_acquisition.md`: how the public evidence and static snapshots were prepared.
- `docs/data_dictionary.md`: field definitions for all static data files.
- `docs/privacy_and_ethics.md`: investment-advice, privacy, and platform-risk controls.
- `docs/rubric_mapping.md`: where each final-project requirement is addressed.

## Runtime data files

The website reads the following files from `docs/data/`:

- `pineguard_static_data.json`: combined runtime dataset,
- `market_prices_snapshot.csv`: pre-built market-price snapshot,
- `alert_events_snapshot.csv`: TradingView-style alert-event snapshot,
- `strategy_templates.csv`: strategy-completion template library,
- `combined_evidence_snapshot.csv`: public demand-evidence snapshot,
- `static_validation.csv`: build-time validation checks.

These files are intentionally downloadable from the website to make the data product transparent and reproducible.

## Local preview

Run the site through a local HTTP server:

```bash
python -m http.server 8000 -d docs
```

Then open:

```text
http://localhost:8000
```

Do not double-click `docs/index.html` directly. Some browsers block local JSON loading when a file is opened from the filesystem.

## Rebuild static data

If source CSVs are updated, rebuild the static data snapshot:

```bash
python scripts/build_static_site.py
```

This regenerates `docs/data/pineguard_static_data.json` and the downloadable CSV snapshots.

## Deploy to GitHub Pages

1. Push this repository to GitHub.
2. Open **Settings -> Pages**.
3. Select **Deploy from a branch**.
4. Select branch `main`.
5. Select folder `/docs`.
6. Save.

The site will be available at:

```text
https://r12922076.github.io/bda_final/
```

An optional GitHub Actions workflow is also provided in `.github/workflows/pages.yml`.

## Limitations

This is an academic prototype. The deployed website uses static snapshots, so it does not collect new user data, receive live webhooks, or update market data after deployment. A production version would require user-authorized event ingestion, persistent storage, scheduled report recomputation, and a security model for private user strategy data.

PineGuard is not investment advice, does not execute trades, and does not promise profitable strategies. It is a workflow validation and monitoring product.

## Production extension

A production version would use:

- a user-authorized webhook endpoint for alert ingestion,
- a message queue for event buffering,
- PostgreSQL for users, strategies, subscriptions, and reports,
- object storage for raw webhook payloads and evidence snapshots,
- time-series tables for prices and forward-test outcomes,
- scheduled jobs for health-report recomputation,
- near-real-time jobs for alert monitoring and anomaly detection.

The static website is therefore the public demonstration layer, while the proposed production architecture is the scalable data-product layer.
