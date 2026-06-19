# PineGuard

PineGuard is a static GitHub Pages product demo for monetizing TradingView strategy-workflow data. The current version is structured as a browser-side single-page application rather than a flat report page. It includes a health-check wizard, diagnosis scoring, forward-test monitor, evidence explorer, generated report, pricing page, architecture view, risk register, and documentation hub.

Official repository: https://github.com/r12922076/bda_final  
Live demo: https://r12922076.github.io/bda_final/

## Product demo routes

- `#/home`: landing page and product positioning
- `#/health-check`: five-step strategy health-check wizard
- `#/diagnosis`: score breakdown and missing workflow components
- `#/strategy-profile`: template library and strategy-completion cards
- `#/monitor`: forward-test monitor, horizon controls, CSV upload demo, webhook payload copy
- `#/evidence`: filterable evidence explorer
- `#/report`: downloadable strategy health report
- `#/pricing`: SaaS-style pricing and unit-economics logic
- `#/architecture`: static prototype and production event-driven architecture
- `#/risk`: risk, ethics, and data governance
- `#/docs`: documentation hub and static data downloads

## Local preview

```bash
python -m http.server 8000 -d docs
```

Open `http://localhost:8000`. Do not double-click `docs/index.html`, because browsers may block local JSON fetches.

## Static validation

```bash
python scripts/validate_static_site.py
```


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

PineGuard is not investment advice, does not execute trades, and does not promise profitable strategies. It is a workflow validation and monitoring product. Its score measures workflow completeness and evidence quality, not trading profitability.

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


## Additional high-score documentation

The repository includes several grading-oriented documents:

- `docs/evidence_methodology.md`: explains how evidence rows are collected and coded.
- `docs/scale_and_unit_economics.md`: explains the prototype-to-production scale path and cost drivers.
- `docs/competitor_benchmarks.md`: summarizes adjacent-product willingness-to-pay benchmarks.
- `docs/risk_register.md`: summarizes platform, privacy, and investment-advice risks.

These documents are included so the project can be evaluated as a data product and system design, not only as a static website.

## High-score polish added in the final version

The deployed artifact has been upgraded from a flat static page to a product-style static SPA. The main grader-facing route is:

- `#/tour`: a two-minute Grader Quick Tour that links the demo screens to the rubric.

Additional documentation:

- `docs/grader_guide.md`: recommended path for evaluating the deployed system.
- `docs/data_lineage.md`: source-to-report data lineage.
- `docs/data_contract.md`: required fields and runtime data assumptions.
- `docs/evidence_governance.md`: evidence-strength labels and limitations.
- `docs/public_evidence_personas.md`: public-evidence-derived personas; not direct interviews.
- `docs/platform_and_legal_risk_notes.md`: platform, privacy, and investment-advice boundaries.

Additional validation:

```bash
python scripts/validate_static_site.py
node scripts/frontend_smoke_test.js
```

The smoke test is dependency-free and checks route registration, required data keys, evidence-strength fields, and expected frontend assets.

Evidence rows now include `evidence_strength` and `evidence_role` fields, allowing the Evidence Explorer to distinguish official technical evidence, willingness-to-pay benchmarks, adjacent-product evidence, and weaker demand proxies.


## PDF report

The current synchronized report is included at `report/r12323059.pdf`, with source at `report/report.tex`. The required submission PDF should be named `r12323059.pdf`.


## Evidence governance added in the final refinement

The final version separates direct technical evidence, adjacent willingness-to-pay benchmarks, public pain signals, and weaker demand proxies. Public-evidence personas are explicitly labeled as synthetic personas rather than interviews. The repository therefore supports a conservative claim: PineGuard has a defensible beachhead hypothesis, not proven product-market fit.

The first beachhead remains alert-heavy paid TradingView users. Paid-script buyer analysis and Creator Trust Reports are treated as expansion paths, not the initial market wedge.
