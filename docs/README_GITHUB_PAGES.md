# PineGuard

PineGuard is a deployed GitHub Pages product demo for monetizing TradingView strategy-workflow validation. It is not a trading-signal seller and it does not execute trades. The product converts TradingView-style alert events, strategy metadata, validation assumptions, forward-test outcomes, and public evidence labels into a Strategy Health Report.

- Official repository: https://github.com/r12922076/bda_final
- Live demo: https://r12922076.github.io/bda_final/
- Main grader route: `#/tour`
- Final report: `report/r12323059.pdf`

## What PineGuard is

PineGuard is a validation and trust layer between TradingView strategy development and any later manual or automated execution workflow.

```text
TradingView strategy development
        -> PineGuard validation layer
        -> execution bridge or manual decision
```

The initial beachhead is the alert-heavy paid TradingView user. This user already creates alert-event data, already pays for trading workflow tools, and lacks a structured way to judge whether a strategy workflow is complete enough to evaluate.

## Live demo routes

- `#/tour`: two-minute grader quick tour.
- `#/home`: product positioning and initial wedge.
- `#/health-check`: five-step strategy health-check wizard.
- `#/diagnosis`: score breakdown, missing workflow components, and score-rule rationale.
- `#/strategy-profile`: strategy-completion template library.
- `#/monitor`: static forward-test monitor, CSV parsing demo, and webhook payload sample.
- `#/evidence`: filterable evidence explorer with strength and role labels.
- `#/report`: downloadable Strategy Health Report.
- `#/pricing`: pricing packages and adjacent WTP benchmark logic.
- `#/architecture`: static prototype and production event-driven architecture.
- `#/risk`: go-to-market, legal, privacy, and platform-risk controls.
- `#/docs`: documentation hub and static data downloads.

## Run locally

Run the site through a local HTTP server:

```bash
python -m http.server 8000 -d docs
```

Open:

```text
http://localhost:8000
```

Do not double-click `docs/index.html`, because browsers may block local JSON loading from the filesystem.

## Validate the artifact

```bash
python scripts/validate_static_site.py
node scripts/frontend_smoke_test.js
```

The validation checks required files, runtime JSON keys, evidence-strength fields, route registration, and frontend assets.

## Data acquisition and evidence governance

The project uses public digital-trace evidence rather than private interviews. It does not claim product-market fit. It supports a conservative beachhead hypothesis with four evidence classes:

1. official technical documentation,
2. public user-pain discussions and marketplace traces,
3. competitor and adjacent-product pricing benchmarks,
4. architecture, legal, and privacy references.

The public evidence workflow is documented in:

- `docs/data_acquisition.md`
- `docs/evidence_governance.md`
- `docs/data/evidence_seed_urls.csv`
- `docs/data/combined_evidence_snapshot.csv`
- `docs/data/evidence_strength_summary.csv`

Evidence strength is interpreted conservatively:

- Strong: official documentation, academic/professional validation references, or primary platform documents.
- Medium: public discussions, professional articles, or adjacent-product benchmark pages.
- Weak: isolated marketplace traces, promotional claims, or indirect demand proxies.

## Static prototype versus production system

The deployed GitHub Pages version is a static browser-side prototype. It uses pre-built CSV/JSON snapshots and client-side JavaScript analytics. It does not receive live TradingView webhooks, store private user strategy data, connect to brokers, or run a private backend.

A production version would add:

- user-authorized webhook ingestion,
- schema validation and idempotency keys,
- message queue buffering,
- raw payload object storage,
- relational metadata storage,
- scheduled report recomputation,
- dashboard/API/report delivery,
- privacy controls for sensitive trading workflow data.

## Repository structure

```text
docs/index.html                       Static SPA entry point
docs/assets/*.js                      Browser-side routing, scoring, reports, and UI helpers
docs/assets/style.css                 Product styling and responsive layout
docs/data/*.csv                       Static evidence, alert, market, scoring, and seed datasets
docs/data/pineguard_static_data.json  Runtime JSON bundle for the deployed SPA
docs/grader_guide.md                  Recommended route path for evaluation
docs/data_acquisition.md              Public-evidence acquisition process
docs/evidence_governance.md           Evidence-strength labels and limitations
docs/scoring_rules.md                 Health-score weights and interpretation
docs/data_contract.md                 Runtime schema and production event contract
docs/rubric_mapping.md                Mapping from final-project criteria to files/routes
scripts/build_static_site.py          Rebuilds static JSON and derived CSV snapshots
scripts/validate_static_site.py       Static file and data validation
scripts/frontend_smoke_test.js        Dependency-free frontend smoke test
report/r12323059.pdf                  Final PDF report
```

## Rebuild static data

If source CSV files are edited, rebuild the static runtime bundle:

```bash
python scripts/build_static_site.py
```

This regenerates `docs/data/pineguard_static_data.json` and derived static snapshots.

## Deploy to GitHub Pages

1. Push this repository to GitHub.
2. Open **Settings -> Pages**.
3. Select **Deploy from a branch**.
4. Select branch `main`.
5. Select folder `/docs`.
6. Save.

An optional workflow is included in `.github/workflows/pages.yml`.

## Limitations

PineGuard is an academic prototype and not investment advice. It does not recommend securities, promise profits, execute trades, or evaluate expected profitability. Its score measures workflow completeness and evidence quality. Demand evidence is public and directional; a real launch would still require direct interviews, landing-page conversion testing, and retention metrics.
